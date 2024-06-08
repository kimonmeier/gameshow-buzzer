<script lang="ts">
	import FormField from "$lib/components/form/FormField.svelte";
	import App from "$lib/services/GameManager";
	import { ClientEvents } from "gameshow-lib/enums/ClientEvents";

    let name: string;

    function loginUser() {
        App.getInstance().sendMessage({
            type: ClientEvents.PLAYER_CONNECTING,
            name: name
        });
    }
</script>

<div class="flex flex-col w-1/4 m-auto text-center border p-5 rounded-xl items-center justify-center">
    <h1 class="font-bold p-10">Login</h1>
    <FormField label="Name">
        <input class="bg-slate-400 rounded-xl px-2" bind:value={name} placeholder="Name..."/>
    </FormField>
    <button class="mt-5 border p-2 bg-green-500 rounded-2xl" on:click={loginUser}>
        Login
    </button>
</div>