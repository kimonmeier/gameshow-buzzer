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

interface PlayerBuzzerPressedMessage {
    type: ServerEvents.BUZZER_PRESSED_BY_PLAYER,
    playerId: string
}

interface BuzzerReleasedMessage {
    type: ServerEvents.BUZZER_RELEASED
}

type BuzzerEventType = PlayerBuzzerPressedMessage | BuzzerReleasedMessage;
type PlayerEventType = PlayerJoinedMessage | PlayerLeftMessage | PlayerPointsChangedMessage;
type ServerEventType = ServerClosedMessage | ServerPingMessage;

export type ServerMessage = PlayerEventType | ServerEventType | BuzzerEventType;