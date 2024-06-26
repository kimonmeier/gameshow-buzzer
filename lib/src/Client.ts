import { ServerMessage } from "./messages/ServerMessage";

export default interface Client {
	readonly ip: string;
	readonly isOpen: boolean;
	send(m: ServerMessage): void;
	readonly uuid: string;
}