<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../../app.css';
	import App from '$lib/services/GameManager';
	import { answerRightSound, answerWrongSound, buzzerSound } from '$lib/store/AudioStore';
	import buzzerSoundFile from '$lib/assets/buzzer.mp3';
	import answerRightSoundFile from '$lib/assets/right_answer.wav';
	import answerWrongSoundFile from '$lib/assets/wrong_answer.wav';
	import { Sound } from '$lib/components/sound/Sound';
	import VolumeControlsModal from '$lib/components/controls/VolumeControlsModal.svelte';
	import Icon from '@iconify/svelte';
	import { answerRightSoundVolume, answerWrongSoundVolume, buzzerSoundVolume } from '$lib/store/AudioStore';

	const hasSound = $page.url.searchParams.get('sound') != undefined;

	$buzzerSound = new Sound(buzzerSoundFile, buzzerSoundVolume, { volume: hasSound ? 0.2 : 0.0 });
	$answerRightSound = new Sound(answerRightSoundFile, answerRightSoundVolume, { volume: hasSound ? 0.4 : 0.0 });
	$answerWrongSound = new Sound(answerWrongSoundFile, answerWrongSoundVolume, { volume: hasSound ? 0.2 : 0.0 });

	let steuerungVisible: boolean = false;

	onMount(() => {
		App.getInstance().startApp();
	});

	function beforeunload(args: BeforeUnloadEvent) {
		App.getInstance().stopApp();
	}
</script>

<svelte:window on:beforeunload={beforeunload} />
<button
	class="absolute z-0 w-12 h-12 top-0 right-0 hover:text-white text-transparent"
	on:click={() => (steuerungVisible = !steuerungVisible)}
>
	<Icon icon="mdi:cog" height="100%"></Icon>
</button>
<VolumeControlsModal bind:showModal={steuerungVisible} />
<div class="text-white w-full h-full flex flex-col">
	<slot />
</div>
