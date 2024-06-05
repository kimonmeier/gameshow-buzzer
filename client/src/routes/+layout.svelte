<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import App from '$lib/services/GameManager';

	onMount(() => {
		App.getInstance().startApp();
	})

	function beforeunload(args: BeforeUnloadEvent) {
		App.getInstance().stopApp();
	}

</script>


<svelte:window on:beforeunload={beforeunload}/>
<slot />
