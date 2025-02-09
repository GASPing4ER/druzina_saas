// ENUM TYPES
export type TPhases =
  | "osnutek"
  | "urednistvo"
  | "priprava-in-oblikovanje"
  | "tisk"
  | "distribucija"
  | "arhiv";

export type TType = "publikacije" | "tednik" | "knjiga" | "drugo";

export type TStatus = "v čakanju" | "v pripravi" | "v teku" | "zaključeno";

export type TNapredek = 0 | 1 | 2 | 3 | 4;

export type TDepartment =
  | "urednistvo"
  | "priprava-in-oblikovanje"
  | "tisk"
  | "distribucija";

export type TRole = "member" | "admin" | "superadmin";

export type TTaskStatus = "assigned" | "done" | "completed";

export type TTaskPriority = "nizka" | "normalna" | "visoka";

// PROJECT TYPES

export type ProjectProps = {
  id: string;
  name: string;
  author?: string;
  type: TType;
  creator_id: string;
  start_date: Date;
  end_date: Date;
  status: TStatus;
  napredek: TNapredek;
  stanje: number;
  created_at: Date;
  format?: string;
  obseg?: string;
  vezava?: string;
  pakiranje?: string;
  material?: string;
  naklada?: string;
  tisk?: string;
  main_check?: boolean;
  technical_check?: boolean;
  vrsta_izdaje?: string;
};

export type typeFormProps = {
  name: string;
  type: TType;
  start_date: Date;
  end_date: Date;
  author?: string;
  priloge?: string;
  st_izdaje?: string;
  vrsta_izdaje?: string;
};

export type TechnicalSpecificationsProps = {
  format?: string;
  obseg?: string;
  vezava?: string;
  pakiranje?: string;
  material?: string;
  naklada?: string;
  tisk?: string;
  main_check?: boolean;
  technical_check?: boolean;
};
export type NewProjectDataProps = Omit<ProjectProps, "id" | "created_at">;

export type UpdatedProjectDataProps =
  | {
      napredek: TNapredek;
      status: TStatus;
      stanje: number;
      start_date?: Date;
      end_date?: Date;
    }
  | undefined;

export type ProjectsProps = ProjectProps[];

export type ProjectPhaseProps = {
  id: string;
  project_id: string;
  ponudba_id?: string;
  name: string;
  status: TStatus;
  start_date?: Date;
  end_date?: Date;
  oblikovanje?: string;
  predogled?: boolean;
  potrditev_postavitve?: boolean;
  potrditev_testnega_odtisa?: boolean;
  navodila?: string;
  prevzem?: boolean;
  created_at: Date;
};

export type UpdateProjectPhaseProps = {
  id: string;
  project_id?: string;
  name?: string;
  status?: TStatus;
  start_date?: Date;
  end_date?: Date;
  oblikovanje?: string;
  sken?: string;
  postavitev?: string;
  predogled?: boolean;
  potrditev_postavitve?: boolean;
  navodila?: string;
  prevzem?: boolean;
  created_at: Date;
};

export type NewProjectPhaseDataProps = Omit<
  ProjectPhaseProps,
  "id" | "created_at"
>;

export type UpdateProjectPhaseDataProps = Omit<
  UpdateProjectPhaseProps,
  "id" | "created_at"
>;

export type ProjectWithCreatorProps = ProjectProps & {
  creator: UserProps;
};

export type CompleteProjectPhaseProps = ProjectPhaseProps & {
  project_data: ProjectWithCreatorProps;
};

// FILE TYPES

export type FileProps = {
  id: string;
  project_id: string;
  name?: string;
  phase: string;
  description?: string;
  link: string;
  created_at: Date;
};

export type NewFileDataProps = Omit<FileProps, "id" | "created_at">;

// OFFER TYPES

export type OfferProps = {
  id: string;
  offerer_id: string;
  project_id: string;
  quantity: number;
  price: number;
  total: number;
  created_at: Date;
};

export type OfferWithOffererProps = OfferProps & {
  offerer: {
    id: string;
    name: string;
  };
};

export type OffererProps = {
  id: string;
  name: string;
  created_at: Date;
};

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
  phase: string;
  status: TTaskStatus;
  created_at: Date;
};

export type TaskHoursProps = {
  id: string;
  task_id: string;
  hours: number;
  description: string;
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
  imgUrl?: string;
  url: string;
  children?: SidebarNavigationItemProps[];
  access_group?: string;
};

// ACTIONS INPUT TYPES

export type AddUrednistvoPhaseDataProps = {
  project_id?: string;
  start_date?: Date;
  end_date?: Date;
  status?: TStatus;
  name?: string;
};

// STATISTICS TYPE
export type StatisticsData = {
  projectData: { project_name: string; total_hours: number }[] | null;
  userData: { user_name: string; total_hours: number }[] | null;
};
