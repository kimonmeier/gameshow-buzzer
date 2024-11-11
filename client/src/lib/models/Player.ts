import type { PlayerId, TeamId } from "gameshow-lib/Types";

export interface PlayerInfo {
    id: PlayerId;
    name: string;
    teamId?: TeamId;
    points: number;
}

export interface BasePlayerInfo {
    playerId: PlayerId;
    teamId?: TeamId;
    isLocked: boolean
}

export interface BuzzerInfo extends BasePlayerInfo {
    buzzerTime: number,
}

export interface InputInfo extends BasePlayerInfo {
    input: string;
}