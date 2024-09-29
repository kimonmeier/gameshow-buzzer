import { type BasePlayerInfo, type BuzzerInfo, type PlayerInfo } from "$lib/models/Player";
import { writable, type Readable, get, type Updater, type Subscriber } from "svelte/store";


interface PlayerStore extends Readable<PlayerInfo[]> {
    addPlayer: (playerId: string, name: string) => void;
    removePlayer: (playerId: string) => void;
    setPoints: (playerId: string, points: number) => void;
}

export interface BasePlayerStore<T> {
    addPlayer: (playerId: string) => void;
    removePlayer: (playerId: string) => void;
    lockedForPlayer: (playerId: string) => void;
    locked: () => void;
    releasedForPlayer: (playerId: string) => void;
    released: () => void;
}

export function createBasicPlayerStore<T extends BasePlayerInfo>(createFunction: ((playerId: string) => T), update: ((this: void, updater: Updater<T[]>) => void)): BasePlayerStore<T> {
    return {
        addPlayer: (playerId: string) => update(x => [...x, createFunction(playerId)]),       
        removePlayer: (playerId: string) => update(x => x.filter(z => z.playerId != playerId)),
        locked: () => update(x => { x.forEach(element => element.isLocked = true); return x; }),
        lockedForPlayer: (playerId: string) => update(x => { x.find(z => z.playerId == playerId)!.isLocked = true; return x; }),
        released: () => update(x => { x.forEach(element => element.isLocked = false); return x; }),
        releasedForPlayer: (playerId: string) => update(x => { x.find(z => z.playerId == playerId)!.isLocked = false; return x; }),
    }
}

function createPlayerStore(): PlayerStore {
    const { update, subscribe} = writable<PlayerInfo[]>([]);

    return {
        subscribe,
        addPlayer: (playerId: string, name: string, teamId?: string) => update(x => [...x, { id: playerId, name, teamId, input: '', isBuzzerPressed: false, isInputLocked: false, points: 0 }]),
        removePlayer: (playerId: string) => update(x => x.filter(z => z.id != playerId)),
        setPoints: (playerId: string, points: number) => {
            get({subscribe}).find(x => x.id == playerId)!.points = points;

            update(x => x);
        }
    };
}

export const players = createPlayerStore();