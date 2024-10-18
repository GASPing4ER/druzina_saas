/* eslint-disable no-unused-vars */

declare type TPhases =
  | "osnutek"
  | "urednistvo"
  // | "oblikovanje"
  | "priprava-za-tisk"
  | "tisk"
  | "dostava"
  | "arhiv";

declare type TDepartment =
  | "urednistvo"
  | "priprava-za-tisk"
  | "tisk"
  | "dostava";

declare type TStatus = "v pripravi" | "v teku" | "zaključeno";

declare type TNapredek = 0 | 1 | 2 | 3 | 4;

declare type TTaskStatus = "assigned" | "done" | "checked" | "completed";

declare type TTaskPriority = "nizka" | "normalna" | "visoka";

declare type TType = "družina" | "revija" | "knjiga" | "drugo";

declare type TRole = "member" | "admin" | "superadmin";

// TODO: Type for types of projects -> časopis, knjiga etc.

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
  department?: string;
  role?: string;
};

declare type NavDetailsProps = SidebarNavigationItemProps[];

declare type ProjectProps = {
  id: string;
  name: string;
  author: string;
  current_phase: TPhases;
  type: TType;
  creatorId: string;
  creator_name: string;
  start_date: string;
  end_date: string;
  status: TStatus;
  napredek: TNapredek;
  quantity: number;
  stanje: number;
  created_at: string;
};

declare type completeDataProps =
  | {
      current_phase: string;
      napredek: number;
      status: string;
      stanje: number;
      creatorId: string;
      creator_name: string;
      end_date: Date;
      type: TType;
      name: string;
      author: string;
      quantity: string;
      start_date: Date;
    }
  | undefined;

declare type updatedDataProps =
  | {
      current_phase: TPhases;
      napredek: number;
      status: string;
      stanje: number;
    }
  | undefined;

declare type ProjectsProps = ProjectProps[];

declare type UserProps = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  department: TDepartment;
  role: TRole; // TODO: ENUM,
  created_at?: string;
};

declare type LoginUserProps = {
  email: string;
  password: string;
};

declare type NewUserDataProps = {
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  department: TDepartment;
  role: TRole;
};

declare type PhaseProps = {
  title: string;
  slug: string;
};

declare type TaskProps = {
  id: string;
  employee_id: string;
  project_id: string;
  assigner_id: string;
  name: string;
  description: string;
  priority: TTaskPriority;
  start_date: string;
  end_date: string;
  status: TTaskStatus;
  created_at: string;
};

declare type TaskWithNamesProps = {
  id: string;
  employee_id: string;
  employee: {
    first_name: string;
    last_name: string;
  };
  project_id: string;
  assigner_id: string;
  assigner: {
    first_name: string;
    last_name: string;
  };
  name: string;
  description: string;
  priority: TTaskPriority;
  start_date: string;
  end_date: string;
  status: TTaskStatus;
  created_at: string;
};

declare type NewTaskDataProps = {
  employee_id: string;
  project_id: string;
  assigner_id: string;
  name: string;
  description: string;
  priority: TTaskPriority;
  start_date: Date;
  end_date: Date;
  status: TTaskStatus;
};

declare type FileProps = {
  id: string;
  project_id: string;
  name: string;
  description: string;
  link: string;
  created_at: string;
};

declare type NewFileDataProps = {
  project_id: string;
  name: string;
  description: string;
  link: string;
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

declare type ProjectDetailsProps = {
  project: ProjectProps;
};

declare type UtilityBoxProps =
  | {
      type: "naloge";
      data: TaskWithNamesProps[] | null;
      projectId: string;
      role: string;
    }
  | {
      type: "datoteke";
      data: FileProps[] | null;
      projectId: string;
      role: string;
    }
  | {
      type: "opombe";
      data: [] | null;
      projectId: string;
      role: string;
    };
