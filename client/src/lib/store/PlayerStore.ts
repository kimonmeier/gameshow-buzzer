import { type PlayerInfo } from "$lib/models/Player";
import { writable } from "svelte/store";

export const players = writable<PlayerInfo[]>([]);