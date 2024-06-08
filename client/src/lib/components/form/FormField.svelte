<script lang="ts">
    let className: string = '';
    export let label: string;
    export {className as class}
</script>

<div class="flex flex-row {className} w-full">
    <label class="px-2 min-w-32 text-right" for={label}>
        {label}:
    </label>
    <div>
        <slot />
    </div>
</div>