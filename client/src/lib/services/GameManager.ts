import type { ClientMessage } from "gameshow-lib/messages/ClientMessage";
import WebSocketClient from "./WebSocketClient";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import type { ServerMessage } from "gameshow-lib/messages/ServerMessage";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";
import { players } from "$lib/store/PlayerStore";

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
            case ServerEvents.PLAYER_JOINED:
                players.update(x => [...x, { id: m.id, name: m.name, input: '', isBuzzerPressed: false, isInputLocked: false, points: 0 }]);
                break;
            
            case ServerEvents.PLAYER_LEFT:
                players.update(x => x.filter(x => x.id != m.id ));
                break;

            case ServerEvents.PLAYER_POINTS_CHANGED:
                players.update(x => {
                    let player = x.find(z => z.id == m.playerId);
                    if (!player) {
                        throw Error("Points changed for an unkown player");
                    }

                    player.points = m.points;
                    return x;
                })
                break;
            case ServerEvents.BUZZER_PRESSED_BY_PLAYER:
                players.update(x => {
                    let player = x.find(z => z.id == m.playerId);
                    if (!player) {
                        throw Error("Points changed for an unkown player");
                    }

                    player.isBuzzerPressed = true;
                    return x;
                })
                break;
            case ServerEvents.BUZZER_RELEASED:
                players.update(x => {
                    x.forEach(player => {
                        player.isBuzzerPressed = false;
                    });
                    return x;
                })
                break;
            case ServerEvents.SERVER_PING:
                console.log("Player pinged");
                break;
            default:
                throw new Error("Need to implement this shit!");
        }
    }
}