import { PlayerId } from "gameshow-lib/Types";
import { AppServer, AppSocket } from "./App";
import { BasicManager } from "./BasicManager";
import { HistoryManager } from "./HistoryManager";

export default class InputManager implements BasicManager {
    private readonly connection: AppServer;
    private readonly buzzerPressed: Map<PlayerId, number> = new Map();
    private readonly historyManager: HistoryManager;
    private playerBuzzerLocked: string[] = [];

    public constructor(connection: AppServer, historyManager: HistoryManager) {
        this.connection = connection;
        this.historyManager = historyManager;
    }

    public registerSocket(socket: AppSocket, uuid: PlayerId): void {
        socket
            .on('PLAYER_INPUT_CHANGED', (input) => this.inputChanged(uuid, input))
            .on('GAMEMASTER_LOCK_INPUTS', (playerId) => this.lockInputs(playerId))
            .on('GAMEMASTER_RELEASE_INPUTS', (playerId) => this.releaseInputs(playerId))
            .on('PLAYER_BUZZER_PRESSED', () => this.playerBuzzerPressed(uuid))
            .on('GAMEMASTER_RELEASE_BUZZER', () => this.releaseBuzzer())
            .on('GAMEMASTER_LOCK_BUZZER', () => this.lockBuzzer())
            .on('GAMEMASTER_ANSWER_RIGHT', () => this.answerRight())
            .on('GAMEMASTER_ANSWER_WRONG', () => this.answerWrong())
            .on('GAMEMASTER_LOCK_BUZZER_FOR_PLAYER', (playerId) => this.lockBuzzerForPlayer(playerId))
            .on('GAMEMASTER_RELEASE_BUZZER_FOR_PLAYER', (playerId) => this.releaseBuzzerForPlayer(playerId));
    }

    public unregisterSocket(Socket: AppSocket, uuid: PlayerId): void {
        throw new Error("Not implemented");
    }
    
    private inputChanged(playerId: PlayerId, input: string): void {
        this.connection.emit('PLAYER_INPUT_CHANGED', playerId, input);
    }

    private lockInputs(playerId?: PlayerId): void {
        if(playerId) {
            this.connection.emit('PLAYER_INPUT_LOCKED', playerId);
        } else {
            this.historyManager.SendAndSaveToHistory('INPUTS_LOCKED');
        }
    }

    private releaseInputs(playerId?: PlayerId): void {
        if(playerId) {
            this.connection.emit('PLAYER_INPUT_RELEASED', playerId);
        } else {
            this.historyManager.SendAndSaveToHistory('INPUTS_RELEASED');

            this.historyManager.SendAndSaveToHistory('BUZZER_RELEASED');
        }
    }

    private playerBuzzerPressed(playerId: PlayerId): void {
        let dateNow = Date.now();
        if (this.buzzerPressed.has(playerId)) {
            return;
        }
        this.buzzerPressed.set(playerId, dateNow);
        this.historyManager.SendAndSaveToHistory('BUZZER_PRESSED_BY_PLAYER', playerId, dateNow);
    }

    private releaseBuzzer(): void {
        this.buzzerPressed.clear();

        this.connection.except(this.playerBuzzerLocked).emit('BUZZER_RELEASED');
        this.historyManager.SaveToHistory('BUZZER_RELEASED');
    }

    private lockBuzzer(): void {
        this.historyManager.SendAndSaveToHistory('BUZZER_LOCKED');
    }

    private answerRight(): void {
        this.connection.emit('ANSWER_RIGHT');
    }

    private answerWrong(): void {
        this.connection.emit('ANSWER_WRONG');
    }

    private lockBuzzerForPlayer(playerId: PlayerId): void {
        this.playerBuzzerLocked.push(playerId);

        this.connection.to(playerId).emit('BUZZER_LOCKED');
    }

    private releaseBuzzerForPlayer(playerId: PlayerId): void {
        this.playerBuzzerLocked = this.playerBuzzerLocked.filter(x => x != playerId);

        if (this.buzzerPressed.size > 0) {
            return;
        }

        this.connection.to(playerId).emit('BUZZER_RELEASED');
    }
}