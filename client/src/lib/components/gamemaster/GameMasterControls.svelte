<script lang="ts">
    import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
	import App from "$lib/services/GameManager";


    function releaseBuzzer() {
        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_RELEASE_BUZZER
        });
    }

    function releaseInputs() {
        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_RELEASE_INPUTS
        })
    }
    
    function lockInputs() {
        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_LOCK_INPUTS
        })
    }

    function answerIsRight() {
        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_ANSWER_RIGHT
        })
    }

    function answerIsWrong() {
        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_ANSWER_WRONG
        })
    }
</script>


<div class="flex flex-col gap-2">
    <button class="bg-green-600 disabled:bg-green-900 p-2 rounded-3xl" on:click={releaseBuzzer}>Buzzer freigeben</button>
    <button class="bg-violet-600 disabled:bg-violet-900 p-2 rounded-3xl" on:click={releaseInputs}>Alle Eingaben freigeben</button>
    <button class="bg-indigo-600 disabled:bg-indigo-900 p-2 rounded-3xl" on:click={lockInputs}>Alle Eingaben sperren</button>
    <div class="flex flex-row items-center justify-center">
        <button class="bg-green-600 disabled:bg-green-900 p-2 rounded-3xl" on:click={answerIsRight}>Richtige Antwort</button>
        <button class="bg-orange-600 disabled:bg-orange-900 p-2 rounded-3xl" on:click={answerIsWrong}>Falsche Antwort</button>
    </div>
</div>