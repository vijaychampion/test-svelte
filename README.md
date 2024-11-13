# Svelte Component Center - v2

## Overview

This project is a Component Center for JetPack in Svelte.

## Installation

To set up the project, install the dependencies using either of the following commands:

```bash
# create a new project in the current directory
npm install

# create a new project in my-app
yarn install
# or
yarn
```

To start the development server, run:

```bash
npm run dev
# or
yarn dev

```

The server will be available at http://localhost:5173/.

## Storybook Integration

To view and interact with the components in a Storybook environment, execute the following command:

```bash
npm run storybook
# or
yarn storybook
```

Storybook will be available at http://localhost:6006/.

## Testing

To execute the tests and verify that they pass, use:

```bash
npm run test
# or
yarn test
```

For development purposes, if you need to continuously monitor the test results as you make changes, run:

```bash
npm run test:watch
# or
yarn test:watch
```

To run tests in a browser-based interface, which allows you to see test progress in real-time, use:

```bash
npm run test:ui
# or
yarn test:ui

```

This will open the testing interface at http://localhost:51205/.

```svelte
<script>
  import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.svelte";
  import LargeImage from "../../assets/images/large-image.png";
  import BackArrow from "../../assets/svg/back-arrow.svg";
  import shareIcon from "../../assets/svg/share.svg";
  import Button from "../../components/Button/Button.svelte";
  import Faqs from "../../components/Faqs/Faqs.svelte"; // Import your Faqs component

  // Breadcrumb data
  let breadcrumbData = [
    { name: "Shows", href: "/" },
    { name: "DeRay Davis", href: "/deray-davis" },
  ];

  // For expanding/collapsing text
  let isExpanded = false;

  // Toggle expanded content
  function toggle() {
    isExpanded = !isExpanded;
  }

  // Tab items array (mixing content and components)
  let items = [
    {
      id: 1,
      label: "About the show",
      content: `<p>This is the content for Tab 1</p>`, // Static HTML content
    },
    {
      id: 2,
      label: "FAQs",
      component: Faqs, // Svelte component
    },
    {
      id: 3,
      label: "Disclaimers",
      content: "<p>This is the content for Tab 3</p>", // Static HTML content
    },
  ];

  let activeTabValue = 1; // Default tab
  // Function to set the active tab
  function setActiveTab(id) {
    activeTabValue = id;
  }
</script>

<!-- Breadcrumb Navigation -->
<div class="max-w-[1032px] mx-auto bg-BG-Primary p-2 border rounded-[8px]">
  <nav class="py-4">
    <Breadcrumb data={breadcrumbData} />
  </nav>

  <div class="grid md:grid-cols-3 gap-2 h-[300vh]">
    <div class="md:col-span-2">
      <!-- Image preview with back button -->
      <div class="relative">
        <img src={LargeImage} alt="Large image preview" class="w-full" />
        <button
          class="bg-[#252B37] rounded-full size-[34px] sm:size-[40px] flex items-center justify-center absolute top-3 left-3"
          aria-label="Back"
        >
          <img src={BackArrow} alt="Back arrow" class="size-3.5 sm:size-5" />
        </button>
      </div>

      <!-- Tabs -->
      <div class="my-5">
        <div
          class="flex justify-start sm:justify-center gap-8 border-b border-b-[#E5E7EB]"
        >
          {#each items as item}
            <div>
              <button
                class="w-full py-2 px-1 text-sm sm:text-[16px] text-center font-medium focus:outline-none"
                class:border-b-transparent={activeTabValue !== item.id}
                class:border-b-[#1A56DB]={activeTabValue === item.id}
                class:text-[#1A56DB]={activeTabValue === item.id}
                on:click={() => setActiveTab(item.id)}
              >
                {item.label}
              </button>
            </div>
          {/each}
        </div>

        <div class="my-4">
          <!-- Tab content -->
          {#each items as item}
            {#if activeTabValue === item.id}
              {#if item.content}
                <!-- Render HTML content -->
                {@html item.content}
              {/if}

              {#if item.component}
                <!-- Render Svelte component -->
                <svelte:component this={item.component} />
              {/if}
            {/if}
          {/each}
        </div>
      </div>

      <!-- Show more / Show less -->
      <div>
        <p class="text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scel
          {#if !isExpanded}
            ...
          {/if}
          {#if isExpanded}
            erisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
            congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut
            aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim
            ac. In at libero sed nunc venenatis imperdiet sed ornare turpis.
            Donec vitae dui eget tellus gravida venenatis. Integer fringilla
            congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta.
          {/if}
        </p>
        <button
          on:click={toggle}
          class="sm:font-semibold text-[#1C64F2] text-sm sm:text-[16px]"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse content" : "Expand content"}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      </div>
    </div>

    <!-- Sticky Section -->
    <section class="sticky bottom-0 sm:top-2 h-fit">
      <div
        class="h-fit rounded-[8px] px-5 py-4 bg-[#FFFFFF] border border-[#D4D6D9] max-sm:hidden"
      >
        <div class="flex justify-between">
          <h1 class="w-full text-left font-semibold text-[24px]">
            DeRay Davis
          </h1>
          <img
            src={shareIcon}
            alt="Share icon"
            class="size-3.5 translate-y-2.5"
          />
        </div>
        <h2 class="text-sm text-[#6B7280] py-2 mt-1">Date & time</h2>
        <p class="text-[16px] text-[#252B37]">
          Thu, Oct 24 2024, 11:00PM (Doors: 10:30PM)
        </p>

        <!-- More Showtimes -->
        <div class="mt-3.5 mb-4">
          <h2 class="text-[#6B7280] text-sm mb-2">More showtimes</h2>
          <div class="grid grid-cols-3 gap-4">
            <div
              class="border-2 border-[#1C64F2] w-[88px] h-[106px] rounded-[8px] bg-[#FFFFFF] flex flex-col justify-center items-center"
            >
              <span class="font-medium text-sm text-[#666C79]">Thu</span>
              <span class="font-medium text-[16px] text-[#1C64F2]">Oct 24</span>
              <span class="font-medium text-sm text-[#666C79]">11:00PM</span>
            </div>
            <!-- Repeating blocks -->
          </div>
        </div>

        <!-- Location -->
        <div class="mb-4">
          <h2 class="text-[#6B7280] text-sm mb-2">Location</h2>
          <p class="text-[16px] text-[#252B37]">
            The Crow - Main Stage, 7702 Santa Monica Blvd, Los Angeles, CA 90046
          </p>
        </div>
        <h1 class="w-full text-left font-semibold text-[16px] text-[#1C64F2]">
          Direction
        </h1>
      </div>

      <!-- Tickets Section -->
      <div
        class="h-fit rounded-[8px] p-5 bg-[#FFFFFF] border border-[#D4D6D9] mt-5"
      >
        <div class="flex items-center justify-between pb-5">
          <h2 class="text-sm text-[#6B7280]">Starts from</h2>
          <div class="flex items-center gap-2">
            <h1 class="text-[#111928] font-semibold text-[16px]">$24.48</h1>
            <span class="text-[10px] text-[#6B7280]">incl. $4.48 fee</span>
          </div>
        </div>
        <Button size="full" class="text-white">Get tickets</Button>
      </div>
    </section>
  </div>
</div>

```
