<script lang="ts">
	import { pointsInkrement } from "$lib/store/SettingsStore";
	import FormField from "../form/FormField.svelte";

</script>

<div class="flex flex-col">
    <FormField label="Punkte">
        <input type="number" class="bg-slate-700" bind:value={$pointsInkrement} min="0" max="10"/> 
    </FormField>
</div>