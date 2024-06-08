<script lang="ts">
	import { buzzers } from "$lib/store/BuzzerStore";
	import { players } from "$lib/store/PlayerStore";
	import type { PlayerBuzzerModel } from "./GameMasterBuzzerEntry.model";
	import GameMasterBuzzerEntry from "./GameMasterBuzzerEntry.svelte";


    $: buzzerEntries = $buzzers.map<PlayerBuzzerModel>((x, i) => ({
        playerName: $players.find(z => z.id == x.playerId)!.name,
        timeBuzzedInMs: x.buzzerTime!,
        differenceInMs: i == 0 ? 0 : (x.buzzerTime! - $buzzers[i-1].buzzerTime!)
    }));
</script>

<div class="flex flex-col">
    {#if buzzerEntries.length == 0}
        <h3 class="text-center">
            Keine Spieler gefunden!
        </h3>
    {:else}
        {#each buzzerEntries as entry (entry.playerName)}
            <GameMasterBuzzerEntry player={entry} />
        {/each}
    {/if}
</div>