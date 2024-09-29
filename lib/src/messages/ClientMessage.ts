import { ClientEvents } from "../enums/ClientEvents"

interface PlayerConnectingMessage {
    type: ClientEvents.PLAYER_CONNECTING,
    name: string,
    teamId?: string
}

interface PlayerLeavingMessage {
    type: ClientEvents.PLAYER_LEAVING
}

interface GameMasterReleaseBuzzerMessage {
    type: ClientEvents.GAMEMASTER_RELEASE_BUZZER,
}

interface GameMasterLockBuzzerMessage {
    type: ClientEvents.GAMEMASTER_LOCK_BUZZER,
}

interface GameMasterReleaseBuzzerForPlayerMessage {
    type: ClientEvents.GAMEMASTER_RELEASE_BUZZER_FOR_PLAYER,
    playerId: string;
}

interface GameMasterLockBuzzerForPlayerMessage {
    type: ClientEvents.GAMEMASTER_LOCK_BUZZER_FOR_PLAYER,
    playerId: string;
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

interface GameMasterChangePointsMessage {
    type: ClientEvents.GAMEMASTER_CHANGE_POINTS_BY_PLAYER,
    playerId: string,
    points: number
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
}

interface ServerPingMessage {
    type: ClientEvents.SERVER_PING,
    date: number
}

interface RequestGamemasterMessage {
    type: ClientEvents.REQUEST_GAMEMASTER,
}

interface GameMasterCreateTeamMessage {
    type: ClientEvents.GAMEMASTER_TEAM_CREATE,
    name: string
}

interface GameMasterDeleteTeamMessage {
    type: ClientEvents.GAMEMASTER_TEAM_DELETE,
    teamId: string
}

type GameMasterTeamMessageType = GameMasterCreateTeamMessage | GameMasterDeleteTeamMessage;
type GameMasterAnswerMessageType = GameMasterAnswerRightMessage | GameMasterAnswerWrongMessage;
type GameMasterPointsMessageType = GameMasterIncreasePointsMessage | GameMasterDecreasePointsMessage | GameMasterChangePointsMessage;
type GameMasterInputMessageType = GameMasterReleaseInputsMessage | GameMasterLockInputsMessage | GameMasterLockBuzzerMessage | GameMasterReleaseBuzzerForPlayerMessage | GameMasterLockBuzzerForPlayerMessage;
type GameMasterMessageType = GameMasterReleaseBuzzerMessage | GameMasterInputMessageType | GameMasterPointsMessageType | GameMasterAnswerMessageType | GameMasterTeamMessageType;

type PlayerMessageType = PlayerConnectingMessage | PlayerLeavingMessage | PlayerInputChangedMessage | PlayerBuzzerPressedMessage;

type ServerMessageType = ServerPingMessage | RequestGamemasterMessage;

export type ClientMessage = ServerMessageType | PlayerMessageType | GameMasterMessageType;