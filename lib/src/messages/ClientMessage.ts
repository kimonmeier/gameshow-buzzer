import { ClientEvents } from "../enums/ClientEvents"

interface PlayerConnectingMessage {
    type: ClientEvents.PLAYER_CONNECTING,
    name: string,
}

interface PlayerLeavingMessage {
    type: ClientEvents.PLAYER_LEAVING
}

interface GameMasterReleaseBuzzerMessage {
    type: ClientEvents.GAMEMASTER_RELEASE_BUZZER,
}

interface GameMasterReleaseInputsMessage {
    type: ClientEvents.GAMEMASTER_RELEASE_INPUTS,
    playerId?: string,
}

interface GameMasterLockInputsMessage {
    type: ClientEvents.GAMEMASTER_LOCK_INPUTS,
    playerId?: string,
}

interface GameMasterIncreasePointsMessage {
    type: ClientEvents.GAMEMASTER_INCREASE_POINTS_BY_PLAYER,
    playerId: string,
    points: number;
}

interface GameMasterDecreasePointsMessage {
    type: ClientEvents.GAMEMASTER_DECREASE_POINTS_BY_PLAYER,
    playerId: string,
    points: number;
}

interface GameMasterAnswerRightMessage {
    type: ClientEvents.GAMEMASTER_ANSWER_RIGHT,
}

interface GameMasterAnswerWrongMessage {
    type: ClientEvents.GAMEMASTER_ANSWER_WRONG,
}

interface PlayerInputChangedMessage {
    type: ClientEvents.PLAYER_INPUT_CHANGED,
    input: string,
}

interface PlayerBuzzerPressedMessage {
    type: ClientEvents.PLAYER_BUZZER_PRESSED,
    time: number
}

interface ServerPingMessage {
    type: ClientEvents.SERVER_PING,
    date: number
}

type GameMasterAnswerMessageType = GameMasterAnswerRightMessage | GameMasterAnswerWrongMessage;
type GameMasterPointsMessageType = GameMasterIncreasePointsMessage | GameMasterDecreasePointsMessage;
type GameMasterInputMessageType = GameMasterReleaseInputsMessage | GameMasterLockInputsMessage;
type GameMasterMessageType = GameMasterReleaseBuzzerMessage | GameMasterInputMessageType | GameMasterPointsMessageType | GameMasterAnswerMessageType;

type PlayerMessageType = PlayerConnectingMessage | PlayerLeavingMessage | PlayerInputChangedMessage | PlayerBuzzerPressedMessage;

type ServerMessageType = ServerPingMessage;

export type ClientMessage = ServerMessageType | PlayerMessageType | GameMasterMessageType;