import { players } from '$lib/store/PlayerStore';
import { inputs } from '$lib/store/InputStore';
import { buzzers, isBuzzerLocked } from '$lib/store/BuzzerStore';
import { answerRightSound, answerWrongSound, buzzerSoundPlayed } from '$lib/store/AudioStore';
import { get } from 'svelte/store';
import { teamStore } from '$lib/store/TeamStore';
import { io, type Socket } from 'socket.io-client';
import type { ServerToClientEvents } from 'gameshow-lib/ServerToClientEvents';
import type { ClientToServerEvents } from 'gameshow-lib/ClientToServerEvents';

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export default class App {
	private static instance: App;

	public static getInstance(): App {
		if (App.instance == undefined) {
			new App();
		}

		return App.instance;
	}

	public static getSocket(): AppSocket {
		return this.getInstance().client;
	}

	private client!: AppSocket;

	private constructor() {
		App.instance = this;
	}

	public startApp(): void {
		this.client = io({
			autoConnect: true,
			reconnection: true,
			reconnectionAttempts: 10000
		});
		this.registerHandlers(this.client);

		this.client.connect();
	}

	public get IsConnected() {
		return this.client?.connected ?? false;
	}

	public stopApp(): void {
		this.client.emit('PLAYER_LEAVING');
		this.client.disconnect();
	}

	private registerHandlers(socket: AppSocket) {
		socket
			.onAny((args) => {
				console.log('Neue Nachricht vom Server');
				console.log(args);
			})
			.on('PLAYER_JOINED', (playerId, name, teamId) => {
				players.addPlayer(playerId, name, teamId);
				inputs.addPlayer(playerId, teamId);
			})
			.on('PLAYER_LEFT', (playerId) => {
				players.removePlayer(playerId);
				inputs.removePlayer(playerId);
			})
			.on('PLAYER_POINTS_CHANGED', (playerId, points) => players.setPoints(playerId, points))
			.on('PLAYER_INPUT_CHANGED', (playerId, input) => inputs.inputChanged(playerId, input))
			.on('PLAYER_INPUT_LOCKED', (playerId) => inputs.lockedForPlayer(playerId))
			.on('PLAYER_INPUT_RELEASED', (playerId) => inputs.releasedForPlayer(playerId))
			.on('INPUTS_LOCKED', () => inputs.locked())
			.on('INPUTS_RELEASED', () => inputs.released())
			.on('BUZZER_PRESSED_BY_PLAYER', (playerId, time) => {
				const currentPlayer = get(players).find((x) => x.id == playerId)!;

				buzzers.playerBuzzed(playerId, currentPlayer.teamId, time);
			})
			.on('BUZZER_RELEASED', () => {
				buzzers.clearBuzzing();
				buzzerSoundPlayed.set(false);
				isBuzzerLocked.set(false);
			})
			.on('BUZZER_LOCKED', () => isBuzzerLocked.set(true))
			.on('ANSWER_RIGHT', () => get(answerRightSound).play())
			.on('ANSWER_WRONG', () => get(answerWrongSound).play())
			.on('TEAMS_CHANGED', (teams) => teamStore.set(teams));
	}
}
