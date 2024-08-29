<script lang="ts">
	import { onMount } from 'svelte';
	import '../../app.css';
	import App from '$lib/services/GameManager';
	import { alertStore } from '$lib/store/AlertStore';
	import Alert from '$lib/components/alert/Alert.svelte';
	import {
		answerRightSound,
		answerRightSoundVolume,
		answerWrongSound,
		answerWrongSoundVolume,
		buzzerSound,
		buzzerSoundVolume
	} from '$lib/store/AudioStore';
	import buzzerSoundFile from '$lib/assets/buzzer.mp3';
	import answerRightSoundFile from '$lib/assets/right_answer.wav';
	import answerWrongSoundFile from '$lib/assets/wrong_answer.wav';
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';
	import { isBuzzerLocked } from '$lib/store/BuzzerStore';
	import { Sound } from '$lib/components/sound/Sound';
	import Icon from '@iconify/svelte';
	import VolumeControlsModal from '$lib/components/controls/VolumeControlsModal.svelte';

	$buzzerSound = new Sound(buzzerSoundFile, buzzerSoundVolume, { volume: 0.2 });
	$answerRightSound = new Sound(answerRightSoundFile, answerRightSoundVolume, { volume: 0.4 });
	$answerWrongSound = new Sound(answerWrongSoundFile, answerWrongSoundVolume, { volume: 0.2 });

	let steuerungVisible = false;

	onMount(() => {
		App.getInstance().startApp();
	});

	function beforeunload(args: BeforeUnloadEvent) {
		App.getInstance().stopApp();
	}

	function keyDown(e: KeyboardEvent) {
		if (e.keyCode == 32) {
			if ($isBuzzerLocked) {
				return;
			}
			App.getInstance().sendMessage({
				type: ClientEvents.PLAYER_BUZZER_PRESSED
			});
		}
	}
</script>

<svelte:window on:beforeunload={beforeunload} on:keydown={keyDown} />
<button
	class="absolute z-0 w-12 h-12 top-0 left-0 hover:text-white text-transparent"
	on:click={() => (steuerungVisible = !steuerungVisible)}
>
	<Icon icon="mdi:cog" height="100%"></Icon>
</button>
<VolumeControlsModal bind:showModal={steuerungVisible} />
<div class="bg-slate-900 text-white w-full h-full flex flex-col">
	{#if $alertStore}
		<Alert message={$alertStore.message} alertType={$alertStore.alertType} />
	{/if}
	<slot />
</div>
