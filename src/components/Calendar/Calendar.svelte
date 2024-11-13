<script>
  import { createEventDispatcher } from "svelte";
  import { getDay, getDaysInMonth, startOfMonth, format } from "date-fns";

  import Button from "../Button/Button.svelte";
  import Badge from "./../Badges/Badge.svelte";
  import mockImg from "./../../assets/images/image.png";
  import AddMainBlue from "../../assets/svg/add-main-blue.svg";
  import TimeIcon from "./../../assets/svg/Vector.png";

  export let isScheduledBtn = false;
  export let eventCalendar = false;
  export let embedCalendar = false;
  export let currentYear = currentDate.getUTCFullYear();
  export let currentMonth = currentDate.getUTCMonth();
  export let currentevents = [];
  let selectedEvent = [];
  let currentDate = new Date();

  const dispatch = createEventDispatcher();

  let selectedDate;
  $: selectedDate = new Date(Date.UTC(currentYear, currentMonth, 1));

  let daysInMonth = [];

  $: {
    const days = getDaysInMonth(selectedDate);
    const startDay = getDay(startOfMonth(selectedDate));
    daysInMonth = Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      startDay: startDay + i,
      events: [],
    }));

    daysInMonth = daysInMonth.map((day) => {
      day.events = currentevents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getUTCFullYear() === currentYear &&
          eventDate.getUTCMonth() === selectedDate.getUTCMonth() &&
          eventDate.getUTCDate() === day.day
        );
      });
      return day;
    });
  }

  let options = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  function handleEventClick(event) {
    dispatch("eventClick", event);
  }

  let hoveredDay = null;

  function handleHover(day) {
    hoveredDay = day;
  }

  function handleMouseLeave() {
    hoveredDay = null;
  }

  function navigateToDay(day) {
    const dayString = String(day).padStart(2, "0");
    const monthString = String(selectedDate.getUTCMonth() + 1).padStart(2, "0");
    const route = `/daily/${currentYear}-${monthString}-${dayString}`;

    console.log(route, "logs goto route");
  }

  function showEventDetails(event) {
    selectedEvent = event;
  }
</script>

