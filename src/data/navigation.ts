export const systemMenus: MenuLinkItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "/nav-icons/home.svg",
    icon_active: "/nav-icons/home-active.svg",
    children: [],
  },
  {
    title: "Configuration",
    url: "/configuration",
    icon: "/nav-icons/configuration.svg",
    icon_active: "/nav-icons/configuration-active.svg",
    children: [
      {
        title: "Users",
        url: "/users",
        bullet_color: "#F29E53",
      },
      {
        title: "Drivers",
        url: "/drivers",
        bullet_color: "#EB5757",
      },
      {
        title: "Vehicles",
        url: "/vehicles",
        bullet_color: "#219653",
      },
      {
        title: "Assets",
        url: "/assets",
        bullet_color: "#2D9CDB",
      },
    ],
  },
];
