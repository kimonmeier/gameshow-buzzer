import WebSocketConnection from "connection/WebSocketConnection";
import PlayerManager from "./PlayerManager";
import WebSocketClient from "connection/WebSocketClient";
import { ClientMessage } from "gameshow-lib/messages/ClientMessage";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";

export class TeamManager {
    private readonly connection: WebSocketConnection;
    private readonly playerManager: PlayerManager;

    private teams: {id: string, name: string}[] = [];

    public constructor(connection: WebSocketConnection, playerManager: PlayerManager) {
        this.connection = connection;
        this.playerManager = playerManager;
    }

    public handleInputs(client: WebSocketClient, m: ClientMessage): void {
        switch (m.type) {
            case ClientEvents.GAMEMASTER_TEAM_CREATE:
                this.teams.push({
                    id: crypto.randomUUID(),
                    name: m.name
                })

                this.connection.broadcast({
                    type: ServerEvents.TEAMS_CHANGED,
                    teams: this.teams
                })
                break;
            case ClientEvents.GAMEMASTER_TEAM_DELETE:
                this.teams = this.teams.filter(x => x.id != m.teamId);

                this.connection.broadcast({
                    type: ServerEvents.TEAMS_CHANGED,
                    teams: this.teams
                })
                break;
        }
    }
}