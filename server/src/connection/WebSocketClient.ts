import * as uuid from "uuid";
import { WebSocket } from "ws";

import Client from "gameshow-lib/Client"
import { ServerMessage } from "gameshow-lib/messages/ServerMessage"

export default class WebSocketClient implements Client {
	public readonly uuid: string;

	public constructor (private socket: WebSocket, public readonly ip: string) {
		this.uuid = uuid.v4();
	}

	public send(m: ServerMessage): void {
		this.socket.send(JSON.stringify(m));
	}

	public close(message: string): void {
		this.socket.close();
	}

	public get isOpen(): boolean {
		return this.socket.readyState === WebSocket.OPEN;
	}
}