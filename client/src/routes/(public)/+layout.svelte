<script lang="ts">
	import { onMount } from 'svelte';
	import '../../app.css';
	import App from '$lib/services/GameManager';
	import { answerRightSound, answerWrongSound, buzzerSound } from '$lib/store/AudioStore';
	import { Sound } from 'svelte-sound';
	import buzzerSoundFile from "$lib/assets/buzzer.mp3";
	import answerRightSoundFile from "$lib/assets/right_answer.wav";
	import answerWrongSoundFile from "$lib/assets/wrong_answer.wav";

	$buzzerSound = new Sound(buzzerSoundFile, {volume: 0});
	$answerRightSound = new Sound(answerRightSoundFile, {volume: 0});
	$answerWrongSound = new Sound(answerWrongSoundFile, {volume: 0});

	onMount(() => {
		App.getInstance().startApp();
	})

	function beforeunload(args: BeforeUnloadEvent) {
		App.getInstance().stopApp();
	}

</script>

<svelte:window on:beforeunload={beforeunload}/>
<div class="text-white w-full h-full flex flex-col">
	<slot />
</div>