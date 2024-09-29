<script lang="ts">
	import { ClientEvents } from 'gameshow-lib/enums/ClientEvents';
	import type { TeamModel } from '$lib/models/Team';
	import App from '$lib/services/GameManager';
	import { players } from '$lib/store/PlayerStore';

    export let team: TeamModel;

    $: playersInTeam = $players.filter(x => x.teamId == team.id);

    function deleteTeam() {
        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_TEAM_DELETE,
            teamId: team.id
        });
    }
</script>

<div class="flex flex-row gap-2">
    <div class="font-bold">
        {team.name}
    </div>
    <div class="flex flex-row">
        {#each playersInTeam as player}
            <div class="bg-slate-600 rounded-3xl m-3 px-2">
                {player.name}
            </div>
        {/each}
    </div>
    <button class="bg-red-400" on:click={deleteTeam}>
        Löschen!
    </button>
</div>