import { ServerEvents } from "../enums/ServerEvents"

interface PlayerJoinedMessage {
    type: ServerEvents.PLAYER_JOINED,
    id: string;
    name: string;
    teamId?: string;
}

interface PlayerLeftMessage {
    type: ServerEvents.PLAYER_LEFT,
    id: string;
}

interface PlayerSetId {
    type: ServerEvents.PLAYER_SET_ID,
    id: string;
}

interface PlayerInputChangedMessage {
    type: ServerEvents.PLAYER_INPUT_CHANGED,
    id: string,
    input: string
}

interface PlayerInputLockedMessage {
    type: ServerEvents.PLAYER_INPUT_LOCKED,
    id: string
}

interface PlayerInputReleasedMessage {
    type: ServerEvents.PLAYER_INPUT_RELEASED,
    id: string
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
    playerId: string,
    time: number
}

interface BuzzerReleasedMessage {
    type: ServerEvents.BUZZER_RELEASED
}

interface BuzzerLockedMessage {
    type: ServerEvents.BUZZER_LOCKED
}

interface InputsLockedMessage {
    type: ServerEvents.INPUTS_LOCKED;
}

interface InputsReleasedMessage {
    type: ServerEvents.INPUTS_RELEASED;
}

interface AnswerRightMessage {
    type: ServerEvents.ANSWER_RIGHT;
}

interface AnswerWrongMessage {
    type: ServerEvents.ANSWER_WRONG;
}

interface TeamsChangedMessage {
    type: ServerEvents.TEAMS_CHANGED,
    teams: { id: string, name: string }[]
}

type PlayerInputEventType = PlayerInputChangedMessage | PlayerInputLockedMessage | PlayerInputReleasedMessage;
type PlayerEventType = PlayerSetId | PlayerJoinedMessage | PlayerLeftMessage | PlayerPointsChangedMessage | PlayerInputEventType;

type AnswerEventType = AnswerRightMessage | AnswerWrongMessage;

type InputEventType = InputsLockedMessage | InputsReleasedMessage;

type BuzzerEventType = PlayerBuzzerPressedMessage | BuzzerReleasedMessage | BuzzerLockedMessage;

type ServerEventType = ServerClosedMessage | ServerPingMessage;

export type ServerMessage = PlayerEventType | ServerEventType | BuzzerEventType | InputEventType | AnswerEventType | TeamsChangedMessage;