<div class="max-w-[1200px] overflow-hidden mx-auto w-full bg-BG-Primary">
  <div
    class="calendar max-sm:gap-[2px] max-sm:p-[2px] w-full overflow-hidden mx-auto grid rounded-lg border border-stroke-Primary"
  >
    {#each ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as dayName}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <span
        class="flex p-3 items-center justify-center gap-3 bg-BG-Primary text-Text-Tartiary leading-[18px] font-normal text-[14px] sm:text-lg max-sm:border-b border-l first:border-l-0 border-stroke-Primary"
      >
        {dayName}
      </span>
    {/each}
    {#each Array(daysInMonth[0]?.startDay || 0)
      .fill()
      .map(() => "") as _}
      <div></div>
    {/each}
    {#each daysInMonth as day}
      <!-- svelte-ignore missing-declaration -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class={`day-container text-[#252B37] flex flex-col items-center ${
          day.events.length > 0
            ? "max-sm:bg-[#0284FE26] max-sm:rounded-[8px]"
            : ""
        }`}
        on:click={() => navigateToDay(day.day)}
        on:mouseenter={() => handleHover(day)}
        on:mouseleave={handleMouseLeave}
        on:click={() => {
          if (day.events.length > 0) showEventDetails(day.events);
        }}
      >
        <div class="my-1.5 w-full flex flex-col items-center gap-2">
          <span class="day">{day.day}</span>

          <div class="hidden sm:flex sm:flex-col gap-1.5 w-full">
            {#each day.events as event}
              {#if eventCalendar}
                <div
                  class="flex items-center gap-1 max-w-full cursor-pointer embedCalendar rounded-full py-[2px] px-2"
                  on:click={() => alert("You clicked on an event!")}
                >
                  <svg
                    width="7"
                    height="7"
                    class="text-blue-500"
                    viewBox="0 0 6 6"
                    fill="currentColor"
                    style="flex-shrink: 0;"
                  >
                    <circle cx="3" cy="3" r="3" />
                  </svg>
                  <span
                    class="text-xs sm:text-sm flex-grow truncate text-gray-800"
                    >{event.name}</span
                  >
                  <span
                    class="text-xs md:text-[13px] whitespace-nowrap text-gray-500"
                  >
                    {event.timeline.split("-")[0]}</span
                  >
                </div>
              {:else if embedCalendar}
                <div
                  class="flex flex-col justify-center embedCalendar w-full cursor-pointer items-center gap-1 p-2 rounded-lg hover:bg-BG-Secondary"
                  on:click={() => handleEventClick(event)}
                >
                  <div
                    class="w-full bg-Icon-Primary rounded-[8px] overflow-hidden"
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      class="h-[96px] w-full object-contain cursor-pointer"
                    />
                  </div>
                  {#if event.status}
                    <Badge
                      icon={TimeIcon}
                      status="danger"
                      className="text-red-600 text-[10px] rounded"
                      size="medium">{event.status}</Badge
                    >
                  {/if}
                  <div
                    class="text-Text-Primary text-[12px] font-medium leading-normal tracking-normal text-balance text-center"
                  >
                    {event.name}
                  </div>
                  <div
                    class="text-[10px] text-Text-Tartiary font-medium leading-normal"
                  >
                    {event.timeline}
                  </div>
                </div>
              {/if}
            {/each}
          </div>

          {#if isScheduledBtn && hoveredDay === day}
            <div class="mt-auto mx-auto">
              <Button ScheduledBtn beforeIcon={AddMainBlue}>Schedule</Button>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  <div class="max-sm:flex hidden mt-4 flex-col gap-2">
    {#each selectedEvent as event}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <section
        class="flex rounded-lg cursor-pointer gap-4 hover:bg-BG-Secondary overflow-hidden flex-row sm:gap-4 relative p-2.5 w-full"
        on:click={() => handleEventClick(event)}
      >
        <div
          class={`bg-Icon-Primary overflow-hidden h-full rounded-[8px] max-w-[130px]`}
        >
          <img
            src={event.image || mockImg}
            alt={event.name}
            class={`object-contain cursor-pointer h-[150px]`}
          />
        </div>
        <div class={`flex flex-col gap-1`}>
          {#if event.status}
            <Badge
              icon={TimeIcon}
              status="danger"
              className="text-[#E02424] pl-4 max-w-[137px]"
              size="medium">{event.status}</Badge
            >
          {/if}
          <div
            class={`font-medium leading-[22px] text-Text-Primary text-[14px]"
          }`}
          >
            {event.name}
          </div>
          <div
            class={`text-Text-Primary font-medium text-[10px] py-1.5 leading-[16px]"
            }`}
          >
            {new Date(event.date).toLocaleDateString("en-US", options)}
            • {event.timeline.split("-")[0]}
          </div>
          <p class="text-Text-Tartiary text-[10px] font-medium">
            {event.description}
          </p>
        </div>
      </section>
    {/each}
  </div>
</div>

<style>
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, minmax(100px, 1fr));
    grid-template-rows: auto;
    grid-auto-rows: minmax(158px, auto);
  }

  .day-container {
    padding: 8px;
    gap: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }

  .calendar > .day-container,
  .calendar > div {
    border-top: 1px solid #d4d6d9;
  }

  .calendar > .day-container:not(:nth-child(7n + 1)),
  .calendar > div:not(:nth-child(7n + 1)) {
    border-left: 1px solid #d4d6d9;
  }

  .calendar > .day-container:nth-last-child(-n + 7),
  .calendar > div:nth-last-child(-n + 7) {
    border-bottom: 1px solid #d4d6d9;
  }
  .calendar > .day-container:last-of-type {
    border-right: 1px solid #d4d6d9;
  }

  .day {
    font-size: 18px;
    color: #0d1526;
    font-weight: 400;
    line-height: 18px;
    font-style: normal;
  }

  .embedCalendar {
    transition:
      box-shadow 0.3s ease-in-out,
      transform 0.3s ease-in-out;
  }

  .embedCalendar:hover {
    transform: scale(1);
    box-shadow:
      0px 56px 16px 0px rgba(43, 43, 43, 0),
      0px 36px 14px 0px rgba(43, 43, 43, 0.01),
      0px 20px 12px 0px rgba(43, 43, 43, 0.05),
      0px 9px 9px 0px rgba(43, 43, 43, 0.09),
      0px 2px 5px 0px rgba(43, 43, 43, 0.1);
  }

  @media (max-width: 1024px) {
    .calendar {
      grid-template-columns: repeat(7, minmax(100px, 1fr));
    }

    .day {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    .calendar {
      grid-template-columns: repeat(7, minmax(70px, 1fr));
    }

    .day {
      font-size: 14px;
    }

    .day-container {
      padding: 6px 4px;
    }
  }

  @media (max-width: 640px) {
    .calendar {
      grid-template-columns: repeat(7, minmax(30px, 1fr));
      grid-auto-rows: minmax(8px, auto);
    }

    .day {
      font-size: 12px;
    }
    .calendar > .day-container,
    .calendar > div {
      border-top: none;
    }

    .calendar > .day-container:not(:nth-child(7n + 1)),
    .calendar > div:not(:nth-child(7n + 1)) {
      border-left: none;
    }

    .calendar > .day-container:nth-last-child(-n + 7),
    .calendar > div:nth-last-child(-n + 7) {
      border-bottom: none;
    }
    .calendar > .day-container:last-of-type {
      border-right: none;
    }
  }
</style>
