import { PlayerId, TeamId } from "gameshow-lib/Types";
import { AppSocket } from "./App";
import { v4 as uuidv4,} from 'uuid';
import { BasicManager } from "./BasicManager";
import { HistoryManager } from "./HistoryManager";

export class TeamManager implements BasicManager {
    private readonly historyManager: HistoryManager;

    private teams: { id: TeamId, name: string }[] = [];

    public constructor(historyManager: HistoryManager) {
        this.historyManager = historyManager;
    }

    public registerSocket(socket: AppSocket, uuid: PlayerId): void {
        socket
            .on('GAMEMASTER_TEAM_CREATE', (name) => this.createTeam(name))
            .on('GAMEMASTER_TEAM_DELETE', (teamId) => this.removeTeam(teamId));
    }

    public unregisterSocket(Socket: AppSocket, uuid: PlayerId): void {
        throw new Error("Not implemented");
    }

    private createTeam(teamName: string): void {
        this.teams.push({
            id: uuidv4() as TeamId,
            name: teamName
        })

        this.historyManager.SendAndSaveToHistory('TEAMS_CHANGED', this.teams);
    }

    private removeTeam(teamId: TeamId): void {
        this.teams = this.teams.filter(x => x.id != teamId);

        this.historyManager.SendAndSaveToHistory('TEAMS_CHANGED', this.teams);
    }
}