// ENUM TYPES
export type TPhases =
  | "osnutek"
  | "urednistvo"
  | "priprava-za-tisk"
  | "tisk"
  | "dostava"
  | "arhiv";

export type TType = "družina" | "revija" | "knjiga" | "drugo";

export type TStatus = "v pripravi" | "v teku" | "zaključeno";

export type TNapredek = 0 | 1 | 2 | 3 | 4;

export type TDepartment =
  | "urednistvo"
  | "priprava-za-tisk"
  | "tisk"
  | "dostava";

export type TRole = "member" | "admin" | "superadmin";

export type TTaskStatus = "assigned" | "done" | "checked" | "completed";

export type TTaskPriority = "nizka" | "normalna" | "visoka";

// PROJECT TYPES

export type ProjectProps = {
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

export type NewProjectDataProps =
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

export type UpdatedProjectDataProps =
  | {
      current_phase: TPhases;
      napredek: number;
      status: string;
      stanje: number;
    }
  | undefined;

export type ProjectsProps = ProjectProps[];

// FILE TYPES

export type FileProps = {
  id: string;
  project_id: string;
  name: string;
  description: string;
  link: string;
  created_at: string;
};

export type NewFileDataProps = {
  project_id: string;
  name: string;
  description: string;
  link: string;
};

// USER TYPES

export type UserProps = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  department: TDepartment;
  role: TRole; // TODO: ENUM,
  created_at?: string;
};

export type NewUserDataProps = {
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  department: TDepartment;
  role: TRole;
};

export type LoginUserProps = {
  email: string;
  password: string;
};

// TASK TYPES

export type TaskProps = {
  id: string;
  employee_id: string;
  project_id: string;
  assigner_id: string;
  name: string;
  description: string;
  priority: TTaskPriority;
  start_date: Date;
  end_date: Date;
  status: TTaskStatus;
  created_at: string;
};

export type NewTaskDataProps = {
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

export type TaskWithNamesProps = {
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
  start_date: Date;
  end_date: Date;
  status: TTaskStatus;
  created_at: string;
};

// PHASE TYPES

export type PhaseProps = {
  title: string;
  slug: string;
};

// SIDEBAR NAVIGATION

export type SidebarNavigationItemProps = {
  title: string;
  imgUrl: string;
  url: string;
  children?: string[];
};
