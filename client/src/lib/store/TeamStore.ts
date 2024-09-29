import type { TeamModel } from "$lib/models/Team";
import { writable } from "svelte/store";

export const teamStore = writable<TeamModel[]>([]);