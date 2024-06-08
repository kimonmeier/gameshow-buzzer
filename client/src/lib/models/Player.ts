export interface PlayerInfo {
    id: string;
    name: string;
    points: number;
}

export interface BasePlayerInfo {
    playerId: string;
    isLocked: boolean
}

export interface BuzzerInfo extends BasePlayerInfo {
    buzzerTime: number,
}

export interface InputInfo extends BasePlayerInfo {
    input: string;
}