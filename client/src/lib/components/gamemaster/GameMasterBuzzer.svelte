<script lang="ts">
	import type { BuzzerInfo } from '$lib/models/Player';
	import type { TeamModel } from '$lib/models/Team';
	import { buzzers } from '$lib/store/BuzzerStore';
	import { players } from '$lib/store/PlayerStore';
	import { teamStore } from '$lib/store/TeamStore';
	import type { PlayerBuzzerModel } from './GameMasterBuzzerEntry.model';
	import GameMasterBuzzerEntry from './GameMasterBuzzerEntry.svelte';

	function createBuzzerEntries(buzzer: BuzzerInfo[], team: TeamModel[]): PlayerBuzzerModel[] {
		console.log('Create buzzer entries');

		if (team.length <= 0) {
			console.log('Only Player Entries');
			return createPlayerBuzzerEntries(buzzer);
		}
		console.log('Team Entry');

		const buzzerInfos: PlayerBuzzerModel[] = [];

		console.log('Team Store:', team);
		team.forEach((team) => {
			const buzzerPressed = buzzer.find((x) => x.teamId == team.id);
			if (!buzzerPressed) {
				return;
			}

			buzzerInfos.push({
				playerId: team.id,
				playerName: team.name,
				differenceInMs: 0,
				timeBuzzedInMs: buzzerPressed.buzzerTime
			});
		});
		console.log(buzzerInfos);
		const sortedInfos = buzzerInfos.sort((x) => x.timeBuzzedInMs);
		sortedInfos.forEach((val, i) => {
			val.differenceInMs = i == 0 ? 0 : val.timeBuzzedInMs! - $buzzers[i - 1].buzzerTime!;
		});
		return sortedInfos;
	}

	function createPlayerBuzzerEntries(buzzer: BuzzerInfo[]): PlayerBuzzerModel[] {
		return buzzer.map<PlayerBuzzerModel>((x, i) => {
			const currentPlayer = $players.find((z) => z.id == x.playerId)!;

			return {
				playerId: currentPlayer.id,
				playerName: currentPlayer.name,
				timeBuzzedInMs: x.buzzerTime!,
				differenceInMs: i == 0 ? 0 : x.buzzerTime! - $buzzers[i - 1].buzzerTime!
			};
		});
	}

	$: buzzerEntries = createBuzzerEntries($buzzers, $teamStore);
</script>

<div class="flex flex-col">
	{#if buzzerEntries.length == 0}
		<h3 class="text-center">Keine Spieler gefunden!</h3>
	{:else if $teamStore.length > 0}
		{#each buzzerEntries as entry (entry.playerName)}
			<GameMasterBuzzerEntry player={entry} />
		{/each}
	{:else}
		{#each buzzerEntries as entry (entry.playerName)}
			<GameMasterBuzzerEntry player={entry} />
		{/each}
	{/if}
</div>
