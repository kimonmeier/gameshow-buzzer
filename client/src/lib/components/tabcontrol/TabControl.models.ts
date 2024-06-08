import type { SvelteComponent } from "svelte";

export interface Tab {
    name: string;
    component: ConstructorOfATypedSvelteComponent;
}