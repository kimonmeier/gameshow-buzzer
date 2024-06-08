import WebSocketClient from "../connection/WebSocketClient";
import WebSocketConnection from "../connection/WebSocketConnection";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";
import { ClientMessage } from "gameshow-lib/messages/ClientMessage";

export default class PlayerManager {
    private readonly connection: WebSocketConnection;

    private players: Map<WebSocketClient, Player> = new Map();
    private gameProgress: Map<string, number> = new Map();
    private gameMasterId: string = "";


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

    public handleInputs(client: WebSocketClient, m: ClientMessage): void {
        switch(m.type) {
            case ClientEvents.PLAYER_CONNECTING:
                this.players.set(client, {
                    client,
                    name: m.name,
                });

                this.connection.broadcast({
                    type: ServerEvents.PLAYER_JOINED,
                    id: client.uuid,
                    name: m.name,
                });

                client.send({
                    type: ServerEvents.PLAYER_SET_ID,
                    id: client.uuid
                })
                break;
            case ClientEvents.REQUEST_GAMEMASTER:
                if (this.gameMasterId != "") {
                    console.log("Connection closed because there is already a gamemaster logged in")
                    client.close("Already a gamemaster in the game");
                    return;
                }

                this.gameMasterId = client.uuid;
            case ClientEvents.PLAYER_LEAVING:
                this.gameProgress.delete(client.uuid);
                this.players.delete(client);
    
                this.connection.broadcast({
                    type: ServerEvents.PLAYER_LEFT,
                    id: client.uuid
                });
                break;
            case ClientEvents.GAMEMASTER_DECREASE_POINTS_BY_PLAYER:
                let decreasedPlayerPoints = (this.gameProgress.get(m.playerId) ?? 0) - m.points;
                this.gameProgress.set(m.playerId, decreasedPlayerPoints);

                this.connection.broadcast({
                    type: ServerEvents.PLAYER_POINTS_CHANGED,
                    playerId: m.playerId,
                    points: decreasedPlayerPoints
                })
                break;
            case ClientEvents.GAMEMASTER_INCREASE_POINTS_BY_PLAYER:
                let increasedPlayerPoints = (this.gameProgress.get(m.playerId) ?? 0) + m.points;
                this.gameProgress.set(m.playerId, increasedPlayerPoints);

                this.connection.broadcast({
                    type: ServerEvents.PLAYER_POINTS_CHANGED,
                    playerId: m.playerId,
                    points: increasedPlayerPoints
                })
                break;
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