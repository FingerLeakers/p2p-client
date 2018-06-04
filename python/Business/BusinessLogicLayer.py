import python.Protobuf.protobuf_utils as putils
import asyncio
import logging.handlers
from python.StatusMessage import StatusMessage
from python.Protobuf.Message_pb2 import Message
from python.P2P.peer import Peer

logging.basicConfig(
    level=logging.DEBUG,
    format='%(name)s: %(message)s',
)
handler = logging.handlers.RotatingFileHandler(
    "log.txt",
    maxBytes=65536,
    backupCount=10
)
log = logging.getLogger(__name__)
log.addHandler(handler)
formatter = logging.Formatter('%(name)s: %(message)s')
handler.formatter = formatter

class BusinessLogicLayer:
    def __init__(self, lower_layer):
        self.lower_layer = lower_layer
        self._this_peer = lower_layer.get_myself()
        self._pinged_peers = []

    async def add_layer_communication(self, lower):
        """
        Adds means of communicating with lower and/or lower layer. Higher and lower should be a tuple of two objects
        that support asynchronous communication using get() and put() method to pass along data.
        Then starts listening on them for data.
        :param higher: Tuple of two objects for communication with higher layer
        :param lower: Tuple of two objects for communication with lower layer
        """
        self._lower = lower
        asyncio.ensure_future(self._handle_lower_input())


    async def _handle_lower_input(self):
        try:
            while True:
                log.debug("Waiting for message from lower layer")
                message = await self._lower[0].get()
                log.debug("Got message {!r}; handle it".format(message))
                await self._handle_message(message)
                log.debug("Message {!r} sent to the higher layer".format(message))
        except asyncio.CancelledError:
            log.debug("Caught CancelledError: Stop handling input from lower layer")

    async def _handle_message(self, message):
        """
        Checks type of message and handle it appropriately
        :param message: Message to handle
        """
        if message.type == Message.PING:
            await self._handle_ping_message(message)
        elif message.type == Message.PING_RESPONSE:
            await self._handle_ping_response_message(message)
        elif message.type == Message.FIND_NODE:
            await self._handle_find_node_message(message)
        elif message.type == Message.FOUND_NODES:
            await self._handle_found_nodes_message(message)

    async def _handle_ping_message(self, message):
        log.debug("Handling PING message")
        sender = message.sender
        sender_peer = putils.create_peer_from_contact(sender)
        log.debug("PING message was sent from {}".format(sender_peer.get_info()))
        log.debug("Adding sender to routing table")
        await self.lower_layer.add_peer(sender_peer)

        log.debug("Send ping response to that peer")
        status = await self._ping_response(sender_peer)
        if status is StatusMessage.SUCCESS:
            log.debug("Ping was responded to correctly")
        else:
            log.warning("Ping wasn't responded to correctly")

    async def _handle_ping_response_message(self, message):
        log.debug("Handling PING_RESPONSE message")
        sender = message.sender
        sender_peer = putils.create_peer_from_contact(sender)
        log.debug("PING_RESPONSE message was sent from {}".format(sender_peer.get_info()))
        log.debug("Remove that peer from list of peers to remove if they are not responsive after timeout")

        for pinged_peer in self._pinged_peers:
            if pinged_peer[0] == sender_peer:
                pinged_peer[1].cancel()
                log.debug("Cancelled removal of responsive peer")
        log.debug("PING_RESPONSE message was handled")


    async def _handle_found_nodes_message(self, message):
        """
        Handles FOUND_NODES message
        :param message: message to handle
        """
        log.debug("Handling FOUND_NODES message")
        sender = message.sender
        sender_peer = putils.create_peer_from_contact(sender)
        log.debug("FOUND_NODES message was sent from {}".format(sender_peer.get_info()))
        peers = putils.get_peers_from_found_nodes_message(message)
        for peer in peers:
            await self.lower_layer.add_peer(peer)
            await self.ping(peer.id)

    async def _handle_find_node_message(self, message):
        """
        Handles find node message
        :param message:
        :return:
        """
        log.debug("Handling FIND_NODE message")
        sender = message.sender
        guid = int(message.findNode.guid)
        sender_peer = putils.create_peer_from_contact(sender)
        log.debug("FIND_NODE message was sent from {}".format(sender_peer.get_info()))
        log.debug("Adding sender to routing table")
        await self.lower_layer.add_peer(sender_peer)

        log.debug("Send FOUND NODE message to that peer")
        await self._found_nodes_message(receiver=sender_peer, wanted_peer_id=guid)

    async def _found_nodes_message(self, receiver, wanted_peer_id):
        """
        Sends FOUND NODE message to target peer
        :param receiver: Peer to send the message to
        :param wanted_peer_id: id of peer that is wanted
        :return: SUCCESS or FAILURE
        """
        peers = await self.lower_layer.get_nearest_peers(wanted_peer_id=wanted_peer_id)
        if receiver in peers:
            peers.remove(receiver)
        message = putils.create_found_nodes_message(sender=self.get_myself(), receiver=receiver, nearest_peers=peers)
        status = await self._put_message_on_lower(message)
        return status

    async def _ping_response(self, receiver):
        """
        Sends ping response message to target peer
        :param receiver: Peer to send the message to
        :return: SUCCESS or FAILURE
        """
        message = putils.create_ping_response_message(sender=self.get_myself(), receiver=receiver)
        status = await self._put_message_on_lower(message)
        return status

    async def _put_message_on_lower(self, message):
        """
        Puts message on lower writing queue
        :param message: message to put
        :return: SUCCESS or FAILURE
        """
        log.debug("Putting message to Queue")
        try:
            await self._lower[1].put(message)
            log.debug("Message {} put into Queue".format(message))
            return StatusMessage.SUCCESS
        except asyncio.CancelledError:
            log.debug("Message {} has not been put onto {} because CancelledError was caught".format(
                message,
                self._lower[1]
            ))
            return StatusMessage.FAILURE

    async def _wait_for_ping_response(self, peer, timeout):
        """
        Wait for ping response from peer and if it doesn't come then remove it from the routing table
        :param peer:
        :return:
        """
        try:
            await asyncio.sleep(timeout)
            log.debug("Peer {} has not responded in {} second. Remove him".format(peer.get_info(), timeout))
            await self.lower_layer.remove_peer(peer)
            log.debug("Peer {} removed".format(peer.get_info()))

        except asyncio.CancelledError:
            log.debug("Peer {} responded. Cancel removal of him from the routing table.")

    async def ping(self, target_id):
        """
        Sends ping message to peer with given target_id
        :param target_id: id of target peer
        :return: SUCCESS or FAILURE
        """
        peer = await self.lower_layer.get_peer_by_id(target_id)
        if peer is None:
            return StatusMessage.FAILURE
        message = putils.create_ping_message(sender=self.get_myself(), receiver=peer)
        try:
            status = await self._put_message_on_lower(message)
            self._pinged_peers.append((peer, asyncio.ensure_future(self._wait_for_ping_response(peer=peer, timeout=3))))
            return status
        except asyncio.CancelledError:
            return StatusMessage.FAILURE

    def get_myself(self):
        return self._this_peer

    async def find_node(self, guid, id_of_peer_to_ask):
        """
        Create find_node message with given guid to find and peer_to_ask as a receiver of our query and pass it on
        :param guid: id of peer to ask
        :param id_of_peer_to_ask: peer to query about wanted peer
        :return: SUCCESS or FAILURE
        """
        peer_to_ask = await self.lower_layer.get_peer_by_id(id_of_peer_to_ask)
        if peer_to_ask is None:
            return StatusMessage.FAILURE
        message = putils.create_find_node_message(sender=self.get_myself(), receiver=peer_to_ask, guid=guid)
        status = await self._put_message_on_lower(message)
        return status

    async def join_network(self, bootstrap_node):
        """
        Join network that the bootstrap_node belongs to
        :param bootstrap_node: Bootstrap node we will be asking for information about network
        :return: SUCCESS or FAILURE
        """
        self.start_server()
        if bootstrap_node:
            log.debug("Joining network, bootstrap node: {}".format(bootstrap_node))
            peer_to_ask = Peer(None, bootstrap_node[0], bootstrap_node[1], False)
            await self.lower_layer.add_peer(peer_to_ask)
            await self.ping(peer_to_ask.id)
            log.debug("Waiting for boot node to respond")
            await asyncio.sleep(4)

            peer_to_ask = await self.lower_layer.get_peer_by_id(peer_to_ask.id)
            if peer_to_ask is None:
                log.warning("Bootstrap node is not responding. Failed to bootstrap")
                await self.stop_server()
                return StatusMessage.FAILURE

            message = putils.create_find_node_message(sender=self.get_myself(), receiver=peer_to_ask, guid=self.get_myself().id)
            status = await self._put_message_on_lower(message)
            if status is StatusMessage.FAILURE:
                log.warning("Could not send find node message to bootstrap node")
                await self.stop_server()
                return status
        return StatusMessage.SUCCESS

    def start_server(self):
        """
        Try to start the server
        """
        self.lower_layer.start_server()

    async def stop_server(self):
        """
        Try to stop the server
        """
        await self.lower_layer.stop_server()
