<script lang="ts">
	import FormField from '$lib/components/form/FormField.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import type { TeamModel } from '$lib/models/Team';
	import App from '$lib/services/GameManager';
	import { teamStore } from '$lib/store/TeamStore';
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';

	let name: string;
	let team: TeamModel;

	function loginUser() {
		console.log('Login user', team);
		App.getInstance().sendMessage({
			type: ClientEvents.PLAYER_CONNECTING,
			name: name,
			teamId: team?.id
		});
	}
</script>

<div
	class="flex flex-col w-1/4 m-auto text-center border p-5 rounded-xl items-center justify-center"
>
	<h1 class="font-bold p-10">Login</h1>
	<FormField label="Name">
		<input class="bg-slate-400 rounded-xl px-2" bind:value={name} placeholder="Name..." />
	</FormField>
	{#if $teamStore.length > 0}
		<FormField label="Team">
			<Select items={$teamStore} label="name" bind:value={team} />
		</FormField>
	{/if}
	<button class="mt-5 border p-2 bg-green-500 rounded-2xl" on:click={loginUser}> Login </button>
</div>
