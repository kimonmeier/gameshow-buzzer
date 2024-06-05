import type { ClientMessage } from "gameshow-lib/messages/ClientMessage";
import WebSocketClient from "../connection/WebSocketClient";
import WebSocketConnection from "../connection/WebSocketConnection";
import PlayerManager from "./PlayerManager";

export default class App {
    private readonly WebSocket: WebSocketConnection;
    private readonly PlayerManager: PlayerManager;
    public lastControlled: number = 0;
    public currentPlayer: number = 0;

    public constructor () {
        this.WebSocket = new WebSocketConnection();
        this.PlayerManager = new PlayerManager(this.WebSocket);
    }

    public startApp(): void {
        console.log("Websocket wurde gestartet!");

        this.WebSocket.connect();

        this.WebSocket.addListener("message", (client: WebSocketClient, message: ClientMessage) => {
            console.log("Neue Nachricht vo dem Client: " + client.ip);
            console.log(message);

            this.PlayerManager.handleInputs(client, message);
        });
    }

    public stopApp(): void {
    }
}