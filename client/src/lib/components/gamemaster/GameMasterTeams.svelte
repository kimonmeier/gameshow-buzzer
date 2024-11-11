<script lang="ts">
	import App from '$lib/services/GameManager';
	import { teamStore } from '$lib/store/TeamStore';
	import FormField from '../form/FormField.svelte';
	import Modal from '../modal/Modal.svelte';
	import GameMasterTeamEntry from './GameMasterTeamEntry.svelte';

	let showModal: boolean = false;
	let teamName: string = '';

	function createTeam() {
		App.getSocket().emit('GAMEMASTER_TEAM_CREATE', teamName);

		showModal = false;
	}
</script>

<button class="bg-green-500 rounded-3xl px-3" on:click={() => (showModal = true)}>
	Team erstellen
</button>
<div class="bg-slate-700 rounded-3xl">
	{#each $teamStore as team}
		<GameMasterTeamEntry {team} />
	{/each}
</div>

<Modal bind:showModal>
	<div slot="header" class="font-bold">Team erstellen</div>
	<div>
		<FormField label="Name">
			<input type="text" bind:value={teamName} />
		</FormField>
		<button class="rounded-3xl bg-green-400 px-3 m-2" on:click={createTeam}>
			Team erstellen!
		</button>
	</div>
</Modal>
