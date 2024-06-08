<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import App from '$lib/services/GameManager';
	import { alertStore } from '$lib/store/AlertStore';
	import Alert from '$lib/components/alert/Alert.svelte';

	onMount(() => {
		App.getInstance().startApp();
	})

	function beforeunload(args: BeforeUnloadEvent) {
		App.getInstance().stopApp();
	}

</script>


<svelte:window on:beforeunload={beforeunload}/>
<div class="bg-slate-900 text-white w-full h-full flex flex-col">
	{#if $alertStore}
		<Alert message={$alertStore.message} alertType={$alertStore.alertType} />
	{/if}
	<slot />
</div>
