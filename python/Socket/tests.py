import unittest.mock
import asyncio
import socket
from python.Socket.SocketLayer import SocketLayer
import python.Protobuf.protobuf_utils as putils
from python.P2P.peer import Peer
import logging
import sys

logging.basicConfig(format="%(name)s %(message)s", stream=sys.stderr, level=logging.DEBUG)
log = logging.getLogger('main')

def _run(cor):
    return asyncio.get_event_loop().run_until_complete(cor)

class SocketsTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.socket_layer = SocketLayer()
        q1 = asyncio.Queue()
        q2 = asyncio.Queue()
        cls.higher = (q1, q2)
        _run(cls.socket_layer.add_layer_communication(higher=cls.higher))
        cls.sender = Peer(123, '123.123.123.123', 8022, True)
        cls.receiver = Peer(11, '66.22.66.22', 9090, False)

    @classmethod
    def tearDownClass(cls):
        cls.socket_layer.stop_server()
        pending = asyncio.Task.all_tasks()
        for task in pending:
            task.cancel()
            asyncio.get_event_loop().run_until_complete(task)

    def test_starting_server(self):
        """
        We tell SocketLayer to start the server.
        It should start it in another thread and listen for incoming connections at given socket.
        We test that by sending some message to the server and if everything works it should handle it and put it into the queue.
        """
        self.socket_layer.start_server("127.0.0.1", 8080)
        log.debug("Create socket")
        sock = socket.socket()
        try:
            sock.connect(("127.0.0.1", 8080))
        except socket.error as msg:
            log.warning("Could not connect to the server")
            return

        mess = putils.create_ping_message(self.sender, self.receiver)
        serialized = putils.serialize_message(mess)

        try:
            log.debug("Try to send the message")
            sock.send(serialized)
        except socket.error as msg:
            log.warning("Could not send the message")
            sock.close()
            return

        sock.close()

        # Now we give a chance for the server to put message onto the queue by waiting
        _run(asyncio.sleep(0.3))
        log.warning("Stop the server")
        self.socket_layer.stop_server()
        # And now we check if the message is in the queue going to the higher layer
        self.assertEqual(serialized, _run(self.higher[1].get()))


if __name__ == '__main__':
    unittest.main()