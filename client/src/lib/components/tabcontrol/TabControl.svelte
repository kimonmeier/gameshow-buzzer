<script lang="ts">
	import type { Tab } from "./TabControl.models";

    let className: string = '';
    export let items: Tab[] = [];
    export let activeTabValue = 0;
    export { className as class}
  
    const handleClick = (tabValue: number) => () => (activeTabValue = tabValue);
</script>

<ul class="flex flex-wrap p border-b {className}">
    {#each items as item, key}
        <li class="px-2 pb-1 rounded-t-md border {activeTabValue === key ? 'bg-white text-black' : ''}">
            <button on:click={handleClick(key)}>{item.name}</button>
        </li>
    {/each}
</ul>

{#each items as item, key}
	{#if activeTabValue == key}
	<div class="border rounded-xl rounded-t-none p-2 {className}">
		<svelte:component this={item.component}/>
	</div>
	{/if}
{/each}