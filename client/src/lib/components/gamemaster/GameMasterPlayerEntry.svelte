<script lang="ts">
	import type { PlayerInfo } from "$lib/models/Player";

    export let player: PlayerInfo;
</script>

<div class="flex flex-row my-1">
    <div class="{player.isBuzzerPressed ? "bg-green-600" : "bg-slate-700"} rounded-full w-10 h-10">
    </div>

    <div class="bg-black mx-4 rounded-xl px-4 py-1 grow flex items-center">
        {player.input}
    </div>

    <div class="p-2 rounded-xl ml-2 {player.isInputLocked ? "w-36" : "w-80" } text-center { player.isInputLocked ? "bg-green-600" : "bg-indigo-600" }">
        {#if player.isInputLocked}
            <div>Eingeloggt!</div>
        {:else}
            <div>Schreibt noch...</div>
        {/if}
    </div>

    {#if player.isInputLocked}
        <button class="bg-violet-600 p-2 ml-4 rounded-xl w-40">
            <div>Eingabe freigeben</div>
        </button>
    {/if}
</div>