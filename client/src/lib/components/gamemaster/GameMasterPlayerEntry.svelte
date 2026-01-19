<script lang="ts">
	import type { PlayerInfo, BuzzerInfo, InputInfo } from '$lib/models/Player';
	import App from '$lib/services/GameManager';
	import { buzzers } from '$lib/store/BuzzerStore';
	import { inputs } from '$lib/store/InputStore';
	import { pointsInkrementRightAnswer } from '$lib/store/SettingsStore';

	export let player: PlayerInfo;

	function releaseInput() {
		App.getSocket().emit('GAMEMASTER_RELEASE_INPUTS', player.id);
	}

	function increasePoints() {
		App.getSocket().emit(
			'GAMEMASTER_INCREASE_POINTS_BY_PLAYER',
			player.id,
			$pointsInkrementRightAnswer
		);
	}

	function decreasePoints() {
		App.getSocket().emit(
			'GAMEMASTER_DECREASE_POINTS_BY_PLAYER',
			player.id,
			$pointsInkrementRightAnswer
		);
	}

	function changePoints() {
		App.getSocket().emit('GAMEMASTER_CHANGE_POINTS_BY_PLAYER', player.id, player.points);
	}

	function copyLinkForObs() {
		navigator.clipboard.writeText(location.host + '/buzzer/public?id=' + player.id);
	}

	function changeBuzzerLockState() {
		if (playerBuzzerLocked) {
			App.getSocket().emit('GAMEMASTER_RELEASE_BUZZER_FOR_PLAYER', player.id);
		} else {
			App.getSocket().emit('GAMEMASTER_LOCK_BUZZER_FOR_PLAYER', player.id);
		}

		playerBuzzerLocked = !playerBuzzerLocked;
	}

	let playerBuzzerLocked: boolean = false;

	$: isFirstBuzzer = $buzzers.at(0)?.playerId == player.id;
	$: buzzerInfo = $buzzers.find((x) => x.playerId == player.id) as BuzzerInfo | null;
	$: inputInfo = $inputs.find((x) => x.playerId == player.id) as InputInfo;
</script>

<div class="flex flex-row my-1 items-center">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<button
		class="{isFirstBuzzer
			? 'bg-green-600'
			: playerBuzzerLocked
				? 'bg-red-600'
				: buzzerInfo != null
					? 'bg-yellow-500'
					: 'bg-slate-700'} rounded-full w-10 h-10"
		on:dblclick={copyLinkForObs}
		on:click={changeBuzzerLockState}
	></button>

	<div class="font-bold text-right w-20">
		{player.name}
	</div>

	<div class="bg-black mx-4 rounded-xl px-4 py-1 grow flex items-center min-h-10">
		{inputInfo.input}
	</div>

	<div class="flex flex-row justify-center items-center text-center">
		<button class="bg-green-500 rounded-l-xl p-1" on:click={increasePoints}>+</button>
		<input
			type="number"
			class="font-bold p-1 bg-slate-500"
			bind:value={player.points}
			on:blur={changePoints}
		/>
		<button class="bg-red-500 rounded-r-xl p-1" on:click={decreasePoints}>-</button>
	</div>

	<div
		class="p-2 rounded-xl ml-2 {inputInfo.isLocked
			? 'w-36'
			: 'w-80'} text-center {inputInfo.isLocked ? 'bg-green-600' : 'bg-indigo-600'}"
	>
		{#if inputInfo.isLocked}
			<div>Eingeloggt!</div>
		{:else}
			<div>Schreibt noch...</div>
		{/if}
	</div>

	{#if inputInfo.isLocked}
		<button class="bg-violet-600 p-2 ml-4 rounded-xl w-40" on:click={releaseInput}>
			<div>Eingabe freigeben</div>
		</button>
	{/if}
</div>
