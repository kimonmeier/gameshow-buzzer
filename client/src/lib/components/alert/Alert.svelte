<script lang="ts">
    import Icon from '@iconify/svelte';
	import { AlertType } from "./Alert.models";

    let className = ''
    export { className as class }

    export let alertType: AlertType = AlertType.Message;
    export let message: string;
    let background: string;

    $: switch(alertType) {
        case AlertType.Message:
            background = "bg-teal-400";
            break;
        case AlertType.Warning:
            background = "bg-yellow-400";
            break;
        case AlertType.Error:
            background = "bg-red-400";
            break;
    }
</script>

<div class="{background} {className} border rounded-lg p-3 m-2 flex flex-row">
    <div class="mr-3 justify-center items-center">
        {#if alertType == AlertType.Message}
            <Icon icon="mdi:message-outline"/>
        {:else if alertType == AlertType.Warning}
            <Icon icon="mdi:warning-outline"/>
        {:else}
            <Icon icon="mdi:error-outline"/>
        {/if}
    </div>
    <div>
        {message}
    </div>
</div>
