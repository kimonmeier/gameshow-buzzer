<script lang="ts">
	import type { TeamModel } from '$lib/models/Team';
	import { players } from '$lib/store/PlayerStore';
	import GroupBox from '../groupBox/GroupBox.svelte';
	import GameMasterPlayerEntry from './GameMasterPlayerEntry.svelte';

	export let team: TeamModel;

	$: playersInTeam = $players.filter((x) => x.teamId == team.id);
</script>

<GroupBox title="Team {team.name}">
	{#each playersInTeam as player}
		<GameMasterPlayerEntry {player} />
	{/each}
</GroupBox>
