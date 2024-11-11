<script lang="ts">
	import { pointsInkrementRightAnswer, pointsInkrementWrongAnswer } from '$lib/store/SettingsStore';
	import FormField from '../form/FormField.svelte';
</script>

<div class="flex flex-col">
	<FormField label="Punkte bei richtiger Antwort">
		<input
			type="number"
			class="bg-slate-700"
			bind:value={$pointsInkrementRightAnswer}
			min="0"
			max="10"
		/>
	</FormField>
	<FormField label="Punkte bei falscher Antwort">
		<input
			type="number"
			class="bg-slate-700"
			bind:value={$pointsInkrementWrongAnswer}
			min="0"
			max="10"
		/>
	</FormField>
</div>
