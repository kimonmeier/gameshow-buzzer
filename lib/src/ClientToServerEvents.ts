import { PlayerId, TeamId } from "./Types";

/// These events are send by the client and executed on the server
export interface ClientToServerEvents {
    /// This event describes when an client tries to connect to the server
    PLAYER_CONNECTING: (name: string, teamId: TeamId | undefined, callback: (playerId: PlayerId | undefined) => void) => void,

    /// This event describes when a client tries to disconnect from the server
    PLAYER_LEAVING: () => void,

    /// This event describes what happens when the gamemaster releases the buzzer
    GAMEMASTER_RELEASE_BUZZER: () => void,

    /// This event describes what happens when the gamemaster locks the buzzer
    GAMEMASTER_LOCK_BUZZER: () => void,
    
    /// This event describes what happens when the gamemaster locks the inputs
    GAMEMASTER_LOCK_INPUTS: (playerId?: PlayerId) => void,
    
    /// This event describes what happens when the gamemaster releases the inputs
    GAMEMASTER_RELEASE_INPUTS: (playerId?: PlayerId) => void,
    
    /// This event describes what happens when the gamemaster increases the points of a player
    GAMEMASTER_INCREASE_POINTS_BY_PLAYER: (playerId: PlayerId, points: number) => void,

    /// This event describes what happens when the gamemaster decreases the points of a player
    GAMEMASTER_DECREASE_POINTS_BY_PLAYER: (playerId: PlayerId, points: number) => void,

    /// This event describes what happens when the gamemaster changes the points of a player
    GAMEMASTER_CHANGE_POINTS_BY_PLAYER: (playerId: PlayerId, points: number) => void,

    /// This event describes what happens when the gamemaster locks the buzzer for one player
    GAMEMASTER_LOCK_BUZZER_FOR_PLAYER: (playerId: PlayerId) => void,

    /// This event describes what happens when the gamemaster releases the buzzer for one player
    GAMEMASTER_RELEASE_BUZZER_FOR_PLAYER: (playerId: PlayerId) => void,

    /// This event describes what happens when the gamemaster selects a right answer
    GAMEMASTER_ANSWER_RIGHT: () => void,

    /// This event describes what happens when the gamemaster selects a wrong answer
    GAMEMASTER_ANSWER_WRONG: () => void,

    /// This event describes when a gamemaster wants to login
    REQUEST_GAMEMASTER: (callback: (isConnected: boolean) => void) => void,

    /// This event describes what happens when a player changes their inputs
    PLAYER_INPUT_CHANGED: (input: string) => void,

    /// This event describes what happens when a player presses the buzzer
    PLAYER_BUZZER_PRESSED: () => void,

    /// Sends a ping request to the server to keep the connection open
    SERVER_PING: (date: number) => void

    GAMEMASTER_TEAM_CREATE: (name: string) => void,

    GAMEMASTER_TEAM_DELETE: (teamId: TeamId) => void,
}