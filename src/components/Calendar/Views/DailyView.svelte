<script>
  import { getHours, parse, differenceInMinutes } from "date-fns";
  import { formatHour } from "./../../../utils/utils";
  import Button from "../../Button/Button.svelte";
  import AddMainBlue from "./../../../assets/svg/add-main-blue.svg";

  export let isScheduledBtn = false;
  export let currentevents = [];
  export let selectedDate;
  let timeZoneOffset = -5;

  let hoursInDay = [];

  $: {
    hoursInDay = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      events: [],
    }));

    hoursInDay = hoursInDay.map((hour) => {
      hour.events = currentevents.filter((event) => {
        const eventDate = new Date(event.date);
        const adjustedEventDate = new Date(
          eventDate.getTime() + timeZoneOffset * 3600 * 1000
        );
        return (
          getHours(adjustedEventDate) === hour.hour &&
          adjustedEventDate.getUTCMonth() === selectedDate.getUTCMonth() &&
          adjustedEventDate.getUTCFullYear() ===
            selectedDate.getUTCFullYear() &&
          adjustedEventDate.getUTCDate() === selectedDate.getUTCDate()
        );
      });
      return hour;
    });
  }

  function getEventDuration(timeline) {
    const [startTime, endTime] = timeline.split(" - ");
    const start = parse(startTime, "h:mm a", new Date());
    const end = parse(endTime, "h:mm a", new Date());
    const minutesDiff = differenceInMinutes(end, start);
    return minutesDiff / 60 + 1;
  }

  function getStartOffset(timeline) {
    const [startTime] = timeline.split(" - ");
    const start = parse(startTime, "h:mm a", new Date());
    const minutes = start.getMinutes();
    return (minutes / 60) * 33;
  }

  let hoveredDay = null;

  function handleHover(hour) {
    hoveredDay = hour;
  }

  function handleMouseLeave() {
    hoveredDay = null;
  }

  $: formattedDay = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(selectedDate);

  $: formattedWeek = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  }).format(selectedDate);
</script>

<div class="mx-auto w-full">
  <div class="grid grid-cols-8 gap-0">
    <div class="empty-cell col-span-1" />
    <h2 class="text-left col-span-7 p-2">
      <span class="text-[#252B37] text-lg leading-[18px] font-normal"
        >{formattedWeek}</span
      >,
      <span class="text-[#666C79] text-sm font-normal">{formattedDay}</span>
    </h2>
  </div>

  <div class="grid grid-cols-8 gap-0">
    {#each hoursInDay as hourBlock}
      <div
        class="hour-cell flex justify-end items-center text-center py-3 sm:mr-2"
      >
        {formatHour(hourBlock.hour)}
      </div>
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="day-cell flex sm:gap-3 text-center col-span-7"
        on:mouseenter={() => handleHover(hourBlock)}
        on:mouseleave={handleMouseLeave}
      >
        {#each hourBlock.events as event}
          <div class="event-badge text-xs mb-1 w-[14%] relative text-left">
            <div
              class="w-[150px] rounded-[8px] p-1.5 bg-blue-100 border-[1.5px] border-blue-300 absolute top-0 overflow-hidden z-30"
              style="height: calc({getEventDuration(
                event.timeline
              )} * 4.5vh); margin-top: calc({getStartOffset(event.timeline)}%);"
            >
              <div class="text-xs text-[#0284FE]">{event.timeline.split("-")[0]}</div>
              <div class="text-sm truncate pt-1 font-medium text-[#0284FE]">
                {event.name}
              </div>
              <div class="my-2 flex flex-col gap-1">
                <div
                  class="bg-[#15A033] py-1.5 px-2 rounded-[4px] text-white tracking-wide truncate text-xs"
                >
                  {event.host.firstName + " " + event.host.lastName}
                </div>
              </div>
            </div>
          </div>
        {/each}
        {#if isScheduledBtn && hoveredDay === hourBlock}
          <div class="mt-auto mx-auto">
            <Button ScheduledBtn beforeIcon={AddMainBlue}>Schedule</Button>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .grid {
    width: 100%;
  }
  .hour-cell {
    color: var(--text-tartiary, #666c79);
    font-size: 13px;
    height: 4.5vh;
    padding: 10px;
  }

  .day-cell {
    font-size: 14px;
    border-bottom: 0.5px solid var(--Stroke-Primary, #d4d6d9);
    display: flex;
    align-items: flex-start;
    height: 4.5vh;
    position: relative;
  }

  .day-cell::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    border: 0.5px solid var(--Stroke-Primary, #d4d6d9);
  }
  .event-badge {
    background-color: hsla(0, 0%, 100%, 1);
    color: hsla(220, 20%, 18%, 1);
    border-radius: 4px;
    font-weight: 400;
  }

  @media (max-width: 640px) {
    .hour-cell {
      font-size: 10px;
    }
  }
</style>
