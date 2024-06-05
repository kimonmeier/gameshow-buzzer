import { ServerEvents } from "../enums/ServerEvents"

interface PlayerJoinedMessage {
    type: ServerEvents.PLAYER_JOINED,
    id: string;
    name: string;
}

interface PlayerLeftMessage {
    type: ServerEvents.PLAYER_LEFT,
    id: string;
}

interface ServerClosedMessage {
    type: ServerEvents.SERVER_CLOSED,
}

interface ServerPingMessage {
    type: ServerEvents.SERVER_PING,
}

interface PlayerPointsChangedMessage {
    type: ServerEvents.PLAYER_POINTS_CHANGED,
    playerId: string,
    points: number,
}


export type ServerMessage = PlayerJoinedMessage | PlayerLeftMessage | ServerClosedMessage | ServerPingMessage | PlayerPointsChangedMessage;