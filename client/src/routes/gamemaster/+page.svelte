<script lang="ts">
    import { players } from "$lib/store/PlayerStore";
</script>


<div>
    <h1 class="text-center font-bold text-7xl mb-10">GameMaster</h1>
    <h3 class="text-center font-bold text-2xl">Steuerungen</h3>
    <div class="w-1/4 m-auto flex flex-col gap-2 mb-3">
        <button class="bg-green-600 disabled:bg-green-900 p-2 rounded-3xl">Buzzer freigeben</button>
        <button class="bg-violet-600 disabled:bg-violet-900 p-2 rounded-3xl">Alle Eingaben freigeben</button>
        <button class="bg-indigo-600 disabled:bg-indigo-900 p-2 rounded-3xl">Alle Eingaben sperren</button>
    </div>
    <hr />
    <h3 class="text-center font-bold text-2xl mt-5">Teilnehmer</h3>
    {#each $players as player}
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
    {/each}
</div>

