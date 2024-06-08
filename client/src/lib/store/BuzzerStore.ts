import type { BuzzerInfo } from "$lib/models/Player";
import { writable, type Readable, get } from "svelte/store";
import { createBasicPlayerStore, type BasePlayerStore } from "./PlayerStore";
import { buzzerSound, buzzerSoundPlayed } from "./AudioStore";


interface BuzzerStore extends Readable<BuzzerInfo[]>, BasePlayerStore<BuzzerInfo> {
    clearBuzzing: () => void,
    playerBuzzed: (playerId: string, time: number) => void;
}

function create(playerId: string): BuzzerInfo {
    return {
        playerId: playerId,
        isLocked: false,
        buzzerTime: null
    }
}

function createBuzzerStore(): BuzzerStore {
    const { update, subscribe, set } = writable<BuzzerInfo[]>([]);

    return {
        ...createBasicPlayerStore(create, update),  
        subscribe,
        clearBuzzing: () => update(x => { x.forEach(element => element.buzzerTime = null); return x; }),
        playerBuzzed: (playerId: string, time: number) => { 
            let array = get({subscribe});
            array.find(x => x.playerId == playerId)!.buzzerTime = time;

            set([...array].sort(z => z.buzzerTime ?? Number.MAX_VALUE))

            if (get(buzzerSoundPlayed)) {
                return;
            }
            buzzerSoundPlayed.set(true)
            get(buzzerSound).play();
        },
    }
}

export const buzzers = createBuzzerStore();
export const isBuzzerLocked = writable<boolean>(false);