import type { ClientMessage } from "gameshow-lib/messages/ClientMessage";
import WebSocketClient from "./WebSocketClient";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import type { ServerMessage } from "gameshow-lib/messages/ServerMessage";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";
import { players } from "$lib/store/PlayerStore";
import { inputs } from "$lib/store/InputStore";
import { buzzers, isBuzzerLocked } from "$lib/store/BuzzerStore";
import { alertStore } from "$lib/store/AlertStore";
import { currentUserId, isLoggedIn } from "$lib/store/LoginStore";
import { answerRightSound, answerWrongSound, buzzerSoundPlayed } from "$lib/store/AudioStore";
import { get } from "svelte/store";
import { teamStore } from "$lib/store/TeamStore";

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
        //this.client = new WebSocketClient("wss://gameshow.k-meier.ch/buzzer/socket");
        this.client = new WebSocketClient("ws://localhost:2222");
        this.awaitConnection(20).then((result) => {
            if (!result) {
                alertStore.showError("Couldn't connect to the server!", true)
            }
        })

        this.client.recieve = (m) => this.recieve(m);
    }

    public async awaitConnection(timeout: number): Promise<boolean> {
        let index = 0;
        while (!this.client.isOpen && index < timeout) {
            console.log("Checking", this.client.isOpen, index);
            await new Promise(r => setTimeout(r, 100));
            index++;
        }

        return this.client.isOpen;
    }

    public get IsConnected() {
        return this.client?.isOpen ?? false;
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
            case ServerEvents.PLAYER_SET_ID:
                currentUserId.set(m.id);
                isLoggedIn.set(true);
                break;
            case ServerEvents.PLAYER_JOINED:
                players.addPlayer(m.id, m.name, m.teamId);
                inputs.addPlayer(m.id, m.teamId);
                break;
            
            case ServerEvents.PLAYER_LEFT:
                players.removePlayer(m.id);
                inputs.removePlayer(m.id);
                break;

            case ServerEvents.PLAYER_POINTS_CHANGED:
                players.setPoints(m.playerId, m.points);
                break;

            case ServerEvents.PLAYER_INPUT_CHANGED:
                inputs.inputChanged(m.id, m.input);
                break;
            case ServerEvents.PLAYER_INPUT_LOCKED:
                inputs.lockedForPlayer(m.id);
                break;
            case ServerEvents.PLAYER_INPUT_RELEASED:
                inputs.releasedForPlayer(m.id);
                break;

            case ServerEvents.INPUTS_LOCKED:
                inputs.locked();
                break;
            case ServerEvents.INPUTS_RELEASED:
                inputs.released();
                break;

            case ServerEvents.BUZZER_PRESSED_BY_PLAYER:
                { const currentPlayer = get(players).find(x => x.id == m.playerId)!;
                
                buzzers.playerBuzzed(m.playerId, currentPlayer.teamId, m.time);
                break; }
            case ServerEvents.BUZZER_RELEASED:
                buzzers.clearBuzzing();
                buzzerSoundPlayed.set(false);
                isBuzzerLocked.set(false);
                break;
            case ServerEvents.BUZZER_LOCKED:
                isBuzzerLocked.set(true);
                break;

            case ServerEvents.ANSWER_RIGHT:
                get(answerRightSound).play();
                break;
            case ServerEvents.ANSWER_WRONG:
                get(answerWrongSound).play();
                break;
            case ServerEvents.TEAMS_CHANGED:
                teamStore.set(m.teams);
                break;

            case ServerEvents.SERVER_PING:
                console.log("Player pinged");
                break;
            default:
                throw new Error("Need to implement this shit!");
        }
    }
}