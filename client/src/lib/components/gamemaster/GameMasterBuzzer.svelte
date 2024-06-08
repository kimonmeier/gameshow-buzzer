<script lang="ts">
	import { buzzers } from "$lib/store/BuzzerStore";
	import { players } from "$lib/store/PlayerStore";
	import type { PlayerBuzzerModel } from "./GameMasterBuzzerEntry.model";
	import GameMasterBuzzerEntry from "./GameMasterBuzzerEntry.svelte";


    $: onlyBuzzedEntries = $buzzers.filter(x => x.buzzerTime != null).sort(x => x.buzzerTime!)
    $: buzzerEntries = onlyBuzzedEntries.map<PlayerBuzzerModel>((x, i) => ({
        playerName: $players.find(z => z.id == x.playerId)!.name,
        timeBuzzedInMs: x.buzzerTime!,
        differenceInMs: i == 0 ? 0 : (x.buzzerTime! - onlyBuzzedEntries[i-1].buzzerTime!)
    }));
</script>

<div class="flex flex-col">
    {#if buzzerEntries.length == 0}
        <h3 class="text-center">
            Keine Spieler gefunden!
        </h3>
    {:else}
        {#each buzzerEntries as entry}
            <GameMasterBuzzerEntry player={entry} />
        {/each}
    {/if}
</div>