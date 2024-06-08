<script lang="ts">
	import FormField from "../form/FormField.svelte";

    let punkteIncrement: number = 1;

    function updatePunkte() {
        console.log("Punkte changed");

        //TODO: Wrote update Logic
    }

</script>

<div class="flex flex-col">
    <FormField label="Punkte">
        <input type="number" class="bg-slate-700" bind:value={punkteIncrement} min="0" max="10" on:blur={updatePunkte}/> 
    </FormField>
</div>