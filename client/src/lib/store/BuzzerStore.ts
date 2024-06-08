import type { BuzzerInfo } from "$lib/models/Player";
import { writable, type Readable, get } from "svelte/store";
import { createBasicPlayerStore, type BasePlayerStore } from "./PlayerStore";
import { buzzerSound, buzzerSoundPlayed } from "./AudioStore";


interface BuzzerStore extends Readable<BuzzerInfo[]> {
    clearBuzzing: () => void,
    playerBuzzed: (playerId: string, time: number) => void;
}

function createBuzzerStore(): BuzzerStore {
    const { subscribe, set } = writable<BuzzerInfo[]>([]);

    return {
        subscribe,
        clearBuzzing: () => set([]),
        playerBuzzed: (playerId: string, time: number) => { 
            let array = get({subscribe});
            array.push({ playerId, buzzerTime: time, isLocked: false })

            set(array.sort(z => z.buzzerTime))

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