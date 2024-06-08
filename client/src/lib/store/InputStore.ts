import type { InputInfo } from "$lib/models/Player";
import { writable, type Readable } from "svelte/store";
import { createBasicPlayerStore, type BasePlayerStore } from "./PlayerStore";


interface InputStore extends Readable<InputInfo[]>, BasePlayerStore<InputInfo> {
    inputChanged: (playerId: string, input: string) => void; 
}

function create(playerId: string): InputInfo {
    return {
        playerId: playerId,
        input: '',
        isLocked: false
    }
}

function createBuzzerStore(): InputStore {
    const { update, subscribe } = writable<InputInfo[]>([]);

    return {
        ...createBasicPlayerStore(create, update),  
        subscribe,
        inputChanged: (playerId: string, input: string) => update(x => { x.find(z => z.playerId == playerId)!.input = input; return x; }),
    }
}

export const inputs = createBuzzerStore();
export const isInputFocused = writable<boolean>(false);