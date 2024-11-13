<script>
  import {
    addDays,
    startOfWeek,
    format,
    parse,
    differenceInMinutes,
  } from "date-fns";

  import { formatHour } from "../../../utils/utils";
  export let currentevents = [];
  export let selectedDate = new Date();
  let timeZoneOffset = -5;

  let weekDays = [];

  $: weekDays = Array.from({ length: 7 }, (_, i) => {
    const start = startOfWeek(
      new Date(
        selectedDate.getUTCFullYear(),
        selectedDate.getUTCMonth(),
        selectedDate.getUTCDate()
      ),
      { weekStartsOn: 1 }
    );
    return new Date(addDays(start, i).getTime() + timeZoneOffset * 3600 * 1000);
  });

  function getEventDuration(timeline) {
    const [startTime, endTime] = timeline.split(" - ");
    const start = parse(startTime, "h:mm a", new Date());
    const end = parse(endTime, "h:mm a", new Date());
    return differenceInMinutes(end, start) / 60;
  }

  function getStartOffset(timeline) {
    const [startTime] = timeline.split(" - ");
    const start = parse(startTime, "h:mm a", new Date());
    return start.getHours() + start.getMinutes() / 60;
  }

  function getEventsForDay(day) {
    const events = currentevents.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
    return events;
  }

  function handleOverlappingEvents(events) {
    events.sort((a, b) => {
      const aStart = parse(a.timeline.split(" - ")[0], "h:mm a", new Date());
      const bStart = parse(b.timeline.split(" - ")[0], "h:mm a", new Date());
      return aStart - bStart;
    });

    let maxColumn = 0;
    events.forEach((event, index) => {
      event.column = 0;
      for (let i = 0; i < index; i++) {
        if (eventsOverlap(events[i], event)) {
          event.column = Math.max(event.column, events[i].column + 1);
        }
      }
      maxColumn = Math.max(maxColumn, event.column);
    });

    const columnWidth = 100 / (maxColumn + 1);
    events.forEach((event) => {
      event.width = `${columnWidth}%`;
      event.left = `${event.column * columnWidth}%`;
    });

    return events;
  }

  function eventsOverlap(event1, event2) {
    const [start1, end1] = event1.timeline
      .split(" - ")
      .map((t) => parse(t, "h:mm a", new Date()));
    const [start2, end2] = event2.timeline
      .split(" - ")
      .map((t) => parse(t, "h:mm a", new Date()));
    return start1 < end2 && start2 < end1;
  }
</script>

<div class="mx-auto w-full">
  <div class="grid grid-cols-8 gap-0">
    <div class="time-header"></div>
    {#each weekDays as day}
      <div>
        <div
          class="day-header flex items-center flex-col gap-2 border-b p-3 pb-7 uppercase"
        >
          <span class="text-Text-Tartiary text-sm leading-[14px] font-normal">
            <span class="max-sm:hidden block">{format(day, "EEE")}</span>
            <span class="max-sm:block hidden">{format(day, "EEEEE")}</span>
          </span>
          <span
            class="text-[16px] sm:text-[18px] text-Text-Primary font-normal leading-[18px]"
          >
            {format(day, "dd")}
          </span>
        </div>
      </div>
    {/each}
  </div>
  <div class="grid grid-cols-8 gap-0 border-r border-stroke-Primary">
    <div class="col-span-1">
      {#each Array(24)
        .fill()
        .map((_, i) => i) as hour}
        <div
          class="hour-cell flex justify-end items-center sm:pt-3 sm:pb-3 text-center sm:p-2 mr-4 -translate-y-[30px]"
          style="height: 60px;"
        >
          {formatHour(hour)}
        </div>
      {/each}
    </div>
    {#each weekDays as day}
      <div class="relative" style="height: 1440px;">
        {#each handleOverlappingEvents(getEventsForDay(day)) as event}
          {@const startOffset = getStartOffset(event.timeline)}
          {@const duration = getEventDuration(event.timeline)}
          <div
            class="event-badge text-xs absolute hover:z-50 cursor-pointer transition-all"
            style="top: {startOffset * 60}px;
                   height: {duration * 60}px;
                   width: {event.width};
                   left: {event.left};"
          >
            <div
              class="w-full h-full rounded-[8px] p-[4px] sm:p-1.5 bg-blue-100 border sm:border-[1.5px] border-blue-300 overflow-hidden z-30 relative"
            >
              <div class="text-xs text-[#0284FE]">
                {#if event.timeline}
                  <div class="text-[10px] sm:text-xs text-[#0284FE] sm:pt-0.5">
                    {event.timeline.split("-")[0]}
                  </div>
                {/if}
              </div>
              <div
                class="text-[10px] sm:text-xs text-[#0284FE] font-semibold truncate"
              >
                {event.name}
                <div class="my-2 flex flex-col gap-1">
                  <div
                    class="bg-[#15A033] p-0.5 sm:py-1.5 sm:px-2 rounded-[4px] text-white tracking-wide truncate text-[10px] sm:text-xs"
                  >
                    {event.host.firstName + " " + event.host.lastName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
        {#each Array(24)
          .fill()
          .map((_, i) => i) as hour}
          <div
            class="border-b border-l border-stroke-Primary hour-slot"
            style="height: 60px;"
          ></div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .hour-cell {
    text-orientation: mixed;
    font-size: 0.75rem;
    color: #666c79;
  }

  .hour-slot {
    position: relative;
    height: 60px;
  }

  .hour-slot::after {
    content: "";
    position: absolute;
    bottom: 50%;
    left: 0%;
    width: 100%;
    border-bottom: 0.5px solid var(--Stroke-Primary, #d4d6d9);
  }
</style>
