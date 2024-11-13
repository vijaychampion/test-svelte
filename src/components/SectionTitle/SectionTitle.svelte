<script>
    export let title = "Section Title";
    export let icon = "";
    export let actions = [];
</script>

<div class="flex justify-between items-center mb-3">
    <div class="flex items-center space-x-2">
        {#if icon}
            <img src={icon} alt={title + ' icon'} class="w-6 h-6" />
        {/if}
        <h2 class="text-2xl text-Text-Tartiary">{title}</h2>
    </div>

    {#if actions.length > 0}
        <div class="relative">
            <select class="p-2 bg-white border rounded shadow-sm">
                {#each actions as action}
                    <option>{action}</option>
                {/each}
            </select>
        </div>
    {/if}
</div>

  