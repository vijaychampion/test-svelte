<script>
  import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.svelte";
  import PageTitle from "../../../components/PageTitle/PageTitle.svelte";

  import UserIcon from "../../../assets/svg/lineup.svg"
  import PinnedIcon from "../../../assets/svg/pinned.svg"
  import DiclinedIcon from "../../../assets/svg/diclined.svg"
  import SuccessIcon from "../../../assets/svg/Success-icon.svg"
  import InvitedIcon from "../../../assets/svg/invited-icon.svg"
  import PinnedCircleIcon from "../../../assets/svg/pinned-circle.svg"
  import DeclinedIcon from "../../../assets/svg/declined-icon.svg"
  import RosterIcon from "../../../assets/svg/roster.svg"
  import pic1 from "../../../assets/images/pic-1.png"
  import pic2 from "../../../assets/images/pic-2.png"
  import pic3 from "../../../assets/images/pic-3.png"
  import pic4 from "../../../assets/images/pic-4.png"

  import Table from "../../../components/Table/Table.svelte";
  import SectionTitle from "../../../components/SectionTitle/SectionTitle.svelte";

  const icons = {
    UserIcon,
    PinnedIcon,
    DeclinedIcon,
    SuccessIcon,
    InvitedIcon,
    PinnedCircleIcon,
    RosterIcon
  };

  const positionStyles = {
    Host: "bg-stroke-Tartiary text-white",
    Guest: "bg-Hue-Teal text-white",
    Feature: "bg-accent-Infoblue text-white",
    Headliner: "bg-accent-Danger text-white",
  };

  let breadcrumbData = [
    { name: "Home", href: "/" },
    {
      name: "Events",
      href: "/",
    },
    { name: "Booking", href: "/events/booking" },
  ];
  $: pageTitle = breadcrumbData[breadcrumbData.length - 1]?.name || "Default Title";

  const getTableColumns = (statusIcon, isPinnedOrDeclined = false) => {
    const styleMap = {
      Confirmed: { style: "bg-accent-success/15 text-accent-success", icon: icons.SuccessIcon },
      Invited: { style: "bg-BG-Tartiary text-Text-Tartiary", icon: icons.InvitedIcon },
      Pinned: { style: "bg-accent-Warning/15 text-accent-Warning", icon: icons.PinnedCircleIcon },
      Declined: { style: "bg-accent-Danger/15 text-accent-Danger", icon: icons.DeclinedIcon },
    };

    return [
      {
        key: "performer",
        title: "Performer",
        customRender: (performer) => `
          <div class="flex items-center gap-2 text-Text-Primary">
            <img src="${performer.image}" alt="${performer.title}" class="w-8 h-8 rounded" />
            <div class="flex flex-col">
              <span class="whitespace-nowrap sm:whitespace-normal overflow-hidden text-ellipsis max-w-[110px] block">${performer.title}</span>
              <span class="sm:hidden px-2 py-1 min-w-[100px] inline-block text-center rounded-md text-sm font-semibold uppercase ${isPinnedOrDeclined ? 'opacity-30' : ''} ${positionStyles[performer.position] || 'bg-gray-200 text-gray-500'}">
                ${performer.position}
              </span>
            </div>
          </div>
        `,
      },
      {
        key: "status",
        title: "Status",
        customRender: (status) => {
          const { style, icon } = styleMap[status] || { style: "bg-gray-100 text-gray-500", icon: icons.DefaultIcon };
          return `
            <span class="px-2 py-1 min-w-[100px] rounded-md inline-flex items-center gap-2 text-xs font-semibold justify-center ${style}">
              <img src="${icon}" alt="${status}" class="w-3 h-3" /> ${status}
            </span>
          `;
        },
      },
      {
        key: "position",
        title: "Position",
        customRender: (position) => {
          const positionStyles = {
            Host: "bg-stroke-Tartiary text-white",
            Guest: "bg-Hue-Teal text-white",
            Feature: "bg-accent-Infoblue text-white",
            Headliner: "bg-accent-Danger text-white",
          };
          const style = positionStyles[position] || "bg-gray-200 text-gray-500";
          return `
            <span class="px-2 py-1 min-w-[100px] inline-block text-center rounded-md text-sm font-semibold uppercase ${isPinnedOrDeclined ? 'opacity-30' : ''} ${style}">
              ${position}
            </span>
          `;
        },
      },
      {
        key: "set",
        title: "Set",
        customRender: (set) => {
          const { style, icon } = styleMap[set.status] || { style: "bg-gray-100 text-gray-500", icon: icons.DefaultIcon };
          return `
            <div class="flex flex-col items-end sm:items-start ${isPinnedOrDeclined ? 'opacity-30' : ''}">
              <span>${set.key}</span>
              <span class="px-2 py-1 mt-1 rounded-md inline-flex items-center gap-2 text-xs font-semibold ${style} sm:hidden">
                <img src="${icon}" alt="${set.status}" class="w-3 h-3" /> ${set.status}
              </span>
            </div>
          `;
        },
      },
      {
        key: "notes",
        title: "Notes",
        customRender: (notes) => `<span class="${isPinnedOrDeclined ? 'opacity-30' : ''}">${notes}</span>`,
      },
    ];
  };

  const tableStyles = {
    container: "w-full",
    thead: "text-[12px] text-gray-500 border-b border-gray-200 uppercase bg-gray-50",
    th: "px-4 py-4 cursor-normal",
    tr: "text-[14px] text-gray-500 font-normal leading-[21px]",
    td: "px-4 py-6",
  };

  const lineupData = [
    { performer: { image: pic1, title: "Dana Gould", position: "Host" }, status: "Confirmed", position: "Host", set: {key:"10", status:"Confirmed"}, notes: "Can I go up early?" },
    { performer: { image: pic2, title: "Natasha Pearl Hansen", position: "Guest" }, status: "Invited", position: "Guest", set: {key:"10", status:"Confirmed"}, notes: "Gonna be late" },
    { performer: { image: pic3, title: "Natasha Pearl", position: "Feature" }, status: "Confirmed", position: "Feature", set: {key:"10", status:"Confirmed"}, notes: "Gonna be late to the show" },
    { performer: { image: pic4, title: "Pearl Hansen and Her Very Long Name", position: "Invited" }, status: "Invited", position: "Headliner", set: {key:"10", status:"Confirmed"}, notes: "Gonna be late to the show" },
  ];

  const pinnedData = [{ performer: { image: pic1, title: "Dana Gould", position: "Host" }, status: "Pinned", position: "Host", set: {key:"10", status: "Pinned"}, notes: "Can I go up early?" }];

  const declinedData = [
    { performer: { image: pic1, title: "Dana Gould", position: "Host" }, status: "Declined", position: "Host", set: {key:"10", status: "Declined"}, notes: "Can I go up early?" },
    { performer: { image: pic2, title: "Natasha Pearl Hansen and Her Very Long Name", position: "Declined" }, status: "Declined", position: "Guest", set: {key:"10", status: "Declined"}, notes: "Can I go up early?" },
    { performer: { image: pic3, title: "Natasha Pearl", position: "Feature" }, status: "Declined", position: "Feature", set: {key:"20", status: "Declined"}, notes: "Can I go up early?" },
  ];

  const mobileView = ["status", "position", "notes"];

  const lineupColumns = getTableColumns();
  lineupColumns.forEach(column => {
    column.mobileView = mobileView;
  });

  // const pinnedColumns = getTableColumns(icons.PinnedCircleIcon, true);
  const pinnedColumns = getTableColumns();
  pinnedColumns.forEach(column => {
    column.mobileView = mobileView;
  });

  const declinedColumns = getTableColumns();
  declinedColumns.forEach(column => {
    column.mobileView = mobileView;
  });
