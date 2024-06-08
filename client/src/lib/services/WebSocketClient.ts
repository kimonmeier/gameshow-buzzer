import { alertStore } from "$lib/store/AlertStore";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";
import type { ClientMessage } from "gameshow-lib/messages/ClientMessage";
import type { ServerMessage } from "gameshow-lib/messages/ServerMessage";

export default class WebSocketClient {
	private readonly ip: string;
	private isReconnecting: boolean = false;
	private socket: WebSocket | null = null;
	private interval: number[] = [];
	private lastPingAnswer: number = -1;

	public constructor (ip: string) {
		this.ip = ip;
		this.startConnection();
	}

	private startConnection() {
		this.socket = null;
		this.socket = new WebSocket(this.ip);
		this.socket.onmessage = (event) => { 
			let data = JSON.parse(event.data as string) as ServerMessage;

			if (data.type != ServerEvents.SERVER_PING) {
				this.recieve(data);
				return;
			}
			
			this.lastPingAnswer = Date.now();
		};
		this.socket.onclose = (e) => this.closed(e);
		this.socket.onopen = (e) => this.connected(e);
	}

	public send(m: ClientMessage): void {
		if (this.socket?.readyState != WebSocket.OPEN) {
			return;
		}

		console.log("Sended message", m)
		this.socket!.send(JSON.stringify(m));
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
	public recieve(m: ServerMessage): void {
	}	
	
	public connected(e: Event): void {
		if (this.isReconnecting) {
			return;
		}

		alertStore.clear();
		this.lastPingAnswer = Date.now();
		this.interval.push(setInterval(() => {
			this.send({ type: ClientEvents.SERVER_PING, date: Date.now() });
		}, 500));
		this.interval.push(setInterval(() => this.checkPingAnswer(), 1000));

		this.isReconnecting = true;
	}

	public closed(e: CloseEvent): void {
		if (this.isReconnecting) {
			return;
		}

		this.interval.forEach(interval => {
			clearInterval(interval);
		})

		alertStore.showError("Verbindung zum Server wurde unterbrochen weil " + e.reason, true)
	}

	public get isOpen(): boolean {
		return this.socket!.readyState === WebSocket.OPEN;
	}

	private get isTryingToConnect(): boolean {
		return this.socket!.readyState === WebSocket.CONNECTING;
	}

	private checkPingAnswer(): void {		
		if (this.isTryingToConnect) {
			console.log("Already trying");
			return;
		}

		if (this.lastPingAnswer < Date.now() - 10_000) {
			this.startConnection();
			alertStore.showError("Es scheint so als hättest du einen Verbindungsabbruch gehabt, es wird versucht sich wieder zu verbinden!", true);
			return;
		}

		if (this.lastPingAnswer < Date.now() - 1_000) {
			alertStore.showWarning("Achtung du hast eine langsame Verbindung!", false);
			return;
		}

		alertStore.clear();
	}
}