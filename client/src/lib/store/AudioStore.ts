import { Sound } from "svelte-sound";
import { writable } from "svelte/store";

export const buzzerSound = writable<Sound>();
export const buzzerSoundPlayed = writable<boolean>(false);

export const answerRightSound = writable<Sound>();
export const answerWrongSound = writable<Sound>();