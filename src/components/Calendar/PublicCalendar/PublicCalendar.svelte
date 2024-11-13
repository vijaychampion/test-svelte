<script>
  import { onMount, tick } from "svelte";
  import { writable } from "svelte/store";
  import {
    convertToCustomDateFormat,
    formatTimeline,
    getDay,
    getMonth,
    getDateOfMonth,
  } from "./../../../utils/utils";
  import ShowDetails from "./[ShowDetails]/ShowDetails.svelte";
  import MonthSwitcher from "./PublicHeader/MonthSwitcher.svelte";
  import Breadcrumb from "../../Breadcrumb/Breadcrumb.svelte";
  import Calendar from "../Calendar.svelte";
  import imageView from "./../../../assets/images/image.png";
  import SkeletonLoader from "../../SkeletonLoader/SkeletonLoader.svelte";
  import PublicHeader from "./PublicHeader/PublicHeader.svelte";
  import PublicCard from "./PublicCard/PublicCard.svelte";
  import listOutline from "./../../../assets/svg/list-outline.png";
  import gridIcon from "./../../../assets/svg/grid-outline.png";
  import calendarIcon from "./../../../assets/svg/calendar-month.png";

  let PublicOptions = [
    { id: 0, text: "List view", icon: listOutline },
    { id: 1, text: "Gallery view", icon: gridIcon },
    { id: 2, text: "Calendar view", icon: calendarIcon },
  ];

  let BreadcrumbRoutes = writable([{ name: "Home", href: "/" }]);

  let publicView = writable(PublicOptions[2].id);
  let selectedEvent = writable(null);

  function selectOption(option) {
    publicView.set(option.id);
  }

  let date = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate()
    )
  );

  let searchQuery = writable("");
  let currentMonth = writable(date.getUTCMonth());
  let currentYear = writable(date.getUTCFullYear());
  let loading = writable(true);
  let events = [];
  let displayedEvents = writable([]);
  let displayedCount = writable(12);
  let totalFilteredCount = writable(0);
  let filteredEvents = writable([]);

  function handleNext() {
    currentMonth.update((month) => {
      if (month === 11) {
        currentYear.update((year) => year + 1);
        return 0;
      }
      return month + 1;
    });
  }

  function handlePrev() {
    currentMonth.update((month) => {
      if (month === 0) {
        currentYear.update((year) => year - 1);
        return 11;
      }
      return month - 1;
    });
  }

  onMount(() => {
    fetchEvents();
  });

  const fetchEvents = async () => {
    loading.set(true);
    try {
      const response = await fetch("/api/getEventsForVenue");
      if (response.ok) {
        const list = await response.json();
        events = list.map((c) => ({
          name: c.title,
          date: convertToCustomDateFormat(c.startDateTime),
          startDateTime: c.startDateTime,
          description: c.description,
          timeline: formatTimeline(c.startDateTime),
          location: c.venue.address,
          day: getDay(c.startDateTime),
          month: getMonth(c.startDateTime),
          dateOfMonth: getDateOfMonth(c.startDateTime),
          image: imageView,
          price: "22.73",
          status: "Only 2 left!",
          availableTickets: c.availableTickets,
          doorsOpenTime: c.doorsOpenTime,
          venue: c.venue,
          stage: c.stage,
          performers: c.performers,
          ticketType: c.ticketType,
          purchasedTickets: c.purchasedTickets,
          ShowImage: c.image,
        }));
        loading.set(false);
        updateDisplayedEvents();

        console.log("Events fetched successfully", list);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      loading.set(false);
    }
  };

  function loadMoreEvents() {
    displayedCount.update((n) => Math.min(n + 12, $totalFilteredCount));
    updateDisplayedEvents();
  }

  async function updateDisplayedEvents() {
    const searchValue = $searchQuery.toLowerCase();

    const filtered = events.filter(
      (event) =>
        event.name.toLowerCase().includes(searchValue) ||
        event.description.toLowerCase().includes(searchValue)
    );

    filteredEvents.set(filtered);
    totalFilteredCount.set(filtered.length);

    if ($publicView !== PublicOptions[2].id) {
      displayedEvents.set(filtered.slice(0, $displayedCount));
    }

    await tick();
    return filtered;
  }

  function handleSearch(event) {
    searchQuery.set(event.detail.query);
    displayedCount.set(12);
    updateDisplayedEvents();
  }

  function handleEventClick(event) {
    selectedEvent.set(event);
    BreadcrumbRoutes.set([
      { name: "Home", href: "/" },
      { name: event.detail.name, href: "#" },
    ]);
  }

  function handleBreadcrumbClick() {
    selectedEvent.set(null);
    BreadcrumbRoutes.set([{ name: "Home", href: "/" }]);
  }

  $: if ($publicView !== PublicOptions[2].id) {
    displayedEvents.set($filteredEvents.slice(0, $displayedCount));
  }
</script>

<div
  class="max-w-[1280px] flex flex-col items-left justify-start mx-auto px-7 w-full h-[80vh] md:px-10 sm:h-screen overflow-y-auto overflow-hidden border border-stroke-Primary rounded-lg bg-BG-Primary"
>
<div class="mt-5">
  <Breadcrumb  data={$BreadcrumbRoutes} on:click={handleBreadcrumbClick} />
</div>

  {#if $selectedEvent}
    <ShowDetails
      selectedEvent={$selectedEvent}
      goBack={() => {
        selectedEvent.set(null);
        BreadcrumbRoutes.set([{ name: "Home", href: "/" }]);
      }}
    />
  {:else}
    <div class="events-view">
      <PublicHeader
        {PublicOptions}
        {publicView}
        {selectOption}
        on:search={handleSearch}
      />

      {#if $publicView === 2}
        <MonthSwitcher
          currentYear={$currentYear}
          currentMonth={$currentMonth}
          {handleNext}
          {handlePrev}
        />
      {/if}

      <main class="py-2 mb-2 sm:mb-6 max-w-6xl mx-auto">
        {#if $publicView === 2}
          {#if $loading}
            <SkeletonLoader type="monthly" />
          {:else}
            <Calendar
              embedCalendar
              currentYear={$currentYear}
              currentMonth={$currentMonth}
              currentevents={$filteredEvents}
              on:eventClick={handleEventClick}
            />
          {/if}
        {:else if $publicView === 0}
          <div class="grid grid-cols-1 gap-2 lg:gap-6">
            <PublicCard
              events={$displayedEvents}
              view="row"
              on:eventClick={handleEventClick}
            />
          </div>
          {#if $displayedCount < $totalFilteredCount}
            <div class="flex items-center justify-center py-4">
              <button
                class="w-[158px] h-10 rounded-lg cursor-pointer gap-1 border-[1px] border-Icon-Primary overflow-hidden hover:bg-BG-Secondary"
                strokebtn
                size="full"
                on:click={loadMoreEvents}>Load More</button
              >
            </div>
          {/if}
        {:else if $publicView === 1}
          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-6"
          >
            <PublicCard
              events={$displayedEvents}
              view="col"
              on:eventClick={handleEventClick}
            />
          </div>
          {#if $displayedCount < $totalFilteredCount}
            <div class="flex justify-center items-center py-4">
              <button
                class="w-[158px] h-10 rounded-lg cursor-pointer gap-1 border-[1px] border-Icon-Primary overflow-hidden hover:bg-BG-Secondary"
                strokebtn
                size="full"
                on:click={loadMoreEvents}>Load More</button
              >
            </div>
          {/if}
        {/if}
      </main>
    </div>
  {/if}
</div>
