<script lang="ts">
	import type { PlayerInfo } from "$lib/models/Player";
	import App from "$lib/services/GameManager";
	import { buzzers, isBuzzerLocked } from "$lib/store/BuzzerStore";
	import { inputs, isInputFocused } from "$lib/store/InputStore";
	import { players } from "$lib/store/PlayerStore";
	import Icon from "@iconify/svelte";
	import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
	import { tick } from "svelte";

    export let player: PlayerInfo;
    let value: string;

    function onInputChanged() {
        tick().then(() => {
            App.getInstance().sendMessage({
                type: ClientEvents.PLAYER_INPUT_CHANGED,
                input: value
            });
        });
    }

    function lockInput() {
        if (inputInfo.isLocked) {
            return;
        }

        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_LOCK_INPUTS,
            playerId: player.id
        });
    }

    function buzzer() {
        if($isBuzzerLocked) {
            return;
        }
        
        App.getInstance().sendMessage({
            type: ClientEvents.PLAYER_BUZZER_PRESSED
        });
    }

    $: buzzerInfo = $buzzers.find(x => x.playerId == player.id)!;
    $: inputInfo = $inputs.find(x => x.playerId == player.id)!;
    $: isBuzzerPersonallyLocked = $buzzers.filter(x => x.buzzerTime != null).length != 0;
    $: myBuzzerWasFirst = $buzzers.filter(x => x.buzzerTime != null).sort(x => x.buzzerTime!).at(0)?.playerId == player.id;

    $: buzzerBackgroundColor = (): string => {
        if ((isBuzzerPersonallyLocked || $isBuzzerLocked) && buzzerInfo.buzzerTime == null) {
            return "bg-gray-600";
        }

        if (buzzerInfo.buzzerTime == null && !isBuzzerLocked) {
            return "bg-green-700";
        }

        if (myBuzzerWasFirst) {
            return "bg-red-500";
        }

        return "bg-yellow-500";
    }
</script>

<div class="flex flex-col">
    <div class="flex flex-row items-center justify-center">
        <button class="rounded-full {buzzerBackgroundColor()} mr-4 w-40 h-40 justify-center flex items-center" on:click={buzzer}>
            {#if isBuzzerLocked}
                {#if myBuzzerWasFirst}
                    <Icon icon="mdi:lock-check-outline" class="h-1/2 w-1/2"/>
                {:else}
                    <Icon icon="mdi:lock-open-remove-outline" class="h-1/2 w-1/2"/>
                {/if}
            {:else}
                <Icon icon="mdi:lock-open-outline" class="h-1/2 w-1/2"/>
            {/if}
        </button>
        <div class="flex flex-col w-3/4 gap-2">
            <input type="text" class="row-start-2 bg-slate-300 rounded-xl mt-10 px-2 py-1 text-black font-mono" disabled={inputInfo.isLocked} on:focusin={() => $isInputFocused = true} on:focusout={() => $isInputFocused = false} bind:value on:input={onInputChanged} placeholder="Eingabe..." />
            {#if inputInfo.isLocked}
                <div class="bg-green-700 row-start-4 rounded-xl py-1 text-center">Eingeloggt!</div>
            {:else}
                <button class="bg-indigo-600 row-start-4 rounded-xl py-1" on:click={lockInput}>Bestätigen</button>
            {/if}
        </div>
    </div>
    <h1 class="text-center mt-5">Leaderboard</h1>
    <div class="flex flex-col w-1/2 m-auto">
        <div class="flex flex-row border-b font-bold">
            <div class="w-1/2 text-right p-2">Name</div>
            <div class="w-1/2 p-2">Punkte</div>
        </div>
        {#each $players as currentPlayer}
            <div class="flex flex-row">
                <div class="w-1/2 text-right p-2">{currentPlayer.name}</div>
                <div class="w-1/2 p-2">{currentPlayer.points}</div>
            </div>
        {/each}
    </div>
</div>