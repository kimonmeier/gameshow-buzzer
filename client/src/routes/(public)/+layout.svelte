<script lang="ts">
	import { onMount } from 'svelte';
	import '../../app.css';
	import App from '$lib/services/GameManager';
	import { answerRightSound, answerWrongSound, buzzerSound } from '$lib/store/AudioStore';
	import buzzerSoundFile from '$lib/assets/buzzer.mp3';
	import answerRightSoundFile from '$lib/assets/right_answer.wav';
	import answerWrongSoundFile from '$lib/assets/wrong_answer.wav';
	import { Sound } from '$lib/components/sound/Sound';

	$buzzerSound = new Sound(buzzerSoundFile, undefined, { volume: 0 });
	$answerRightSound = new Sound(answerRightSoundFile, undefined, { volume: 0 });
	$answerWrongSound = new Sound(answerWrongSoundFile, undefined, { volume: 0 });

	onMount(() => {
		App.getInstance().startApp();
	});

	function beforeunload(args: BeforeUnloadEvent) {
		App.getInstance().stopApp();
	}
</script>

<svelte:window on:beforeunload={beforeunload} />
<div class="text-white w-full h-full flex flex-col">
	<slot />
</div>
