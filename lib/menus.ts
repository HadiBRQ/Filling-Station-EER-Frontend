

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
          href: "/",
          label: t("dashboard"),
          active: pathname.includes("/"),
          icon: "heroicons-outline:home",
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Filling Station Management",
      id: "filling-station",
      menus: [
        {
          id: "filling-station-overview",
          href: "/filling-station",
          label: "Overview",
          active: pathname === "/filling-station",
          icon: "heroicons-outline:chart-bar",
          submenus: [],
        },
        {
          id: "stations",
          href: "/filling-station/stations",
          label: "Stations",
          active: pathname.includes("/filling-station/stations"),
          icon: "heroicons-outline:building-office",
          submenus: [],
        },
        {
          id: "branches",
          href: "/filling-station/branches",
          label: "Branches",
          active: pathname.includes("/filling-station/branches"),
          icon: "heroicons-outline:map-pin",
          submenus: [],
        },
        {
          id: "staff",
          href: "/filling-station/staff",
          label: "Staff Management",
          active: pathname.includes("/filling-station/staff"),
          icon: "heroicons-outline:users",
          submenus: [],
        },
        {
          id: "inventory",
          href: "/filling-station/inventory",
          label: "Inventory",
          active: pathname.includes("/filling-station/inventory"),
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
          href: "/",
          label: t("dashboard"),
          active: pathname.includes("/"),
          icon: "heroicons-outline:home",
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
          href: "/filling-station",
          label: "Overview",
          active: pathname === "/filling-station",
          icon: "heroicons-outline:chart-bar",
          submenus: [],
        },
        {
          id: "stations",
          href: "/filling-station/stations",
          label: "Stations",
          active: pathname.includes("/filling-station/stations"),
          icon: "heroicons-outline:building-office",
          submenus: [],
        },
        {
          id: "branches",
          href: "/filling-station/branches",
          label: "Branches",
          active: pathname.includes("/filling-station/branches"),
          icon: "heroicons-outline:map-pin",
          submenus: [],
        },
        {
          id: "staff",
          href: "/filling-station/staff",
          label: "Staff Management",
          active: pathname.includes("/filling-station/staff"),
          icon: "heroicons-outline:users",
          submenus: [],
        },
        {
          id: "inventory",
          href: "/filling-station/inventory",
          label: "Inventory",
          active: pathname.includes("/filling-station/inventory"),
          icon: "heroicons-outline:cube",
          submenus: [],
        },
      ],
    },
  ];
}