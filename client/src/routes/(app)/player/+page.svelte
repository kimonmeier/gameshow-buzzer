<script lang="ts">
	import { currentUserId, isLoggedIn } from "$lib/store/LoginStore";
	import { players } from "$lib/store/PlayerStore";
	import Login from "./Login.svelte";
	import Player from "./Player.svelte";


    $: playerInfo = $players.find(x => x.id == $currentUserId);
</script>


{#if playerInfo && isLoggedIn}
    <Player player={playerInfo} />
{:else}
    <Login />
{/if}

