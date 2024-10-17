export const sidebar_navigation: SidebarNavigationProps = {
  pregled: [
    {
      title: "Nadzorna plošča",
      imgUrl: "/icons/nadzorna_plosca.svg",
      url: "/",
    },
    {
      title: "Projekti",
      imgUrl: "/icons/projekti.svg",
      url: "/projekti",
    },
  ],
  procesi: [
    {
      title: "Osnutek",
      imgUrl: "/icons/osnutek.svg",
      url: "/osnutek",
    },
    {
      title: "Uredništvo",
      imgUrl: "/icons/urednistvo.svg",
      url: "/urednistvo",
    },
    // {
    //   title: "Oblikovanje",
    //   imgUrl: "/icons/oblikovanje.svg",
    //   url: "/oblikovanje",
    // },
    {
      title: "Priprava za tisk",
      imgUrl: "/icons/priprava_za_tisk.svg",
      url: "/priprava-za-tisk",
    },
    {
      title: "Tisk",
      imgUrl: "/icons/tisk.svg",
      url: "/tisk",
    },
    {
      title: "Dostava",
      imgUrl: "/icons/dostava.svg",
      url: "/dostava",
    },
    {
      title: "Arhiv",
      imgUrl: "/icons/arhiv.svg",
      url: "/arhiv",
    },
  ],
  casovni_okvir: [
    {
      title: "Koledar",
      imgUrl: "/icons/koledar.svg",
      url: "/koledar",
      children: ["dan", "teden", "mesec", "leto"],
    },
  ],
};

export const nav_details: NavDetailsProps = [
  {
    title: "Nadzorna plošča",
    imgUrl: "/icons/nadzorna_plosca.svg",
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
    title: "Uredništvo",
    imgUrl: "/icons/urednistvo.svg",
    url: "/urednistvo",
  },
  // {
  //   title: "Oblikovanje",
  //   imgUrl: "/icons/oblikovanje.svg",
  //   url: "/oblikovanje",
  // },
  {
    title: "Priprava za tisk",
    imgUrl: "/icons/priprava_za_tisk.svg",
    url: "/priprava-za-tisk",
  },
  {
    title: "Tisk",
    imgUrl: "/icons/tisk.svg",
    url: "/tisk",
  },
  {
    title: "Dostava",
    imgUrl: "/icons/dostava.svg",
    url: "/dostava",
  },
  {
    title: "Arhiv",
    imgUrl: "/icons/arhiv.svg",
    url: "/arhiv",
  },
  {
    title: "Dostop zavrnjen",
    imgUrl: "/icons/dostava.svg",
    url: "/unauthorized",
  },
  {
    title: "Koledar",
    imgUrl: "/icons/koledar.svg",
    url: "/koledar",
    children: ["dan", "teden", "mesec", "leto"],
  },
];

export const carouselProjectBgColors = [
  "rgba(76,94,188,0.7)",
  "rgba(203,81,81,0.7)",
  "rgba(224,176,105,0.7)",
];

export const carouselProjectUserColors = ["#95B37E", "#B099B4", "#BA908E"];

export const phases: PhasesProps = [
  {
    title: "Osnutek",
    slug: "osnutek",
  },
  {
    title: "Uredništvo",
    slug: "urednistvo",
  },
  // {
  //   title: "Oblikovanje",
  //   slug: "oblikovanje",
  // },
  {
    title: "Priprava za tisk",
    slug: "priprava-za-tisk",
  },
  {
    title: "Tisk",
    slug: "tisk",
  },
  {
    title: "Dostava",
    slug: "dostava",
  },
  {
    title: "Arhiv",
    slug: "arhiv",
  },
];
