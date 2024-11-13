import { PlayerId, TeamId } from "gameshow-lib/Types";
import { AppServer, AppSocket } from "./App";
import { BasicManager } from "./BasicManager";
import { on } from "events";

export default class PlayerManager implements BasicManager {
    private readonly connection: AppServer;

    private gameProgress: Map<PlayerId, number> = new Map();
    private gameMasterId: PlayerId | undefined = undefined;
    private players: PlayerId[] = [];

    public constructor (connection: AppServer) {
        this.connection = connection;
    }

    public registerSocket(socket: AppSocket, uuid: PlayerId) {
        socket
            .on('PLAYER_CONNECTING', (name, teamId, callback) => callback(this.playerConnecting(name, teamId, uuid)))
            .on('PLAYER_LEAVING', () => this.playerLeaving(uuid))
            .on('REQUEST_GAMEMASTER', (callback) => callback(this.requestGameMaster(uuid)))
            .on('GAMEMASTER_DECREASE_POINTS_BY_PLAYER', (playerId, points) => this.decreatePointsOfPlayer(playerId, points))
            .on('GAMEMASTER_INCREASE_POINTS_BY_PLAYER', (playerId, points) => this.increasePointsOfPlayer(playerId, points))
            .on('GAMEMASTER_CHANGE_POINTS_BY_PLAYER', (playerId, points) => this.changePointsOfPlayer(playerId, points))
            .on('disconnect', () => {
                if (this.gameMasterId != uuid) {
                    return;
                }

                this.gameMasterId = undefined;
            });
    }

    public unregisterSocket(Socket: AppSocket, uuid: PlayerId) {
        throw new Error("Not implemented")
    }

    private playerConnecting(name: string, teamId: TeamId | undefined, playerId: PlayerId): PlayerId | undefined {
        if (this.players.find(x => x == playerId)) {
            return undefined;
        }
        
        this.players.push(playerId);

        this.connection.emit('PLAYER_JOINED', playerId, name, teamId);
        
        return playerId;
    }

    private playerLeaving(playerId: PlayerId): void {
        if (!this.players.find(x => x == playerId)) {
            return;
        }
        
        this.gameProgress.delete(playerId);
        this.players = this.players.filter(x => x != playerId)

        this.connection.emit('PLAYER_LEFT', playerId);
    }

    private requestGameMaster(id: PlayerId): boolean {
        if (this.gameMasterId != undefined) {
            console.log("Connection closed because there is already a gamemaster logged in")
            return false;
        }

        this.gameMasterId = id;
        return true;
    }

    private decreatePointsOfPlayer(playerId: PlayerId, points: number): void {
        const decreasedPlayerPoints = (this.gameProgress.get(playerId) ?? 0) - points;
        this.gameProgress.set(playerId, decreasedPlayerPoints);

        this.connection.emit('PLAYER_POINTS_CHANGED', playerId, decreasedPlayerPoints);
    }

    private increasePointsOfPlayer(playerId: PlayerId, points: number): void {
        const increasedPlayerPoints = (this.gameProgress.get(playerId) ?? 0) + points;
        this.gameProgress.set(playerId, increasedPlayerPoints);

        this.connection.emit('PLAYER_POINTS_CHANGED', playerId, increasedPlayerPoints);
    }

    private changePointsOfPlayer(playerId: PlayerId, points: number): void {
        this.gameProgress.set(playerId, points);

        this.connection.emit('PLAYER_POINTS_CHANGED', playerId, points);
    }
}