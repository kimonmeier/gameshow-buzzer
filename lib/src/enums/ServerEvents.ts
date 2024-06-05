/// These events are send by the server and executed on the client
export enum ServerEvents {
    /// Player joined
    PLAYER_JOINED,
    /// Player left
    PLAYER_LEFT,

    /// Points of player changed
    PLAYER_POINTS_CHANGED,

    /// Buzzer pressed
    BUZZER_PRESSED_BY_PLAYER,
    /// Buzzer wurde released
    BUZZER_RELEASED,

    /// Server Closed
    SERVER_CLOSED,


    /// Ping event
    SERVER_PING
}