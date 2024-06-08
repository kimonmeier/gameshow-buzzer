/// These events are send by the client and executed on the server
export enum ClientEvents {
    /// This event describes when an client tries to connect to the server
    PLAYER_CONNECTING,
    /// This event describes when a client tries to disconnect from the server
    PLAYER_LEAVING,

    /// Sends a ping request to the server to keep the connection open
    SERVER_PING
}