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
    },
  ],
  procesi: [
    {
      title: "Uredništvo",
      imgUrl: "/icons/urednistvo.svg",
      url: "/urednistvo",
      children: [
        {
          title: "Tednik Družina",
          imgUrl: "/icons/druzina.svg",
          url: "/urednistvo?type=druzina",
        },
        {
          title: "Revijalni program",
          imgUrl: "/icons/revija.svg",
          url: "/urednistvo?type=revija",
        },
        {
          title: "Knjižno uredništvo",
          imgUrl: "/icons/knjiga.svg",
          url: "/urednistvo?type=knjiga",
        },
      ],
    },
    {
      title: "Priprava in tisk",
      imgUrl: "/icons/tehnika.svg",
      url: "#",
      children: [
        {
          title: "Priprava in oblikovanje",
          imgUrl: "/icons/priprava-in-oblikovanje.svg",
          url: "/priprava-in-oblikovanje",
        },
        {
          title: "Tisk",
          imgUrl: "/icons/tisk.svg",
          url: "/tisk",
          children: [
            {
              title: "Notranji",
              url: "/tisk?type=notranji",
            },
            {
              title: "Dtisk",
              url: "/tisk?type=dtisk",
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
      children: [
        {
          title: "Distribucija",
          imgUrl: "/icons/distribucija.svg",
          url: "/distribucija",
        },
      ],
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
