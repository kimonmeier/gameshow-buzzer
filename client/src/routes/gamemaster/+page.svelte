<script lang="ts">
	import GameMasterBuzzer from "$lib/components/gamemaster/GameMasterBuzzer.svelte";
	import GameMasterControls from "$lib/components/gamemaster/GameMasterControls.svelte";
	import GameMasterPlayerEntry from "$lib/components/gamemaster/GameMasterPlayerEntry.svelte";
	import GameMasterSettings from "$lib/components/gamemaster/GameMasterSettings.svelte";
    import type { Tab } from "$lib/components/tabcontrol/TabControl.models";
    import TabControl from "$lib/components/tabcontrol/TabControl.svelte";
    import { players } from "$lib/store/PlayerStore";


    let tabItems: Tab[] = [
        {
            name: "Steuerung",
            component: GameMasterControls,
        },
        {
            name: "Einstellungen",
            component: GameMasterSettings
        },
        {
            name: "Buzzer",
            component: GameMasterBuzzer
        }
    ]
</script>


<div>
    <h1 class="text-center font-bold text-7xl mb-10">GameMaster</h1>
    <TabControl class="w-1/2 m-auto" items={tabItems} />
    <h3 class="text-center font-bold text-2xl mt-5">Teilnehmer</h3>
    {#if $players.length == 0}
        <h3 class="text-center">
            Keine Spieler gefunden!
        </h3>
    {:else}
        {#each $players as player}
            <GameMasterPlayerEntry {player} />
        {/each}
    {/if}
</div>

