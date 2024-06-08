/// These events are send by the server and executed on the client
export enum ServerEvents {
    /// Player joined
    PLAYER_JOINED,
    /// Player left
    PLAYER_LEFT,

    /// Points of player changed
    PLAYER_POINTS_CHANGED,
    
    /// Input of player changed
    PLAYER_INPUT_CHANGED,
    /// Input of player locked
    PLAYER_INPUT_LOCKED,
    /// Input of player released
    PLAYER_INPUT_RELEASED,

    /// Buzzer pressed
    BUZZER_PRESSED_BY_PLAYER,
    /// Buzzer wurde released
    BUZZER_RELEASED,

    /// Inputs locked
    INPUTS_LOCKED,
    /// Inputs released
    INPUTS_RELEASED,

    /// Server Closed
    SERVER_CLOSED,

    /// Ping event
    SERVER_PING
}