<script lang="ts">
	import type { PlayerInfo, BuzzerInfo, InputInfo } from "$lib/models/Player";
	import App from "$lib/services/GameManager";
	import { buzzers } from "$lib/store/BuzzerStore";
	import { inputs } from "$lib/store/InputStore";
	import { pointsInkrement } from "$lib/store/SettingsStore";
	import { ClientEvents } from "gameshow-lib/enums/ClientEvents";

    export let player: PlayerInfo;

    function releaseInput() {
        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_RELEASE_INPUTS,
            playerId: player.id
        });
    }

    function increasePoints() {
        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_INCREASE_POINTS_BY_PLAYER,
            playerId: player.id,
            points: $pointsInkrement
        });
    }
    
    function decreasePoints() {
        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_DECREASE_POINTS_BY_PLAYER,
            playerId: player.id,
            points: $pointsInkrement
        });
    }

    $: isFirstBuzzer = $buzzers.filter(x => x.buzzerTime != null).sort(x => x.buzzerTime!).at(0)?.playerId == player.id;
    $: buzzerInfo = $buzzers.find(x => x.playerId == player.id) as BuzzerInfo;
    $: inputInfo = $inputs.find(x => x.playerId == player.id) as InputInfo;
</script>

<div class="flex flex-row my-1 items-center">
    <div class="{isFirstBuzzer ? "bg-green-600" : buzzerInfo.buzzerTime != null  ? "bg-yellow-500" : "bg-slate-700"} rounded-full w-10 h-10">
    </div>

    <div class="font-bold text-right w-20">
        {player.name}
    </div>

    <div class="bg-black mx-4 rounded-xl px-4 py-1 grow flex items-center min-h-10">
        {inputInfo.input}
    </div>

    <div class="flex flex-row justify-center items-center text-center">
        <button class="bg-green-500 rounded-l-xl p-1" on:click={increasePoints}>+</button>
        <div class="font-bold p-1 bg-slate-500">
            {player.points}
        </div>
        <button class="bg-red-500 rounded-r-xl p-1" on:click={decreasePoints}>-</button>
    </div>

    <div class="p-2 rounded-xl ml-2 {inputInfo.isLocked ? "w-36" : "w-80" } text-center { inputInfo.isLocked ? "bg-green-600" : "bg-indigo-600" }">
        {#if inputInfo.isLocked}
            <div>Eingeloggt!</div>
        {:else}
            <div>Schreibt noch...</div>
        {/if}
    </div>

    {#if inputInfo.isLocked}
        <button class="bg-violet-600 p-2 ml-4 rounded-xl w-40" on:click={releaseInput}>
            <div>Eingabe freigeben</div>
        </button>
    {/if}
</div>