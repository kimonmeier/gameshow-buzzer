<script lang="ts">
    import { ClientEvents } from "gameshow-lib/enums/ClientEvents";
	import App from "$lib/services/GameManager";
	import { buzzers, isBuzzerLocked } from "$lib/store/BuzzerStore";
	import { pointsInkrementRightAnswer, pointsInkrementWrongAnswer } from "$lib/store/SettingsStore";
	import { players } from "$lib/store/PlayerStore";


    function releaseBuzzer() {
        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_RELEASE_BUZZER
        });
    }

    function lockBuzzer() {
        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_LOCK_BUZZER
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

        let buzzerInfo = $buzzers.filter(x => x.buzzerTime != null).sort(x => x.buzzerTime!).at(0);

        if (!buzzerInfo) {
            return;
        }

        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_INCREASE_POINTS_BY_PLAYER,
            playerId: buzzerInfo?.playerId,
            points: $pointsInkrementRightAnswer
        });

        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_RELEASE_BUZZER
        })
    }

    function answerIsWrong() {
        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_ANSWER_WRONG
        })

        let buzzerInfo = $buzzers.filter(x => x.buzzerTime != null).sort(x => x.buzzerTime!).at(0);

        if (!buzzerInfo) {
            return;
        }

        $players.filter(x => x.id != buzzerInfo.playerId).forEach(player => {
            App.getInstance().sendMessage({
                type: ClientEvents.GAMEMASTER_INCREASE_POINTS_BY_PLAYER,
                playerId: player.id,
                points: $pointsInkrementWrongAnswer
            });
        });

        App.getInstance().sendMessage({
            type: ClientEvents.GAMEMASTER_RELEASE_BUZZER
        })
    }
</script>


<div class="flex flex-col gap-2">
    <button class="bg-green-600 disabled:bg-green-900 p-2 rounded-3xl" disabled={!$isBuzzerLocked} on:click={releaseBuzzer}>Buzzer freigeben</button>
    <button class="bg-indigo-600 disabled:bg-indigo-900 p-2 rounded-3xl" disabled={$isBuzzerLocked} on:click={lockBuzzer}>Buzzer sperren</button>
    <button class="bg-violet-600 disabled:bg-violet-900 p-2 rounded-3xl" on:click={releaseInputs}>Alle Eingaben freigeben</button>
    <button class="bg-indigo-600 disabled:bg-indigo-900 p-2 rounded-3xl" on:click={lockInputs}>Alle Eingaben sperren</button>
    <div class="flex flex-row items-center justify-center">
        <button class="bg-green-600 disabled:bg-green-900 p-2 rounded-3xl" on:click={answerIsRight}>Richtige Antwort</button>
        <button class="bg-orange-600 disabled:bg-orange-900 p-2 rounded-3xl" on:click={answerIsWrong}>Falsche Antwort</button>
    </div>
</div>