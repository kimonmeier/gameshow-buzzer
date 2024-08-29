<script lang="ts">
	import {
		answerRightSoundVolume,
		answerWrongSoundVolume,
		buzzerSoundVolume
	} from '$lib/store/AudioStore';
	import GroupBox from '../groupBox/GroupBox.svelte';
	import Modal from '../modal/Modal.svelte';

	export let showModal: boolean;
</script>

<Modal bind:showModal>
	<GroupBox title="Volume Einstellungen">
		<div class="flex flex-col w-full gap-5">
			<div class="flex flex-row">
				<div>Lautstärke Buzzer:</div>

				<input type="range" bind:value={$buzzerSoundVolume} min={0} max={1} step="0.005" />
			</div>
			<div class="flex flex-row">
				<div>Lautstärke richtige Antwort:</div>

				<input type="range" bind:value={$answerRightSoundVolume} min={0} max={1} step="0.005" />
			</div>
			<div class="flex flex-row">
				<div>Lautstärke falsche Antwort:</div>

				<input type="range" bind:value={$answerWrongSoundVolume} min={0} max={1} step="0.005" />
			</div>
		</div>
	</GroupBox>
</Modal>
