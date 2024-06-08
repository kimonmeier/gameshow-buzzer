<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import App from '$lib/services/GameManager';
	import { alertStore } from '$lib/store/AlertStore';
	import Alert from '$lib/components/alert/Alert.svelte';
	import { buzzerSound } from '$lib/store/AudioStore';
	import { Sound } from 'svelte-sound';
	import buzzerSoundFile from "$lib/assets/buzzer.mp3";
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';

	$buzzerSound = new Sound(buzzerSoundFile, {volume: 0.4});

	onMount(() => {
		App.getInstance().startApp();
	})

	function beforeunload(args: BeforeUnloadEvent) {
		App.getInstance().stopApp();
	}

	function keyDown(e: KeyboardEvent) {
		if (e.keyCode == 32) {
			App.getInstance().sendMessage({
				type: ClientEvents.PLAYER_BUZZER_PRESSED,
				time: Date.now(),
			});
		}
	}

</script>


<svelte:window on:beforeunload={beforeunload} on:keydown={keyDown}/>
<div class="bg-slate-900 text-white w-full h-full flex flex-col">
	{#if $alertStore}
		<Alert message={$alertStore.message} alertType={$alertStore.alertType} />
	{/if}
	<slot />
</div>
