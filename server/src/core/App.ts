import type { ClientMessage } from "gameshow-lib/messages/ClientMessage";
import WebSocketClient from "../connection/WebSocketClient";
import WebSocketConnection from "../connection/WebSocketConnection";
import PlayerManager from "./PlayerManager";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";
import InputManager from "./InputManager";

export default class App {
    private readonly WebSocket: WebSocketConnection;
    private readonly PlayerManager: PlayerManager;
    private readonly InputManager: InputManager;
    public lastControlled: number = 0;
    public currentPlayer: number = 0;

    public constructor () {
        this.WebSocket = new WebSocketConnection();
        this.PlayerManager = new PlayerManager(this.WebSocket);
        this.InputManager = new InputManager(this.WebSocket);
    }

    public startApp(): void {
        console.log("Websocket wurde gestartet!");

        this.WebSocket.connect();

        this.WebSocket.addListener("message", (client: WebSocketClient, message: ClientMessage) => {
            if (message.type == ClientEvents.SERVER_PING) {
                client.send({ type: ServerEvents.SERVER_PING })
                return;
            }

            console.log("Neue Nachricht vo dem Client: " + client.ip);
            console.log(message);

            this.PlayerManager.handleInputs(client, message);
            this.InputManager.handleInputs(client, message);
        });
    }

    public stopApp(): void {
        this.WebSocket.broadcast({
            type: ServerEvents.SERVER_CLOSED
        });
    }
}