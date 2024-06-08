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
    const { update, subscribe } = writable<BuzzerInfo[]>([]);

    return {
        ...createBasicPlayerStore(create, update),  
        subscribe,
        clearBuzzing: () => update(x => { x.forEach(element => element.buzzerTime = null); return x; }),
        playerBuzzed: (playerId: string, time: number) => { 
            update(x => { 
                let buzzerInfo = x.find(z => z.playerId == playerId);

                if (buzzerInfo?.buzzerTime == null) {
                    buzzerInfo!.buzzerTime = time;
                }

                return x;
             })

            if (get(buzzerSoundPlayed)) {
                return;
            }
            buzzerSoundPlayed.set(true)
            get(buzzerSound).play();
        },
    }
}

export const buzzers = createBuzzerStore();