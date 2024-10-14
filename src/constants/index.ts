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
      title: "Uredništvo",
      imgUrl: "/icons/urednistvo.svg",
      url: "/urednistvo",
    },
    {
      title: "Oblikovanje",
      imgUrl: "/icons/oblikovanje.svg",
      url: "/oblikovanje",
    },
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
    title: "Projekti",
    imgUrl: "/icons/projekti.svg",
    url: "/projekti",
  },
  {
    title: "Uredništvo",
    imgUrl: "/icons/urednistvo.svg",
    url: "/urednistvo",
  },
  {
    title: "Oblikovanje",
    imgUrl: "/icons/oblikovanje.svg",
    url: "/oblikovanje",
  },
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
    title: "Koledar",
    imgUrl: "/icons/koledar.svg",
    url: "/koledar",
    children: ["dan", "teden", "mesec", "leto"],
  },
];

// 00239b2c-bcc0-41be-84c1-9d8a43bd980b

export const projectsDummyData = [
  {
    id: "1",
    name: "Bič sem buli",
    avtor: "John Doe",
    trenutna_faza: "oblikovanje",
    vrsta: "knjiga",
    vodja_projekta: "user_2nFp6K3ysHhkdT8sjjFO9rRV4xf",
    start_date: "24.09.2024",
    end_date: "10.10.2024",
    status: "v teku",
    napredek: 2,
    stanje: 24,
  },
  {
    id: "2",
    name: "Družina, št.42",
    avtor: "John Doe",
    trenutna_faza: "urednistvo",
    vrsta: "Časopis",
    vodja_projekta: "user_2nFp6K3ysHhkdT8sjjFO9rRV4xf",
    start_date: "26.09.2024",
    end_date: "12.10.2024",
    status: "v teku",
    napredek: 1,
    stanje: 18,
  },
  {
    id: "3",
    name: "Hildegardino zdravilstvo",
    avtor: "John Doe",
    trenutna_faza: "tisk",
    vrsta: "Knjiga",
    vodja_projekta: "user_2nFp6K3ysHhkdT8sjjFO9rRV4xf",
    start_date: "30.09.2024",
    end_date: "18.10.2024",
    status: "v pripravi",
    napredek: 4,
    stanje: 67,
  },
  {
    id: "4",
    name: "365 dni",
    avtor: "John Doe",
    trenutna_faza: "priprava za tisk",
    vrsta: "knjiga",
    vodja_projekta: "user_2nFp6K3ysHhkdT8sjjFO9rRV4xf",
    start_date: "10.09.2024",
    end_date: "1.10.2024",
    status: "v teku",
    napredek: 3,
    stanje: 48,
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
    title: "Uredništvo",
    slug: "uredništvo",
  },
  {
    title: "Oblikovanje",
    slug: "oblikovanje",
  },
  {
    title: "Priprava za tisk",
    slug: "priprava za tisk",
  },
  {
    title: "Tisk",
    slug: "tisk",
  },
  {
    title: "Dostava",
    slug: "dostava",
  },
];
