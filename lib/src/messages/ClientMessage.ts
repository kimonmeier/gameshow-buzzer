import { ClientEvents } from "../enums/ClientEvents"

interface PlayerConnectingMessage {
    type: ClientEvents.PLAYER_CONNECTING,
    name: string
}

interface PlayerLeavingMessage {
    type: ClientEvents.PLAYER_LEAVING
}

interface ServerPingMessage {
    type: ClientEvents.SERVER_PING,
    date: number
}

type PlayerMessageType = PlayerConnectingMessage | PlayerLeavingMessage;
type ServerMessageType = ServerPingMessage;

export type ClientMessage = ServerMessageType | PlayerMessageType;