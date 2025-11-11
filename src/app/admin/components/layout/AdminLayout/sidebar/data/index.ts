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
            url: "/admin/dashboard",
          },
        ],
      },
      {
        title: "Studios",
        url: "/admin/studios",
        icon: Icons.FourCircle,
        items: [],
      },
      {
        title: "Bookings",
        icon: Icons.Calendar,
        items: [
          {
            title: "All Bookings",
            url: "/admin/bookings",
          },
          {
            title: "Calendar",
            url: "/admin/bookings/calendar",
          },
        ],
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Staff",
        url: "/admin/staff",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Categories",
        url: "/admin/categories",
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
            url: "/admin/reports/revenue",
          },
          {
            title: "Usage",
            url: "/admin/reports/usage",
          },
        ],
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Profile",
        url: "/admin/profile",
        icon: Icons.User,
        items: [],
      },
    ],
  },
];
