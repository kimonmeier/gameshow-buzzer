import PlayerManager from "./PlayerManager";
import InputManager from "./InputManager";
import { TeamManager } from "./TeamManager";
import { Server, Socket } from "socket.io";
import { ServerToClientEvents } from "gameshow-lib/ServerToClientEvents";
import { ClientToServerEvents } from "gameshow-lib/ClientToServerEvents";
import { randomUUID } from "crypto";
import { PlayerId } from "gameshow-lib/Types";

export type AppServer = Server<ClientToServerEvents, ServerToClientEvents, {}, {}>;
export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents, {}, {}>

export default class App {
    private readonly WebSocket: AppServer;
    private readonly PlayerManager: PlayerManager;
    private readonly InputManager: InputManager;
    private readonly TeamManager: TeamManager;
    private readonly history: any[] = [];

    public constructor () {
        this.WebSocket = new Server<ClientToServerEvents, ServerToClientEvents, {}, {}>({
            connectionStateRecovery: {},
        });
        this.PlayerManager = new PlayerManager(this.WebSocket);
        this.InputManager = new InputManager(this.WebSocket);
        this.TeamManager = new TeamManager(this.WebSocket);
    }

    public startApp(): void {
        console.log("Websocket wurde gestartet!");

        this.WebSocket.on('connect', () => {
            console.log("Something is trying to connect")
        })
        this.WebSocket.on('connection', async (socket) => {
            const userId = randomUUID() as PlayerId;

            socket.conn.on("packetCreate", ({ type, data }) => {
                console.log(data);
                if (this.history[this.history.length - 1] != data) {
                    console.log("New entry found,");
                    this.history.push(data);
                } else {
                    console.log("Already cached");
                }
            });
            socket.join(userId);

            this.history.forEach((data) => {
                socket.conn.send(data)
            })

            this.InputManager.registerSocket(socket, userId);
            this.PlayerManager.registerSocket(socket, userId);
            this.TeamManager.registerSocket(socket, userId);
        })

        this.WebSocket.listen(3000);
    }

    public stopApp(): void {
        this.WebSocket.close();
    }
}