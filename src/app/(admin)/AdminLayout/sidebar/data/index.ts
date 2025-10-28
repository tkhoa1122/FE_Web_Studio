import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "Overview",
            url: "/dashboard",
          },
        ],
      },
      {
        title: "Studios",
        url: "/studios",
        icon: Icons.FourCircle,
        items: [],
      },
      {
        title: "Bookings",
        icon: Icons.Calendar,
        items: [
          {
            title: "All Bookings",
            url: "/bookings",
          },
          {
            title: "Calendar",
            url: "/bookings/calendar",
          },
        ],
      },
      {
        title: "Users",
        url: "/users",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Staff",
        url: "/staff",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Categories",
        url: "/categories",
        icon: Icons.Alphabet,
        items: [],
      },
    ],
  },
  {
    label: "REPORTS & SETTINGS",
    items: [
      {
        title: "Reports",
        icon: Icons.PieChart,
        items: [
          {
            title: "Revenue",
            url: "/reports/revenue",
          },
          {
            title: "Usage",
            url: "/reports/usage",
          },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
    ],
  },
];
