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

declare type ProjectProps = {
  id: string;
  name: string;
  author: string;
  current_phase: string;
  type: string;
  creatorId: string;
  creator_name: string;
  customer: string;
  start_date: string;
  end_date: string;
  status: string;
  napredek: number;
  quantity: number;
  stanje: number;
  created_at: string;
};

declare type ProjectsProps = ProjectProps[];

declare type UserProps = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  department: string | null; // TODO: ENUM,
  role: string; // TODO: ENUM,
  created_at: string;
};

declare type PhaseProps = {
  title: string;
  slug: string;
};

declare type PhasesProps = PhaseProps[];

// COMPONENTS

declare type ProjectsCarouselProps = {
  projects: ProjectsProps;
};

declare type DashboardProjectsDisplayProps = {
  projects: ProjectsProps;
};

declare type DashboardProjectsFilterProps = {
  onHandlePhase: (chosenPhase: string) => void;
};

declare type DashboardProjectsProps = {
  projects: ProjectsProps;
};

declare type ProgressBarProps = {
  stanje: number;
};

declare type ProjectsTableProps = {
  projects: ProjectsProps;
  phase?: string;
};
