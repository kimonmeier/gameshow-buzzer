import { ClientEvents } from "../enums/ClientEvents"

interface PlayerConnectingMessage {
    type: ClientEvents.PLAYER_CONNECTING,
    name: string
}

interface PlayerLeavingMessage {
    type: ClientEvents.PLAYER_LEAVING
}

export type ClientMessage = PlayerConnectingMessage | PlayerLeavingMessage;