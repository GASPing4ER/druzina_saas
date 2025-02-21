import {
  PhaseProps,
  SidebarNavigationItemProps,
  TDepartment,
  TRole,
  TTaskPriority,
  TType,
} from "@/types";

type SidebarNavigationProps = {
  pregled: SidebarNavigationItemProps[];
  procesi: SidebarNavigationItemProps[];
};

export const sidebar_navigation: SidebarNavigationProps = {
  pregled: [
    {
      title: "Nadzorna plošča",
      imgUrl: "/icons/nadzorna-plosca.svg",
      url: "/",
    },
    {
      title: "Projekti",
      imgUrl: "/icons/projekti.svg",
      url: "/projekti",
    },
    {
      title: "Statistika",
      imgUrl: "/icons/statistika.svg",
      url: "/statistika",
      access_group: "superadmin",
    },
  ],
  procesi: [
    {
      title: "Uredništvo",
      imgUrl: "/icons/urednistvo.svg",
      url: "/urednistvo",
      access_group: "urednistvo",
      children: [
        {
          title: "Tednik Družina",
          imgUrl: "/icons/druzina.svg",
          url: "/urednistvo?type=tednik",
          access_group: "urednistvo",
        },
        {
          title: "Revijalni program",
          imgUrl: "/icons/revija.svg",
          url: "/urednistvo?type=publikacije",
          access_group: "urednistvo",
        },
        {
          title: "Knjižno uredništvo",
          imgUrl: "/icons/knjiga.svg",
          url: "/urednistvo?type=knjiga",
          access_group: "urednistvo",
        },
      ],
    },
    {
      title: "Priprava in tisk",
      imgUrl: "/icons/tehnika.svg",
      url: "#",
      access_group: "priprava-in-tisk",
      children: [
        {
          title: "Priprava in oblikovanje",
          imgUrl: "/icons/priprava-in-oblikovanje.svg",
          url: "/priprava-in-oblikovanje",
          access_group: "priprava-in-oblikovanje",
        },
        {
          title: "Tisk",
          imgUrl: "/icons/tisk.svg",
          url: "/tisk",
          access_group: "tisk",
          children: [
            {
              title: "Notranji",
              url: "/tisk?type=notranji",
            },
            {
              title: "Dtisk",
              url: "/tisk?type=d-tisk",
            },
            {
              title: "Zunanji",
              url: "/tisk?type=zunanji",
            },
          ],
        },
      ],
    },
    {
      title: "Komerciala",
      imgUrl: "/icons/distribucija.svg",
      url: "#",
      access_group: "distribucija",
      children: [
        {
          title: "Distribucija",
          imgUrl: "/icons/distribucija.svg",
          url: "/distribucija",
        },
      ],
    },
    {
      title: "Arhiv",
      imgUrl: "/icons/arhiv.svg",
      url: "/arhiv",
      access_group: "superadmin",
    },
  ],
};

type NavDetailsProps = SidebarNavigationItemProps[];

export const nav_details: NavDetailsProps = [
  {
    title: "Nadzorna plošča",
    imgUrl: "/icons/nadzorna-plosca.svg",
    url: "/",
  },
  {
    title: "Osnutek",
    imgUrl: "/icons/osnutek.svg",
    url: "/osnutek",
  },
  {
    title: "Projekti",
    imgUrl: "/icons/projekti.svg",
    url: "/projekti",
  },
  {
    title: "Statistika",
    imgUrl: "/icons/statistika.svg",
    url: "/statistika",
  },
  {
    title: "Uredništvo",
    imgUrl: "/icons/urednistvo.svg",
    url: "/urednistvo",
  },
  {
    title: "Priprava in oblikovanje",
    imgUrl: "/icons/priprava-in-oblikovanje.svg",
    url: "/priprava-in-oblikovanje",
  },
  {
    title: "Tisk",
    imgUrl: "/icons/tisk.svg",
    url: "/tisk",
  },
  {
    title: "Distribucija",
    imgUrl: "/icons/distribucija.svg",
    url: "/distribucija",
  },
  {
    title: "Arhiv",
    imgUrl: "/icons/arhiv.svg",
    url: "/arhiv",
  },
  {
    title: "Dostop zavrnjen",
    imgUrl: "/icons/distribucija.svg",
    url: "/unauthorized",
  },
];

export const carouselProjectBgColors = [
  "rgba(76,94,188,0.7)",
  "rgba(203,81,81,0.7)",
  "rgba(224,176,105,0.7)",
];

export const carouselProjectUserColors = ["#95B37E", "#B099B4", "#BA908E"];

type PhasesProps = PhaseProps[];

export const phases: PhasesProps = [
  {
    title: "Osnutek",
    slug: "osnutek",
  },
  {
    title: "Uredništvo",
    slug: "urednistvo",
  },
  {
    title: "Priprava in oblikovanje",
    slug: "priprava-in-oblikovanje",
  },
  {
    title: "Tisk",
    slug: "tisk",
  },
  {
    title: "Distribucija",
    slug: "distribucija",
  },
  {
    title: "Arhiv",
    slug: "arhiv",
  },
];

export const taskPriority: TTaskPriority[] = ["nizka", "normalna", "visoka"];

export const projectTypes: TType[] = [
  "publikacije",
  "tednik",
  "knjiga",
  "drugo",
];

export const roleTypes: TRole[] = ["member", "admin", "superadmin"];

export const departmentTypes: TDepartment[] = [
  "urednistvo",
  "priprava-in-oblikovanje",
  "tisk",
  "distribucija",
];

export const project_phases: NavDetailsProps = [
  {
    title: "Uredništvo",
    imgUrl: "/icons/urednistvo.svg",
    url: "urednistvo",
  },
  {
    title: "Priprava in oblikovanje",
    imgUrl: "/icons/priprava-in-oblikovanje.svg",
    url: "priprava-in-oblikovanje",
  },
  {
    title: "Tisk",
    imgUrl: "/icons/tisk.svg",
    url: "tisk",
  },
  {
    title: "Distribucija",
    imgUrl: "/icons/distribucija.svg",
    url: "distribucija",
  },
];
