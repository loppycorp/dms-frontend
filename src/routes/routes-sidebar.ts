const routes = [
  {
    path: "/system/profit-center",
    name: "Profit Center",
    routes: [
      {
        path: "/individual-processing",
        name: "Individual Processing",
      },
      // {
      //   path: "collective-processing",
      //   name: "Collective Processing",
      // },
      // {
      //   path: "standard-hierarchy",
      //   name: "Standard Hierarchy",
      // },
      // {
      //   path: "profit-center-group",
      //   name: "Profit Center Group",
      // },
    ],
  },
  {
    path: "/system/cost-center",
    name: "Cost Center",
    routes: [
      {
        path: "/individual-processing",
        name: "Individual Processing",
      },
      // {
      //   path: "collective-processing",
      //   name: "Collective Processing",
      // },
    ],
  },
  {
    path: "/system/cost-center-group",
    name: "Cost Center Group",
    routes: [
      {
        path: "/display",
        name: "Display",
      },
      // {
      //   path: "collective-processing",
      //   name: "Collective Processing",
      // },
    ],
  },
  {
    path: "/system/gl-accounts",
    name: "G/L Accounts",
    routes: [
      {
        path: "/centrally",
        name: "Centrally",
      },
      {
        path: "/in-chart-of-accounts",
        name: "In Chart of Accounts",
      },
      {
        path: "/in-company-code",
        name: "In Company Code",
      },
    ],
  },
  {
    path: "/system/gl-account-groups",
    name: "G/L Account Group",
    routes: [
      {
        path: "/display",
        name: "Display",
      },
    ],
  },
];

export default routes;
