export const OrderTableColumn = [
  {
    key: "orderId",
    title: "ORDER ID",
    sortable: false,
    customRender: (value) => {
      return `<span class="text-brand-Primary font-medium">${value}</span>`;
    },
  },
  {
    key: "purchasedBy",
    title: "PURCHASED BY",
    customRender: (value) => {
      return `<div class="flex flex-col gap-1">
        <div class="text-sm text-gray-500 leading-[21px] font-normal">${value.name}</div>
        <span class="text-gray-400 text-[12px] leading-[18px]">${value.email}</span>
        </div>
        `;
    },
    sortable: false,
  },
  {
    key: "status",
    title: "STATUS",
    sortable: false,
    customRender: (value) => {
      if (value === "Completed") {
        return `<span class="inline-block px-2 text-[12px] leading-[18px] font-bold text-accent-success bg-accent-success/15 rounded-full">${value}</span>`;
      } else if (value === "Cancelled") {
        return `<span class="inline-block px-2 text-[12px] leading-[18px] font-bold text-accent-Danger bg-accent-Danger/15 rounded-full">${value}</span>`;
      } else if (value === "Refunded" || value === "Partially Refunded") {
        return `<span class="inline-block px-2 text-[12px] leading-[18px] font-bold text-accent-Warning bg-accent-Warning/15 rounded-full">${value}</span>`;
      }
    },
  },
  {
    key: "dateOfPurchase",
    title: "DATE OF PURCHASE",
    sortable: false,
    customRender: (value) => {
      return `<div class="text-gray-500 text-sm leading-[21px] font-normal">${value}</div>`;
    },
  },
  {
    key: "quantity",
    title: "QUANTITY",
    sortable: false,
    customRender: (value) => {
      return `<div class="text-gray-500 text-sm leading-[21px] font-normal">${value}</div>`;
    },
  },
  {
    key: "saleType",
    title: "SALE TYPE",
    sortable: false,
    customRender: (value) => {
      return `<span class="inline-block px-2 text-[12px] leading-[18px] font-bold text-accent-success bg-accent-success/15 rounded-full">${value}</span>`;
    },
  },
  {
    key: "total",
    title: "TOTAL",
    sortable: false,
    customRender: (value) => {
      return `<span class="text-green-500 text-sm leading-[21px] font-normal">${value}</span>`;
    },
  },
  {
    key: "note",
    title: "NOTE",
    sortable: false,
    customRender: (value) => {
      return `<div class="text-gray-500 text-sm leading-[21px] font-normal italic">${value}</div>`;
    },
  },
];
