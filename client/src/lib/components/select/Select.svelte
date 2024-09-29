<script lang="ts" generics="T">
    export let items: T[] = [];
    export let label: keyof T;

    export let index = 0;
    export let value: T;
  
    $: {
      value = items[index];
      console.log(value);
    }
  </script>
  
  <select bind:value={index}>
    {#each items as option, i}
      <option value={i}>{option[label]}</option>
    {/each}
  </select>
  