export const sidebar_navigation: SidebarNavigationProps = {
  pregled: [
    {
      title: "Nadzorna plošča",
      imgUrl: "/icons/nadzorna_plosca.svg",
    },
    {
      title: "Projekti",
      imgUrl: "/icons/projekti.svg",
    },
  ],
  procesi: [
    {
      title: "Uredništvo",
      imgUrl: "/icons/urednistvo.svg",
    },
    {
      title: "Oblikovanje",
      imgUrl: "/icons/oblikovanje.svg",
    },
    {
      title: "Priprava za tisk",
      imgUrl: "/icons/priprava_za_tisk.svg",
    },
    {
      title: "Tisk",
      imgUrl: "/icons/tisk.svg",
    },
    {
      title: "Dostava",
      imgUrl: "/icons/dostava.svg",
    },
  ],
  casovni_okvir: [
    {
      title: "Koledar",
      imgUrl: "/icons/koledar.svg",
      children: ["dan", "teden", "mesec", "leto"],
    },
  ],
};
