

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
          active: pathname === "/",
          icon: "heroicons-outline:home",
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Operations",
      id: "operations",
      menus: [
        {
          id: "branches",
          href: "/branches",
          label: "Branches",
          active: pathname.includes("/branches"),
          icon: "heroicons-outline:building-office",
          submenus: [],
        },
        {
          id: "staff",
          href: "/staff",
          label: "Staff Management",
          active: pathname.includes("/staff"),
          icon: "heroicons-outline:users",
          submenus: [
            {
              href: "/staff",
              label: "All Staff",
              active: pathname === "/staff",
              icon: "heroicons-outline:users",
              children: [],
            },
            {
              href: "/staff/add",
              label: "Add Staff",
              active: pathname === "/staff/add",
              icon: "heroicons-outline:user-plus",
              children: [],
            },
            {
              href: "/staff/assignments",
              label: "Staff Assignments",
              active: pathname === "/staff/assignments",
              icon: "heroicons-outline:arrows-right-left",
              children: [],
            },
          ],
        },
        {
          id: "analytics",
          href: "/analytics",
          label: "Analytics",
          active: pathname.includes("/analytics"),
          icon: "heroicons-outline:chart-bar",
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
          active: pathname === "/",
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
          href: "/branches",
          label: "Branches",
          active: pathname.includes("/branches"),
          icon: "heroicons-outline:building-office",
          submenus:[],
        },
        {
          id: "staff",
          href: "/staff",
          label: "Staff Management",
          active: pathname.includes("/staff"),
          icon: "heroicons-outline:users",
          submenus:[],
        },
        {
          id: "analytics",
          href: "/analytics",
          label: "Analytics",
          active: pathname.includes("/analytics"),
          icon: "heroicons-outline:chart-bar",
          submenus:[],
        },
      ],
    },

    
  ];
}