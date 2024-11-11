import { PlayerId, TeamId } from "./Types";

/// These events are send by the server and executed on the client
export interface ServerToClientEvents {
    /// Player joined
    PLAYER_JOINED: (id: PlayerId, name: string, teamId: TeamId | undefined) => void,
    /// Player left
    PLAYER_LEFT: (id: PlayerId) => void,

    /// Points of player changed
    PLAYER_POINTS_CHANGED: (playerId: PlayerId, points: number) => void,
    
    /// Input of player changed
    PLAYER_INPUT_CHANGED: (playerId: PlayerId, input: string) => void,
    /// Input of player locked
    PLAYER_INPUT_LOCKED: (playerId: PlayerId) => void
    /// Input of player released
    PLAYER_INPUT_RELEASED: (playerId: PlayerId) => void

    /// Buzzer pressed
    BUZZER_PRESSED_BY_PLAYER: (playerId: PlayerId, time: number) => void,
    /// Buzzer wurde released
    BUZZER_RELEASED: () => void,
    /// Buzzer wurde gelocked
    BUZZER_LOCKED: () => void,

    

    /// right answer
    ANSWER_RIGHT: () => void,
    /// wrong answer
    ANSWER_WRONG: () => void,

    /// Inputs locked
    INPUTS_LOCKED: () => void,
    /// Inputs released
    INPUTS_RELEASED: () => void,

    /// Server Closed
    SERVER_CLOSED: () => void,

    /// Ping event
    SERVER_PING: () => void,

    /// Teams Changed
    TEAMS_CHANGED: (teams: { id: TeamId, name: string }[]) => void
}