</script>

<svelte:head>
    <title>Booking</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="w-full mt-5">
    <Breadcrumb data={breadcrumbData} />

    <div class="bg-white rounded-xl p-5 mx-5 mt-5 shadow-md">
        <PageTitle title={pageTitle} />

        <section class="mt-5">
            <SectionTitle title="Lineup" icon={UserIcon} actions={["Actions", "Edit", "Delete"]} />
            <Table columns={lineupColumns} data={lineupData} hasActions={true} isDraggable={true} styles={tableStyles} />
        </section>

        <section class="mt-5">
            <SectionTitle title="Pinned" icon={PinnedIcon} actions={["Actions", "Edit", "Delete"]} />
            <Table columns={pinnedColumns} data={pinnedData} hasActions={true} isDraggable={true} styles={tableStyles} />
        </section>

        <section class="mt-5">
            <SectionTitle title="Declined" icon={DiclinedIcon} actions={["Actions", "Edit", "Delete"]} />
            <Table columns={declinedColumns} data={declinedData} hasActions={true} isDraggable={true} styles={tableStyles} />
        </section>

        <section class="mt-5">
            <SectionTitle title="Roster" icon={RosterIcon} actions={["Actions", "Edit", "Delete"]} />
            <Table columns={lineupColumns} data={lineupData} hasActions={true} styles={tableStyles} />
        </section>
    </div>
</div>
