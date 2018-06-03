// package: botnet_p2p
// file: Message.proto

import * as jspb from "google-protobuf";

export class Message extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): void;

  getType(): Message.MessageType;
  setType(value: Message.MessageType): void;

  hasSender(): boolean;
  clearSender(): void;
  getSender(): Message.Contact | undefined;
  setSender(value?: Message.Contact): void;

  hasReceiver(): boolean;
  clearReceiver(): void;
  getReceiver(): Message.Contact | undefined;
  setReceiver(value?: Message.Contact): void;

  getPropagation(): boolean;
  setPropagation(value: boolean): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  hasCommand(): boolean;
  clearCommand(): void;
  getCommand(): Message.CommandMsg | undefined;
  setCommand(value?: Message.CommandMsg): void;

  hasResponse(): boolean;
  clearResponse(): void;
  getResponse(): Message.CommandResponseMsg | undefined;
  setResponse(value?: Message.CommandResponseMsg): void;

  hasFilerequest(): boolean;
  clearFilerequest(): void;
  getFilerequest(): Message.FileRequestMsg | undefined;
  setFilerequest(value?: Message.FileRequestMsg): void;

  hasFilechunk(): boolean;
  clearFilechunk(): void;
  getFilechunk(): Message.FileChunkMsg | undefined;
  setFilechunk(value?: Message.FileChunkMsg): void;

  hasNatrequest(): boolean;
  clearNatrequest(): void;
  getNatrequest(): Message.NATRequestMsg | undefined;
  setNatrequest(value?: Message.NATRequestMsg): void;

  hasNatcheck(): boolean;
  clearNatcheck(): void;
  getNatcheck(): Message.NATCheckMsg | undefined;
  setNatcheck(value?: Message.NATCheckMsg): void;

  hasFindnode(): boolean;
  clearFindnode(): void;
  getFindnode(): Message.FindNodeMsg | undefined;
  setFindnode(value?: Message.FindNodeMsg): void;

  hasFoundnodes(): boolean;
  clearFoundnodes(): void;
  getFoundnodes(): Message.FoundNodesMsg | undefined;
  setFoundnodes(value?: Message.FoundNodesMsg): void;

  getPayloadCase(): Message.PayloadCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    uuid: string,
    type: Message.MessageType,
    sender?: Message.Contact.AsObject,
    receiver?: Message.Contact.AsObject,
    propagation: boolean,
    signature: Uint8Array | string,
    command?: Message.CommandMsg.AsObject,
    response?: Message.CommandResponseMsg.AsObject,
    filerequest?: Message.FileRequestMsg.AsObject,
    filechunk?: Message.FileChunkMsg.AsObject,
    natrequest?: Message.NATRequestMsg.AsObject,
    natcheck?: Message.NATCheckMsg.AsObject,
    findnode?: Message.FindNodeMsg.AsObject,
    foundnodes?: Message.FoundNodesMsg.AsObject,
  }

  export class Contact extends jspb.Message {
    getGuid(): string;
    setGuid(value: string): void;

    getIp(): string;
    setIp(value: string): void;

    getPort(): number;
    setPort(value: number): void;

    getIsnat(): boolean;
    setIsnat(value: boolean): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Contact.AsObject;
    static toObject(includeInstance: boolean, msg: Contact): Contact.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Contact, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Contact;
    static deserializeBinaryFromReader(message: Contact, reader: jspb.BinaryReader): Contact;
  }

  export namespace Contact {
    export type AsObject = {
      guid: string,
      ip: string,
      port: number,
      isnat: boolean,
    }
  }

  export class CommandMsg extends jspb.Message {
    getCommand(): string;
    setCommand(value: string): void;

    getShouldrespond(): boolean;
    setShouldrespond(value: boolean): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CommandMsg.AsObject;
    static toObject(includeInstance: boolean, msg: CommandMsg): CommandMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CommandMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CommandMsg;
    static deserializeBinaryFromReader(message: CommandMsg, reader: jspb.BinaryReader): CommandMsg;
  }

  export namespace CommandMsg {
    export type AsObject = {
      command: string,
      shouldrespond: boolean,
    }
  }

  export class CommandResponseMsg extends jspb.Message {
    getValue(): string;
    setValue(value: string): void;

    getStatus(): Message.Status;
    setStatus(value: Message.Status): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CommandResponseMsg.AsObject;
    static toObject(includeInstance: boolean, msg: CommandResponseMsg): CommandResponseMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CommandResponseMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CommandResponseMsg;
    static deserializeBinaryFromReader(message: CommandResponseMsg, reader: jspb.BinaryReader): CommandResponseMsg;
  }

  export namespace CommandResponseMsg {
    export type AsObject = {
      value: string,
      status: Message.Status,
    }
  }

  export class FileRequestMsg extends jspb.Message {
    getPath(): string;
    setPath(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileRequestMsg.AsObject;
    static toObject(includeInstance: boolean, msg: FileRequestMsg): FileRequestMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileRequestMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileRequestMsg;
    static deserializeBinaryFromReader(message: FileRequestMsg, reader: jspb.BinaryReader): FileRequestMsg;
  }

  export namespace FileRequestMsg {
    export type AsObject = {
      path: string,
    }
  }

  export class FileChunkMsg extends jspb.Message {
    getUuid(): string;
    setUuid(value: string): void;

    getFilename(): string;
    setFilename(value: string): void;

    getFilesize(): number;
    setFilesize(value: number): void;

    getOrdinal(): number;
    setOrdinal(value: number): void;

    getData(): Uint8Array | string;
    getData_asU8(): Uint8Array;
    getData_asB64(): string;
    setData(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileChunkMsg.AsObject;
    static toObject(includeInstance: boolean, msg: FileChunkMsg): FileChunkMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileChunkMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileChunkMsg;
    static deserializeBinaryFromReader(message: FileChunkMsg, reader: jspb.BinaryReader): FileChunkMsg;
  }

  export namespace FileChunkMsg {
    export type AsObject = {
      uuid: string,
      filename: string,
      filesize: number,
      ordinal: number,
      data: Uint8Array | string,
    }
  }

  export class NATRequestMsg extends jspb.Message {
    getGuid(): string;
    setGuid(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NATRequestMsg.AsObject;
    static toObject(includeInstance: boolean, msg: NATRequestMsg): NATRequestMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NATRequestMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NATRequestMsg;
    static deserializeBinaryFromReader(message: NATRequestMsg, reader: jspb.BinaryReader): NATRequestMsg;
  }

  export namespace NATRequestMsg {
    export type AsObject = {
      guid: string,
    }
  }

  export class NATCheckMsg extends jspb.Message {
    getGuid(): string;
    setGuid(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NATCheckMsg.AsObject;
    static toObject(includeInstance: boolean, msg: NATCheckMsg): NATCheckMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NATCheckMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NATCheckMsg;
    static deserializeBinaryFromReader(message: NATCheckMsg, reader: jspb.BinaryReader): NATCheckMsg;
  }

  export namespace NATCheckMsg {
    export type AsObject = {
      guid: string,
    }
  }

  export class FindNodeMsg extends jspb.Message {
    getGuid(): string;
    setGuid(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FindNodeMsg.AsObject;
    static toObject(includeInstance: boolean, msg: FindNodeMsg): FindNodeMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FindNodeMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FindNodeMsg;
    static deserializeBinaryFromReader(message: FindNodeMsg, reader: jspb.BinaryReader): FindNodeMsg;
  }

  export namespace FindNodeMsg {
    export type AsObject = {
      guid: string,
    }
  }

  export class FoundNodesMsg extends jspb.Message {
    clearNodesList(): void;
    getNodesList(): Array<Message.Contact>;
    setNodesList(value: Array<Message.Contact>): void;
    addNodes(value?: Message.Contact, index?: number): Message.Contact;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FoundNodesMsg.AsObject;
    static toObject(includeInstance: boolean, msg: FoundNodesMsg): FoundNodesMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FoundNodesMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FoundNodesMsg;
    static deserializeBinaryFromReader(message: FoundNodesMsg, reader: jspb.BinaryReader): FoundNodesMsg;
  }

  export namespace FoundNodesMsg {
    export type AsObject = {
      nodesList: Array<Message.Contact.AsObject>,
    }
  }

  export enum MessageType {
    UNDEFINED = 0,
    COMMAND = 1,
    COMMAND_RESPONSE = 2,
    FILE_REQUEST = 3,
    FILE_CHUNK = 4,
    NAT_REQUEST = 5,
    NAT_CHECK = 6,
    PING = 7,
    PING_RESPONSE = 8,
    LEAVE = 9,
    FIND_NODE = 10,
    FOUND_NODES = 11,
  }

  export enum Status {
    FAIL = 0,
    OK = 1,
  }

  export enum PayloadCase {
    PAYLOAD_NOT_SET = 0,
    COMMAND = 7,
    RESPONSE = 8,
    FILEREQUEST = 9,
    FILECHUNK = 10,
    NATREQUEST = 11,
    NATCHECK = 12,
    FINDNODE = 13,
    FOUNDNODES = 14,
  }
}

