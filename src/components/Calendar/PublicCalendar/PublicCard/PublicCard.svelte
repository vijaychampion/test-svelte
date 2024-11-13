<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Badge from "../../../Badges/Badge.svelte";
  import mockImg from "./../../../../assets/images/image.png";
  import TimeIcon from "./../../../../assets/svg/Vector.png";
  import { truncateTitle } from "../../../../utils/utils";

  export let events = [];
  export let view = "row";

  const dispatch = createEventDispatcher();
  let isSmallScreen = false;

  let options = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  onMount(() => {
    isSmallScreen = window.innerWidth < 768;
    window.addEventListener("resize", handleResize);
  });

  function handleResize() {
    isSmallScreen = window.innerWidth < 768;
  }

  function handleEventClick(event) {
    dispatch("eventClick", event);
  }
</script>

{#each events as event}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <section
    class={`flex event-view rounded-lg cursor-pointer gap-1 overflow-hidden ${
      view === "col"
        ? "flex-col lg:w-[222px]"
        : "flex-row gap-2 sm:gap-4 relative p-2.5 w-full"
    }`}
    on:click={() => handleEventClick(event)}
  >
    <div
      class={`bg-Icon-Primary overflow-hidden h-full ${view === "col" ? "relative w-full rounded-lg" : "rounded-[8px] max-w-[130px] sm:max-w-[200px]"}`}
    >
      <img
        src={event.image || mockImg}
        alt={event.name}
        class={`object-contain cursor-pointer ${view === "col" ? "w-full rounded-lg h-[128px]" : "h-[150px] sm:h-[200px]"}`}
      />
    </div>
    <div
      class={`flex h-full flex-col ${view === "col" ? "p-1 gap-2" : "gap-1 sm:gap-2"}`}
    >
      {#if event.status}
        <Badge
          icon={TimeIcon}
          status="danger"
          className="text-[#E02424] text-[10px] py-0.5 sm:rounded-lg rounded sm:py-1 px-[9px] max-w-[90px] sm:max-w-[140px] sm:text-[14px]"
          >{event.status}</Badge
        >
      {/if}
      <div
        class={`font-medium leading-[22px] text-Text-Primary ${
          view === "col"
            ? "text-[14px] font-medium leading-normal sm:text-[16px]"
            : "sm:text-2xl font-medium text-[14px] leading-normal max-sm:pr-7 max-sm:pt-[2px]"
        }`}
      >
        {event.name}
      </div>
      <div class={`flex flex-col ${view === "col" ? "gap-1" : "pb-2"}`}>
        <div
          class={`text-Text-Primary font-normal leading-[16px] ${
            view === "col"
              ? "text-[10px] font-medium text-Text-Tartiary sm:text-[14px]"
              : "text-[10px] sm:text-sm font-medium leading-normal"
          }`}
        >
          {new Date(event.date).toLocaleDateString("en-US", options)}
          • {event.timeline.split("-")[0]}
        </div>
      </div>
      {#if view === "row"}
        <p
          class={`text-Text-Tartiary ${
            view === "row"
              ? "text-[10px] sm:text-sm sm:leading-normal font-normal"
              : ""
          }`}
        >
          {isSmallScreen
            ? truncateTitle(event.description, 70)
            : event.description}
        </p>
      {/if}
    </div>
  </section>
{/each}

<style>
  .event-view {
    background-color: #ffffff;
    transition:
      box-shadow 0.3s ease-in-out,
      transform 0.3s ease-in-out;
  }
  .event-view:hover {
    background-color: #f7f7f8;
    transform: scale(1);
    box-shadow:
      0px 56px 16px 0px rgba(43, 43, 43, 0),
      0px 36px 14px 0px rgba(43, 43, 43, 0.01),
      0px 20px 12px 0px rgba(43, 43, 43, 0.05),
      0px 9px 9px 0px rgba(43, 43, 43, 0.09),
      0px 2px 5px 0px rgba(43, 43, 43, 0.1);
  }
  @media (max-width: 767px) {
    .event-view p {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
</style>
