import { writable } from "svelte/store";

export const isLoggedIn = writable<boolean>(false);
export const currentUserId = writable<string | null>(null);