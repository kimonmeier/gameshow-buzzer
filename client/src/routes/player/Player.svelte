<script lang="ts">
	import type { PlayerInfo } from "$lib/models/Player";
	import App from "$lib/services/GameManager";
	import { buzzers } from "$lib/store/BuzzerStore";
	import { inputs } from "$lib/store/InputStore";
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
        if (isBuzzerLocked) {
            return;
        }
        
        App.getInstance().sendMessage({
            type: ClientEvents.PLAYER_BUZZER_PRESSED,
            time: Date.now()
        });
    }

    $: buzzerInfo = $buzzers.find(x => x.playerId == player.id)!;
    $: inputInfo = $inputs.find(x => x.playerId == player.id)!;
    $: isBuzzerLocked = $buzzers.filter(x => x.buzzerTime != null).length != 0;
    $: myBuzzerWasFirst = $buzzers.filter(x => x.buzzerTime != null).sort(x => x.buzzerTime!).at(0)?.playerId == player.id;

    $: buzzerBackgroundColor = (): string => {
        if (isBuzzerLocked && buzzerInfo.buzzerTime == null) {
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

<div class="flex flex-row items-center justify-center">
    <button class="rounded-full {buzzerBackgroundColor()} mr-4 w-20 h-20 justify-center flex items-center" on:click={buzzer}>
        {#if isBuzzerLocked}
            {#if myBuzzerWasFirst}
                <Icon icon="mdi:lock-check-outline"/>
            {:else}
                <Icon icon="mdi:lock-open-remove-outline"/>
            {/if}
        {:else}
            <Icon icon="mdi:lock-open-outline"/>
        {/if}
    </button>
    <div class="flex flex-col w-3/4 gap-2">
        <input type="text" class="row-start-2 bg-slate-300 rounded-xl mt-10 px-2 py-1 text-black font-mono" disabled={inputInfo.isLocked} bind:value on:input={onInputChanged} placeholder="Eingabe..." />
        {#if inputInfo.isLocked}
            <div class="bg-green-700 row-start-4 rounded-xl py-1 text-center">Eingeloggt!</div>
        {:else}
            <button class="bg-indigo-600 row-start-4 rounded-xl py-1" on:click={lockInput}>Bestätigen</button>
        {/if}
    </div>
</div>