<script lang="ts">
	import GameMasterBuzzer from "$lib/components/gamemaster/GameMasterBuzzer.svelte";
	import GameMasterControls from "$lib/components/gamemaster/GameMasterControls.svelte";
	import GameMasterPlayerEntry from "$lib/components/gamemaster/GameMasterPlayerEntry.svelte";
	import GameMasterSettings from "$lib/components/gamemaster/GameMasterSettings.svelte";
    import type { Tab } from "$lib/components/tabcontrol/TabControl.models";
    import TabControl from "$lib/components/tabcontrol/TabControl.svelte";
    import { players } from "$lib/store/PlayerStore";
	import { onMount } from "svelte";
	import App from '$lib/services/GameManager';
	import { ClientEvents } from "gameshow-lib/enums/ClientEvents";


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

    let loggedIn: boolean = false;
    let hasSentRequest: boolean = false;

    function login() {
        App.getInstance().sendMessage({
            type: ClientEvents.REQUEST_GAMEMASTER,
        })

        setTimeout(() => {
            if (!App.getInstance().IsConnected) {
                return;
            }
            loggedIn = true;
        }, 200)
    }
</script>


{#if loggedIn}
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
    {:else}
    <button class="bg-green-500" disabled={hasSentRequest} on:click={login}>Login</button>
{/if}

