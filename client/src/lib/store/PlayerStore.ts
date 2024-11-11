import { type BasePlayerInfo, type PlayerInfo } from "$lib/models/Player";
import type { PlayerId, TeamId } from "gameshow-lib/Types";
import { writable, type Readable, get, type Updater } from "svelte/store";


interface PlayerStore extends Readable<PlayerInfo[]> {
    addPlayer: (playerId: PlayerId, name: string, teamId: TeamId | undefined) => void;
    removePlayer: (playerId: PlayerId) => void;
    setPoints: (playerId: PlayerId, points: number) => void;
}

export interface BasePlayerStore {
    addPlayer: (playerId: PlayerId, teamId:  TeamId | undefined) => void;
    removePlayer: (playerId: PlayerId) => void;
    lockedForPlayer: (playerId: PlayerId) => void;
    locked: () => void;
    releasedForPlayer: (playerId: PlayerId) => void;
    released: () => void;
}

export function createBasicPlayerStore<T extends BasePlayerInfo>(createFunction: ((playerId: PlayerId, teamId: TeamId | undefined) => T), update: ((this: void, updater: Updater<T[]>) => void)): BasePlayerStore {
    return {
        addPlayer: (playerId: PlayerId, teamId: TeamId | undefined) => update(x => [...x, createFunction(playerId, teamId)]),       
        removePlayer: (playerId: PlayerId) => update(x => x.filter(z => z.playerId != playerId)),
        locked: () => update(x => { x.forEach(element => element.isLocked = true); return x; }),
        lockedForPlayer: (playerId: PlayerId) => update(x => { x.find(z => z.playerId == playerId)!.isLocked = true; return x; }),
        released: () => update(x => { x.forEach(element => element.isLocked = false); return x; }),
        releasedForPlayer: (playerId: PlayerId) => update(x => { x.find(z => z.playerId == playerId)!.isLocked = false; return x; }),
    }
}

function createPlayerStore(): PlayerStore {
    const { update, subscribe} = writable<PlayerInfo[]>([]);

    return {
        subscribe,
        addPlayer: (playerId: PlayerId, name: string, teamId?: TeamId) => update(x => [...x, { id: playerId, name, teamId, input: '', isBuzzerPressed: false, isInputLocked: false, points: 0 }]),
        removePlayer: (playerId: PlayerId) => update(x => x.filter(z => z.id != playerId)),
        setPoints: (playerId: PlayerId, points: number) => {
            get({subscribe}).find(x => x.id == playerId)!.points = points;

            update(x => x);
        }
    };
}

export const players = createPlayerStore();