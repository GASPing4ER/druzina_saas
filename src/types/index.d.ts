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

declare type ProductProps = {
  id: string;
  naziv: string;
  avtor: string;
  trenutna_faza: string;
  vrsta: string;
  vodja_projekta: string;
  start_date: string;
  end_date: string;
  status: string;
  napredek: number;
  stanje: number;
};

declare type ProductsProps = ProductProps[];

declare type UserProps = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  department: string | null; // TODO: ENUM,
  role: string; // TODO: ENUM,
  created_at: string;
};

// COMPONENTS

declare type ProjectsCarouselProps = {
  projects: ProductsProps;
};

declare type DashboardProjectsDisplayProps = {
  projects: ProductsProps;
};

declare type DashboardProjectsProps = {
  projects: ProductsProps;
};

declare type ProgressBarProps = {
  stanje: number;
};
