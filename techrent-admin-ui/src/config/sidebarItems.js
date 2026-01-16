// src/config/sidebarItems.js
export const sidebarItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "🏠",
    path: "/",
  },
  {
    key: "categories",
    label: "Categories",
    icon: "📂",
    path: "/categories",
  },
  {
    key: "users",
    label: "Users",
    icon: "👥",
    path: "/users",
  },
  {
    key: "pricing",
    label: "Pricing",
    icon: "💰",
    children: [
      {
        key: "coin-price",
        label: "Per Coin Price",
        path: "/pricing/coin",
      },
      {
        key: "packages",
        label: "Packages",
        path: "/pricing/packages",
      },
    ],
  },
  {
    key: "others",
    label: "Others",
    icon: "🧩",
    children: [
      {
        key: "shifting-contact",
        label: "Shifting Contact",
        path: "/others/shifting-contact",
      },
    ],
  },
];
