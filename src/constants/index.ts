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
          title: "Družina",
          imgUrl: "/icons/druzina.svg",
          url: "/urednistvo?type=druzina",
        },
        {
          title: "Revije",
          imgUrl: "/icons/revija.svg",
          url: "/urednistvo?type=revija",
        },
        {
          title: "Knjige",
          imgUrl: "/icons/knjiga.svg",
          url: "/urednistvo?type=knjiga",
        },
      ],
    },
    {
      title: "Tehnika (grafika in tisk)",
      imgUrl: "/icons/tehnika.svg",
      url: "/tehnika",
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
      title: "Prevzem",
      imgUrl: "/icons/prevzem.svg",
      url: "/prevzem",
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
    title: "Prevzem",
    imgUrl: "/icons/prevzem.svg",
    url: "/prevzem",
  },
  {
    title: "Arhiv",
    imgUrl: "/icons/arhiv.svg",
    url: "/arhiv",
  },
  {
    title: "Dostop zavrnjen",
    imgUrl: "/icons/prevzem.svg",
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
    title: "Prevzem",
    slug: "prevzem",
  },
  {
    title: "Arhiv",
    slug: "arhiv",
  },
];

export const taskPriority: TTaskPriority[] = ["nizka", "normalna", "visoka"];

export const projectTypes: TType[] = ["družina", "revija", "knjiga", "drugo"];

export const roleTypes: TRole[] = ["member", "admin", "superadmin"];

export const departmentTypes: TDepartment[] = [
  "urednistvo",
  "priprava-in-oblikovanje",
  "tisk",
  "prevzem",
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
    title: "Prevzem",
    imgUrl: "/icons/prevzem.svg",
    url: "prevzem",
  },
];
