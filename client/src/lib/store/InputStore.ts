import type { InputInfo } from "$lib/models/Player";
import { writable, type Readable } from "svelte/store";
import { createBasicPlayerStore, type BasePlayerStore } from "./PlayerStore";
import type { PlayerId, TeamId } from "gameshow-lib/Types";


interface InputStore extends Readable<InputInfo[]>, BasePlayerStore {
    inputChanged: (playerId: PlayerId, input: string) => void; 
}

function create(playerId: PlayerId, teamId?: TeamId): InputInfo {
    return {
        playerId: playerId,
        teamId: teamId,
        input: '',
        isLocked: false
    }
}

function createBuzzerStore(): InputStore {
    const { update, subscribe } = writable<InputInfo[]>([]);

    return {
        ...createBasicPlayerStore(create, update),  
        subscribe,
        inputChanged: (playerId: PlayerId, input: string) => update(x => {
            const currentPlayer = x.find(z => z.playerId == playerId);

            if (currentPlayer!.teamId) {
                const teamMates = x.filter(x => x.teamId == currentPlayer?.teamId);
                teamMates.forEach((player) => {
                    player.input = input;
                })
            }
            
            currentPlayer!.input = input;

            return x;
        }),
    }
}

export const inputs = createBuzzerStore();
export const isInputFocused = writable<boolean>(false);