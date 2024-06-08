import { writable } from "svelte/store";

export const pointsInkrementRightAnswer = writable<number>(1);
export const pointsInkrementWrongAnswer = writable<number>(1);