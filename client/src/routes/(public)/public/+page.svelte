<script lang="ts">
	import { page } from '$app/stores';
	import type { BuzzerInfo, InputInfo } from '$lib/models/Player';
	import { buzzers } from '$lib/store/BuzzerStore';
	import { inputs } from '$lib/store/InputStore';
	import { players } from '$lib/store/PlayerStore';

	$: player = $players.find((x) => x.id == $page.url.searchParams.get('id'))!;

	$: isFirstBuzzer =
		$buzzers
			.filter((x) => x.buzzerTime != null)
			.sort((x) => x.buzzerTime!)
			.at(0)?.playerId == player?.id;
	$: buzzerInfo = $buzzers.find((x) => x.playerId == player?.id) as BuzzerInfo;
	$: inputInfo = $inputs.find((x) => x.playerId == player?.id) as InputInfo;
</script>

<div class="bg-transparent flex flex-row items-center justify-center">
	<div
		class="{isFirstBuzzer
			? 'player-buzzer-indicator-pressed-background'
			: buzzerInfo?.buzzerTime != null
				? 'player-buzzer-indicator-late-pressed-background'
				: 'player-buzzer-indicator-stale-background'} rounded-full w-10 h-10 flex-shrink-0 player-buzzer-indicator"
	></div>

	<div
		class="bg-black mx-4 rounded-xl px-4 py-1 grow flex items-center min-h-10 overflow-hidden text-nowrap whitespace-nowrap player-input-indicator"
	>
		{inputInfo?.input}
	</div>

	<div
		class="font-bold text-2xl p-1 bg-slate-500 rounded-full px-3 min-h-10 flex items-center flex-shrink-0 player-points-indicator"
	>
		{player?.points}
	</div>
</div>

<style>
	.player-buzzer-indicator-stale-background {
		background-color: var(--player-buzzer-indicator-stale-background-color, rgb(51 65 85));
	}

	.player-buzzer-indicator-late-pressed-background {
		background-color: var(--player-buzzer-indicator-late-background-color, rgb(234 179 8));
	}

	.player-buzzer-indicator-pressed-background {
		background-color: var(--player-buzzer-indicator-pressed-background-color, rgb(101 163 13));
	}
</style>
