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
  start_date: Date;
  end_date: Date;
  status: TStatus;
  napredek: TNapredek;
  quantity: number;
  stanje: number;
  created_at: Date;
};

export type NewProjectDataProps = Omit<ProjectProps, "id" | "created_at">;

export type UpdatedProjectDataProps =
  | {
      current_phase: TPhases;
      napredek: TNapredek;
      status: TStatus;
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
  created_at: Date;
};

export type NewFileDataProps = Omit<FileProps, "id" | "created_at">;

// USER TYPES

export type UserProps = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  department: TDepartment;
  role: TRole; // TODO: ENUM,
  created_at?: Date;
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
  created_at: Date;
};

export type NewTaskDataProps = Omit<TaskProps, "id" | "created_at">;

export type TaskWithNamesProps = TaskProps & {
  employee: {
    first_name: string;
    last_name: string;
  };
  assigner: {
    first_name: string;
    last_name: string;
  };
};

// PHASE TYPES

export type PhaseProps = {
  title: string;
  slug: string;
};

export type NewPhaseProps = {
  id: string;
  project_id: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
};

// SIDEBAR NAVIGATION

export type SidebarNavigationItemProps = {
  title: string;
  imgUrl: string;
  url: string;
  children?: string[];
};
