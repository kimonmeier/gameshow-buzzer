/// These events are send by the client and executed on the server
export enum ClientEvents {
    /// This event describes when an client tries to connect to the server
    PLAYER_CONNECTING,

    /// This event describes when a client tries to disconnect from the server
    PLAYER_LEAVING,

    /// This event describes what happens when the gamemaster releases the buzzer
    GAMEMASTER_RELEASE_BUZZER,

    /// This event describes what happens when the gamemaster locks the buzzer
    GAMEMASTER_LOCK_BUZZER,
    
    /// This event describes what happens when the gamemaster locks the inputs
    GAMEMASTER_LOCK_INPUTS,
    
    /// This event describes what happens when the gamemaster releases the inputs
    GAMEMASTER_RELEASE_INPUTS,
    
    /// This event describes what happens when the gamemaster increases the points of a player
    GAMEMASTER_INCREASE_POINTS_BY_PLAYER,

    /// This event describes what happens when the gamemaster decreases the points of a player
    GAMEMASTER_DECREASE_POINTS_BY_PLAYER,

    /// This event describes what happens when the gamemaster changes the points of a player
    GAMEMASTER_CHANGE_POINTS_BY_PLAYER,

    /// This event describes what happens when the gamemaster locks the buzzer for one player
    GAMEMASTER_LOCK_BUZZER_FOR_PLAYER,

    /// This event describes what happens when the gamemaster releases the buzzer for one player
    GAMEMASTER_RELEASE_BUZZER_FOR_PLAYER,

    /// This event describes what happens when the gamemaster selects a right answer
    GAMEMASTER_ANSWER_RIGHT,

    /// This event describes what happens when the gamemaster selects a wrong answer
    GAMEMASTER_ANSWER_WRONG,

    /// This event describes when a gamemaster wants to login
    REQUEST_GAMEMASTER,

    /// This event describes what happens when a player changes their inputs
    PLAYER_INPUT_CHANGED,

    /// This event describes what happens when a player presses the buzzer
    PLAYER_BUZZER_PRESSED,

    /// Sends a ping request to the server to keep the connection open
    SERVER_PING
}