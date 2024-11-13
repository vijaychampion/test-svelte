<script>
  import Button from "../../src/components/Button/Button.svelte";
  import Form from "../components/Form/Form.svelte";
  import DatePicker from "../components/DatePicker/DatePicker.svelte";
  import Modal from "../components/Modal/Modal.svelte";
  import DateRangePicker from "./../components/DateRangePicker/DateRangePicker.svelte";

  import Pin from "./../assets/svg/pin.svg";
  import Badge from "../components/Badges/Badge.svelte";
  import AdminCalendar from "../components/Calendar/AdminCalendar/AdminCalendar.svelte";
  import FileDropzone from "./../components/FileDropzone/FileDropzone.svelte";
  import Cropzone from "../components/CroppingUI/CropZone.svelte";
  import PublicCalendar from "../components/Calendar/PublicCalendar/PublicCalendar.svelte";
  import Notification from "../components/Notification/Notification.svelte";

  let modalOpen = false;

  const confirmModal = () => {
    modalOpen = true;
  };

  function onConfirm() {
    console.log("Item created");
    modalOpen = false;
  }

  function showModal() {
    modalOpen = true;
  }

  function applyDatePicker() {
    console.log("Date Selected");
  }

  function showDetails() {
    console.log("Show Details");
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex flex-col items-center justify-center h-screen">
  <a
      href="/events/booking"
      class="text-[#0284FE] text-sm font-medium leading-[14px] hover:no-underline"
      >
  Go to Test page
  </a
    >
</div>

<!-- <div class="sm:py-5">
  <PublicCalendar />
</div> -->

<!-- <h2 class="flex justify-center">Admin Calendar</h2>
<div class="py-5">
  <AdminCalendar />
</div> -->

<!-- <div class="py-5">
  <Notification />
</div> -->

<!-- <div class="py-5 mx-auto max-w-6xl flex flex-col">
  <a href="/orders">Orders Page</a>
</div>
<div class="py-5">
  <DatePicker />
</div>
<div class="py-5">
  <DateRangePicker onApply={applyDatePicker} onCancel={showDetails} />
</div> -->

<!-- <section class="flex flex-col justify-center items-center flex-[0.6] py-20">
  <div class="flex space-x-3">
    <Button alert strokebtn on:click={confirmModal} beforeIcon={Pin}
      >Open Modal</Button
    >
  </div>
  <Modal
    show={modalOpen}
    title="Create Item"
    description="Are you sure you want to create this item?"
    closeBtn={true}
    actions={[
      {
        label: "Cancel",
        onClick: () => (modalOpen = false),
        strokebtn: true,
      },
      { label: "Confirm", onClick: onConfirm },
    ]}
  />

  <div class="py-5 flex gap-2">
    <Form />
  </div>

  <div class="py-5">
    <Badge on:click={showModal} status="success" size="large">modal</Badge>
    <Badge
      on:click={() => alert("This is Alert Badge")}
      status="danger"
      size="large">alert</Badge
    >
    <Badge
      on:click={() => alert("This is Dismisable Badge")}
      dismissable
      className="border border-stroke-Primary"
      size="large">warning</Badge
    >
    <p>To check more about Button variations, Please check the Storybook</p>
  </div>

  <div class="py-5">
    <FileDropzone />
  </div>

  <div class="py-5">
    <Cropzone shape="round" />
  </div>
</section> -->
