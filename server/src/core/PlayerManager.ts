import WebSocketClient from "../connection/WebSocketClient";
import WebSocketConnection from "../connection/WebSocketConnection";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";
import { ClientMessage } from "gameshow-lib/messages/ClientMessage";

export default class PlayerManager {
    private readonly connection: WebSocketConnection;

    private players: Map<WebSocketClient, Player> = new Map();
    private gameProgress: Map<string, number> = new Map();


    public constructor (connection: WebSocketConnection) {
        this.connection = connection;
    }

    public clearGame(): void {
        this.gameProgress.clear();
    }

    public getGamePoints(uuid: string): number {
        if (!this.gameProgress.has(uuid)) {
            this.gameProgress.set(uuid, 0);
        }
        return this.gameProgress.get(uuid)!;
    }

    public setGamePoints(uuid: string, points: number): void {
        this.gameProgress.set(uuid, points);

        this.connection.broadcast({
            type: ServerEvents.PLAYER_POINTS_CHANGED,
            playerId: uuid,
            points
        });
    }

    public handleInputs(client: WebSocketClient, m: ClientMessage): void {
        if (m.type == ClientEvents.PLAYER_CONNECTING) {
            this.players.set(client, {
                client,
                name: m.name,
            });

            this.connection.broadcast({
                type: ServerEvents.PLAYER_JOINED,
                id: client.uuid,
                name: m.name,
            });
        } else if (m.type == ClientEvents.PLAYER_LEAVING) {
            this.gameProgress.delete(client.uuid);

            this.players.delete(client);

            this.connection.broadcast({
                type: ServerEvents.PLAYER_LEFT,
                id: client.uuid
            });
        }
    }

    public getPlayerByUuid(uuid: string): Player {
        return this.players.get(this.connection.clients.find(x => x.uuid == uuid) as WebSocketClient) as Player;
    }

    public getPlayers(): Player[] {
        return Array.from(this.players.values());
    }
}

export interface Player {
    client: WebSocketClient;
    name: string;
}