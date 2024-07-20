<script lang="ts">
	import { page } from '$app/stores';
	import type { BuzzerInfo, InputInfo, PlayerInfo } from '$lib/models/Player';
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
			? 'bg-green-600'
			: buzzerInfo?.buzzerTime != null
				? 'bg-yellow-500'
				: 'bg-slate-700'} rounded-full w-10 h-10"
	></div>

	<div
		class="bg-black mx-4 rounded-xl px-4 py-1 grow flex items-center min-h-10 overflow-hidden text-nowrap"
	>
		{inputInfo?.input}
	</div>

	<div class="font-bold text-2xl p-1 bg-slate-500 rounded-full px-3 min-h-10 flex items-center">
		{player?.points}
	</div>
</div>
