

export type SubChildren = {
  href: string;
  label: string;
  active: boolean;
  children?: SubChildren[];
};
export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
  id: string;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
  id: string;
};

export function getMenuList(pathname: string, t: any): Group[] {

  return [
    {
      groupLabel: t("dashboard"),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard-filling-station",
          label: t("dashboard"),
          active: pathname === "/dashboard-filling-station" || pathname === "/",
          icon: "heroicons-outline:home",
          submenus: [],
        },
      ],
    },
    // {
    //   groupLabel: "Operations",
    //   id: "operations",
    //   menus: [
    //     {
    //       id: "branches",
    //       href: "/dashboard-1/branches",
    //       label: "Branches",
    //       active: pathname.includes("/branches"),
    //       icon: "heroicons-outline:building-office",
    //       submenus: [],
    //     },
    //     {
    //       id: "staff",
    //       href: "/dashboard-1/staff",
    //       label: "Staff Management",
    //       active: pathname.includes("/staff"),
    //       icon: "heroicons-outline:users",
    //       submenus: [
    //         {
    //           href: "/dashboard-1/staff",
    //           label: "All Staff",
    //           active: pathname === "/dashboard-1/staff",
    //           icon: "heroicons-outline:users",
    //           children: [],
    //         },
    //         {
    //           href: "/dashboard-1/staff/add",
    //           label: "Add Staff",
    //           active: pathname === "/dashboard-1/staff/add",
    //           icon: "heroicons-outline:user-plus",
    //           children: [],
    //         },
    //         {
    //           href: "/dashboard-1/staff/assignments",
    //           label: "Staff Assignments",
    //           active: pathname === "/dashboard-1/staff/assignments",
    //           icon: "heroicons-outline:arrows-right-left",
    //           children: [],
    //         },
    //       ],
    //     },
    //     {
    //       id: "analytics",
    //       href: "/dashboard-1/analytics",
    //       label: "Analytics",
    //       active: pathname.includes("/analytics"),
    //       icon: "heroicons-outline:chart-bar",
    //       submenus: [],
    //     },
    //   ],
    // },
    {
      groupLabel: "Filling Station Management",
      id: "filling-station",
      menus: [
        // {
        //   id: "filling-station-overview",
        //   href: "/dashboard-filling-station",
        //   label: "Overview",
        //   active: pathname === "/dashboard-filling-station",
        //   icon: "heroicons-outline:chart-bar",
        //   submenus: [],
        // },
        {
          id: "stations",
          href: "/dashboard-filling-station/stations",
          label: "Stations",
          active: pathname.includes("/dashboard-filling-station/stations"),
          icon: "heroicons-outline:building-office",
          submenus: [],
        },
        {
          id: "branches",
          href: "/dashboard-filling-station/branches",
          label: "Branches",
          active: pathname.includes("/dashboard-filling-station/branches"),
          icon: "heroicons-outline:map-pin",
          submenus: [],
        },
        {
          id: "staff",
          href: "/dashboard-filling-station/staff",
          label: "Staff Management",
          active: pathname.includes("/dashboard-filling-station/staff"),
          icon: "heroicons-outline:users",
          submenus: [],
        },
        {
          id: "inventory",
          href: "/dashboard-filling-station/inventory",
          label: "Inventory",
          active: pathname.includes("/dashboard-filling-station/inventory"),
          icon: "heroicons-outline:cube",
          submenus: [],
        },
      ],
    },
  ];
}
export function getHorizontalMenuList(pathname: string, t: any): Group[] {
  return [
    {
      groupLabel: t("dashboard"),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard-1",
          label: t("dashboard"),
          active: pathname === "/dashboard-1" || pathname === "/",
          icon: "heroicons-outline:home",
          submenus:[],
        },
      ],
    },
    {
      groupLabel: "Operations",
      id: "operations",
      menus: [
        {
          id: "branches",
          href: "/dashboard-1/branches",
          label: "Branches",
          active: pathname.includes("/branches"),
          icon: "heroicons-outline:building-office",
          submenus:[],
        },
        {
          id: "staff",
          href: "/dashboard-1/staff",
          label: "Staff Management",
          active: pathname.includes("/staff"),
          icon: "heroicons-outline:users",
          submenus:[],
        },
        {
          id: "analytics",
          href: "/dashboard-1/analytics",
          label: "Analytics",
          active: pathname.includes("/analytics"),
          icon: "heroicons-outline:chart-bar",
          submenus:[],
        },
      ],
    },
    {
      groupLabel: "Filling Station Management",
      id: "filling-station",
      menus: [
        {
          id: "filling-station-overview",
          href: "/dashboard-filling-station",
          label: "Overview",
          active: pathname === "/dashboard-filling-station",
          icon: "heroicons-outline:chart-bar",
          submenus: [],
        },
        {
          id: "stations",
          href: "/dashboard-filling-station/stations",
          label: "Stations",
          active: pathname.includes("/dashboard-filling-station/stations"),
          icon: "heroicons-outline:building-office",
          submenus: [],
        },
        {
          id: "branches",
          href: "/dashboard-filling-station/branches",
          label: "Branches",
          active: pathname.includes("/dashboard-filling-station/branches"),
          icon: "heroicons-outline:map-pin",
          submenus: [],
        },
        {
          id: "staff",
          href: "/dashboard-filling-station/staff",
          label: "Staff Management",
          active: pathname.includes("/dashboard-filling-station/staff"),
          icon: "heroicons-outline:users",
          submenus: [],
        },
        {
          id: "inventory",
          href: "/dashboard-filling-station/inventory",
          label: "Inventory",
          active: pathname.includes("/dashboard-filling-station/inventory"),
          icon: "heroicons-outline:cube",
          submenus: [],
        },
      ],
    },
  ];
}