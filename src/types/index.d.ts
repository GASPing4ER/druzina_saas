/* eslint-disable no-unused-vars */

declare type SidebarNavigationItemProps = {
  title: string;
  imgUrl: string;
  url: string;
  children?: string[];
};

declare type SidebarNavigationProps = {
  pregled: SidebarNavigationItemProps[];
  procesi: SidebarNavigationItemProps[];
  casovni_okvir: SidebarNavigationItemProps[];
};

declare type SidebarNavProps = {
  title: string;
  navigation: SidebarNavigationItemProps[];
};

declare type NavDetailsProps = SidebarNavigationItemProps[];
