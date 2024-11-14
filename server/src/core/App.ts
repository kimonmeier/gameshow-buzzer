import PlayerManager from "./PlayerManager";
import InputManager from "./InputManager";
import { TeamManager } from "./TeamManager";
import { Server, Socket } from "socket.io";
import { ServerToClientEvents } from "gameshow-lib/ServerToClientEvents";
import { ClientToServerEvents } from "gameshow-lib/ClientToServerEvents";
import { randomUUID } from "crypto";
import { PlayerId } from "gameshow-lib/Types";
import { HistoryManager } from "./HistoryManager";

export type AppServer = Server<ClientToServerEvents, ServerToClientEvents, {}, {}>;
export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents, {}, {}>

export default class App {
    private readonly WebSocket: AppServer;
    private readonly HistoryManager: HistoryManager;
    private readonly PlayerManager: PlayerManager;
    private readonly InputManager: InputManager;
    private readonly TeamManager: TeamManager;

    public constructor () {
        this.WebSocket = new Server<ClientToServerEvents, ServerToClientEvents, {}, {}>({
            connectionStateRecovery: {},
        });
        this.HistoryManager = new HistoryManager(this.WebSocket);
        this.PlayerManager = new PlayerManager(this.WebSocket, this.HistoryManager);
        this.InputManager = new InputManager(this.WebSocket, this.HistoryManager);
        this.TeamManager = new TeamManager(this.HistoryManager);
    }

    public startApp(): void {
        console.log("Websocket wurde gestartet!");

        this.WebSocket.on('connect', () => {
            console.log("Something is trying to connect")
        });

        this.WebSocket.on('connect', async (socket) => {
            const userId = randomUUID() as PlayerId;
            socket.join(userId);

            socket.on('disconnect', (reason) => {
                console.log("Player disconnected because: ", reason);

                this.PlayerManager.PlayerLeaving(userId);
            })

            this.HistoryManager.registerSocket(socket, userId);
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