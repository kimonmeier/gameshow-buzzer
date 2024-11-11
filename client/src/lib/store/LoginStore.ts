import type { PlayerId } from "gameshow-lib/Types";
import { writable } from "svelte/store";

export const isLoggedIn = writable<boolean>(false);
export const currentUserId = writable<PlayerId | null>(null);