export interface PlayerInfo {
    id: string;
    name: string;
    teamId?: string;
    points: number;
}

export interface BasePlayerInfo {
    playerId: string;
    teamId?: string;
    isLocked: boolean
}

export interface BuzzerInfo extends BasePlayerInfo {
    buzzerTime: number,
}

export interface InputInfo extends BasePlayerInfo {
    input: string;
}