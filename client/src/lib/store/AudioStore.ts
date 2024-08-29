import type { Sound } from "$lib/components/sound/Sound";
import { writable } from "svelte/store";

export const buzzerSound = writable<Sound>();
export const buzzerSoundPlayed = writable<boolean>(false);

export const answerRightSound = writable<Sound>();
export const answerWrongSound = writable<Sound>();

export const buzzerSoundVolume = writable<number>(0.1);
export const answerRightSoundVolume = writable<number>(0.1);
export const answerWrongSoundVolume = writable<number>(0.1);