import WebSocketClient from "connection/WebSocketClient";
import WebSocketConnection from "connection/WebSocketConnection";
import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
import { ServerEvents } from "gameshow-lib/enums/ServerEvents";
import { ClientMessage } from "gameshow-lib/messages/ClientMessage";

export default class InputManager {
    private readonly connection: WebSocketConnection;
    private readonly buzzerPressed: Map<string, number> = new Map();
    private playerBuzzerLocked: string[] = [];

    public constructor (connection: WebSocketConnection) {
        this.connection = connection;
    }
    
    public handleInputs(client: WebSocketClient, m: ClientMessage): void {
        switch(m.type) {
            case ClientEvents.PLAYER_INPUT_CHANGED:
                this.connection.broadcastExcept({
                    type: ServerEvents.PLAYER_INPUT_CHANGED,
                    id: client.uuid,
                    input: m.input
                }, client);
                break;
            case ClientEvents.GAMEMASTER_LOCK_INPUTS:
                if(m.playerId) {
                    this.connection.broadcast({
                        type: ServerEvents.PLAYER_INPUT_LOCKED,
                        id: m.playerId
                    });
                } else {
                    this.connection.broadcast({
                        type: ServerEvents.INPUTS_LOCKED
                    })
                }
                break;
            case ClientEvents.GAMEMASTER_RELEASE_INPUTS:
                if(m.playerId) {
                    this.connection.broadcast({
                        type: ServerEvents.PLAYER_INPUT_RELEASED,
                        id: m.playerId
                    });
                } else {
                    this.connection.broadcast({
                        type: ServerEvents.INPUTS_RELEASED
                    })

                    this.connection.broadcast({
                        type: ServerEvents.BUZZER_RELEASED
                    })
                }
                break;
            case ClientEvents.PLAYER_BUZZER_PRESSED:
                if (this.buzzerPressed.has(client.uuid)) {
                    return;
                }

                let dateNow = Date.now();
                this.buzzerPressed.set(client.uuid, dateNow);

                this.connection.broadcast({
                    type: ServerEvents.BUZZER_PRESSED_BY_PLAYER,
                    playerId: client.uuid,
                    time: dateNow
                })
                break;
            case ClientEvents.GAMEMASTER_RELEASE_BUZZER:
                this.buzzerPressed.clear();

                this.connection.broadcastExcept({
                    type: ServerEvents.BUZZER_RELEASED,
                },
                    ...this.connection.clients.filter(x => this.playerBuzzerLocked.find(lockedId => x.uuid == lockedId))
                )
                break;
            case ClientEvents.GAMEMASTER_LOCK_BUZZER:
                this.connection.broadcast({
                    type: ServerEvents.BUZZER_LOCKED,
                })
                break;
            case ClientEvents.GAMEMASTER_ANSWER_RIGHT:
                this.connection.broadcast({
                    type: ServerEvents.ANSWER_RIGHT
                });
                break;
            case ClientEvents.GAMEMASTER_ANSWER_WRONG:
                this.connection.broadcast({
                    type: ServerEvents.ANSWER_WRONG
                });
                break;
            case ClientEvents.GAMEMASTER_LOCK_BUZZER_FOR_PLAYER:
                this.playerBuzzerLocked.push(m.playerId);

                this.connection.clients.find(x => x.uuid == m.playerId)?.send({
                    type: ServerEvents.BUZZER_LOCKED,
                })
                break;
            case ClientEvents.GAMEMASTER_RELEASE_BUZZER_FOR_PLAYER:
                this.playerBuzzerLocked = this.playerBuzzerLocked.filter(x => x != m.playerId);
                break;
        }

    }
}