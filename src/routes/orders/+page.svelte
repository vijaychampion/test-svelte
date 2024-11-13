<script>
  import { onMount } from "svelte";
  import { OrderTableColumn } from "./data";
  import { convertToDate } from "../../utils/utils";
  import Table from "../../components/Table/Table.svelte";
  import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.svelte";
  import StatsCard from "../../components/Stats/StatsCard.svelte";
  import SearchIcon from "../../assets/svg/public-search.svg";
  import FilterIcon from "../../assets/svg/filter.svg";
  import ExportIcon from "../../assets/svg/file-export.svg";
  import DownArrowIcon from "../../assets/svg/arrow-down.svg";
  import CartIcon from "../../assets/svg/cart-plus.svg";
  import Button from "../../components/Button/Button.svelte";

  let stats = [];
  let tableData = [];
  let loading = true;

  async function loadOrders() {
    try {
      const response = await fetch("./api/orders");
      const data = await response.json();

      stats = data.orders.map((order) => ({
        name: order.name,
        value: order.value,
        icon: order.icon,
      }));

      tableData = data.tableData.map((item) => ({
        id: item.id,
        orderId: item.orderId,
        purchasedBy: item.purchasedBy,
        email: item.email,
        status: item.status,
        dateOfPurchase: convertToDate(item.dateOfPurchase),
        quantity: item.quantity,
        saleType: item.saleType,
        total: item.total,
        note: item.note,
      }));

      loading = false;
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  }
  
  function rowsSelect(event) {
    const { detail: selectedRows } = event;
    console.log("Selected Rows:", selectedRows);
  }

  onMount(() => {
    loadOrders();
  });

  let breadcrumbData = [
    { name: "Home", href: "/" },
    {
      name: "The Friday Night Comedy Show",
      href: "/shows/friday-night-comedy",
    },
    { name: "Orders", href: "/shows/friday-night-comedy/orders" },
  ];
</script>

<div class="w-full mx-auto px-4 bg-BG-Secondary">
  <nav class="py-4">
    <Breadcrumb data={breadcrumbData} />
  </nav>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <StatsCard {stats} />
  </div>

  <div class="w-full py-6">
    <section class="bg-white custom-shadow rounded-[16px] p-6">
      <div class="flex items-center justify-between">
        <div class="w-full">
          <h5 class="text-[20px]">Orders</h5>
        </div>
        <div class="w-full flex justify-end gap-2">
          <div class="relative w-full sm:w-1/2 md:w-2/5">
            <img
              class="w-5 h-5 absolute top-2.5 left-[12px]"
              src={SearchIcon}
              alt="Search"
            />
            <input
              type="search"
              class="pl-10 rounded-lg bg-BG-Secondary border border-stroke-Primary w-full focus:outline-none focus:ring-0"
              placeholder="Search"
            />
          </div>

          <Button strokebtn beforeIcon={FilterIcon}>Filters</Button>
          <Button strokebtn beforeIcon={ExportIcon}>Export</Button>
        </div>
      </div>
      <div class="w-full flex items-center justify-end gap-2 mt-10">
        <Button strokebtn afterIcon={DownArrowIcon}>Actions</Button>
        <Button beforeIcon={CartIcon}>Create new order</Button>
      </div>
      <div
        class="bg-BG-Secondary w-full rounded-[16px] mt-5 flex items-center justify-center"
      >
        {#if loading}
          <p>Loading orders...</p>
        {:else}
          <Table
            columns={OrderTableColumn}
            showTableHead={true}
            on:rowsSelect={rowsSelect}
            data={tableData}
            bordered={false}
            isRounded={false}
            searchable={false}
            styles={{
              container: "w-full",
              thead:
                "text-[12px] text-gray-500 border-b border-gray-200 uppercase bg-gray-50",
              th: "px-4 py-4 cursor-normal",
              tr: "text-[14px] text-gray-500 font-normal leading-[21px]",
              td: "px-4 py-6",
            }}
            hasCheckBox={true}
            keyField="id"
            hasActions={true}
          />
        {/if}
      </div>
    </section>
  </div>
</div>

<style>
  .custom-shadow {
    box-shadow:
      0px 1px 3px 0px rgba(0, 0, 0, 0.1),
      0px 1px 2px -1px rgba(0, 0, 0, 0.1);
  }
</style>
