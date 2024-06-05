import type { ClientMessage } from "gameshow-lib/messages/ClientMessage";
import WebSocketClient from "./WebSocketClient";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import type { ServerMessage } from "gameshow-lib/messages/ServerMessage";

export default class App {
    private static instance: App;

    public static getInstance(): App {
        if (App.instance == undefined) {
            new App();
        }

        return App.instance;
    }

    private client!: WebSocketClient;

    private constructor () {
        App.instance = this;
    }

    public startApp(): void {
        //this.client = new WebSocketClient("wss://gameshow.k-meier.ch");
        this.client = new WebSocketClient("ws://localhost:2222");

        this.client.recieve = (m) => this.recieve(m);
    }

    public async awaitConnection(timeout: number): Promise<boolean> {
        console.log("await connection");
        let index = 0;
        while (!this.client.isOpen && index < timeout) {
            console.log("Checking", this.client.isOpen, index);
            await new Promise(r => setTimeout(r, 10));
            index++;
        }

        console.log("No checking anymore");

        return this.client.isOpen;
    }

    public stopApp(): void {
        this.client?.send({
            type: ClientEvents.PLAYER_LEAVING
        });
    }

    public sendMessage(m: ClientMessage): void {
        this.client.send(m);
    }

    private async recieve(m: ServerMessage): Promise<void> {
        console.log("Neue Nachricht vom Server");
        console.log(m);

        switch (m.type) {
            default:
                throw new Error("Need to implement this shit!");
        }
    }
}