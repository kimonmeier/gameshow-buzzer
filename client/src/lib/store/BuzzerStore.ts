import type { BuzzerInfo } from "$lib/models/Player";
import { writable, type Readable, get } from "svelte/store";
import { buzzerSound, buzzerSoundPlayed } from "./AudioStore";
import { players } from "./PlayerStore";
import type { PlayerId, TeamId } from "gameshow-lib/Types";


interface BuzzerStore extends Readable<BuzzerInfo[]> {
    clearBuzzing: () => void,
    playerBuzzed: (playerId: PlayerId, teamId: TeamId | undefined, time: number) => void;
}

function createBuzzerStore(): BuzzerStore {
    const { subscribe, set } = writable<BuzzerInfo[]>([]);

    return {
        subscribe,
        clearBuzzing: () => set([]),
        playerBuzzed: (playerId: PlayerId, teamId: TeamId | undefined, time: number) => { 
            const array = get({subscribe});
            array.push({ playerId, teamId: teamId, buzzerTime: time, isLocked: false })
            const currentPlayers = get(players);
            const currentPlayer = currentPlayers.find(x => x.id == playerId)!;

            if (currentPlayer.teamId) {
                currentPlayers.filter(x => x.teamId == currentPlayer.teamId && x.id != currentPlayer.id).forEach((player) => {
                    array.push({ playerId: player.id, buzzerTime: time, isLocked: false })
                })
            }

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