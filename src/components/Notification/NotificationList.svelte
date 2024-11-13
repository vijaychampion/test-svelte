<script>
  export let statusIcon;
  export let name;
  export let action;
  export let event;
  export let message;
  export let time;
  export let avatar;
</script>

<div class="flex items-start">
  <div class="relative">
    <img
      src={avatar}
      alt=""
      class={`size-[44px] mr-3 rounded-[4px] relative object-cover shadow`}
    />
    <div class={`absolute size-[16px] right-2 -bottom-1`}>
      <img src={statusIcon} alt="" class={`rounded-full`} />
    </div>
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-[16px] font-medium text-gray-900 leading-6">
      {#if name}
        {name}
        {#if action}
          <span class="font-normal text-gray-500"> {action}</span>
        {/if}
        {#if event}
          <span class="font-medium"> {event}</span>
        {/if}
      {:else if event}
        {event}
        {#if action}
          <span class="font-normal text-gray-500"> {action}</span>
        {/if}
      {/if}
    </p>

    {#if message}
      <p class="text-[16px] leading-[24px] text-gray-500">
        {message}
      </p>
    {/if}
    <p class="text-sm leading-[17.5px] text-gray-400 font-normal mt-1">
      {time}
    </p>
  </div>
</div>
