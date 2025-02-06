"use server";

import { supabase } from "@/lib/supabase";
import {
  CompleteProjectPhaseProps,
  NewProjectDataProps,
  ProjectProps,
  ProjectWithCreatorProps,
  TechnicalSpecificationsProps,
  UpdatedProjectDataProps,
} from "@/types";
import { PostgrestError, User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const getCompleteProjectPhase = async (
  projectId: string,
  phase?: string
): Promise<{
  data: CompleteProjectPhaseProps | null;
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    let query = supabase
      .from("project_phases")
      .select(
        `
      *,
      project_data (
        *,
        creator:users (
        *
      )
      )
    `
      )
      .eq("project_id", projectId)
      .neq("status", "zaključeno")
      .neq("status", "v čakanju")
      .order("end_date");

    if (phase) {
      query = query.eq("name", phase);
    }
    const { data, error } = await query.maybeSingle();

    return {
      data: data,
      error,
      message: "Successful Fetch of a Project",
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Error: Failed to Fetch Project",
    };
  }
};

export const getProjectsWithCreator = async (
  user: User
): Promise<{
  data: ProjectWithCreatorProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    let query = supabase
      .from("project_data")
      .select(
        `
          *,
          creator:users (*)
        `
      )
      .neq("status", "zaključeno")
      .order("end_date");

    // If the user is a "member", filter projects where creator_id === user.id
    if (user.user_metadata.role === "member") {
      query = query.eq("creator_id", user.id);
    }

    const { data, error } = await query;

    return {
      data,
      error,
      message: `Successfully Fetched Projects for ${user.user_metadata.role}`,
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Projects Fetching unsuccessful.",
    };
  }
};

export const getProjectWithCreator = async (
  projectId: string
): Promise<{
  data: ProjectWithCreatorProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("project_data")
      .select(
        `
          *,
          creator:users (*)
        `
      )
      .eq("id", projectId)
      .neq("status", "zaključeno")
      .order("end_date")
      .maybeSingle();

    return {
      data,
      error,
      message: `Successfully Fetched Single Project`,
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Projects Fetching unsuccessful.",
    };
  }
};

export const getAllProjects = async (
  user: User
): Promise<{
  data: CompleteProjectPhaseProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    if (
      user.user_metadata.role === "superadmin" ||
      user.user_metadata.role === "admin"
    ) {
      const { data, error } = await supabase
        .from("project_phases")
        .select(
          `
    *,
    project_data (
      *,
      creator:users (
      *
    )
    )
  `
        )
        .eq("status", "v teku")
        .neq("name", "arhiv")
        .order("end_date");

      return {
        data,
        error,
        message: `Successfully Fetched Projects for ${user.user_metadata.role}`,
      };
    } else {
      const { data, error } = await supabase
        .from("project_phases")
        .select(
          `
    *,
    project_data (
      *,
      creator:users (
      *
    )
    )
  `
        )
        .eq("name", user.user_metadata.department)
        .neq("status", "zaključeno")
        .order("end_date");

      return {
        data,
        error,
        message: "Successfully Fetched Projects for member",
      };
    }
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Projects Fetching unsuccessful.",
    };
  }
};

export const getPhaseProjects = async (
  phase: string
): Promise<{
  data: CompleteProjectPhaseProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("project_phases")
      .select(
        `
    *,
    project_data (
      *,
      creator:users (
      *
    )
    )
  `
      )
      .eq("name", phase)
      .neq("status", "zaključeno")
      .neq("status", "v čakanju")
      .order("end_date");

    return {
      data,
      error,
      message: "Successfully Fetched Phase based Projects.",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Phase based Projects Fetching unsuccessful.",
    };
  }
};

export const getCompleteProject = async (
  projectId: string
): Promise<{
  data: CompleteProjectPhaseProps | null;
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("project_phases")
      .select(
        `
      *,
      project_data (
        *,
        creator:users (
        *
      )
      )
    `
      )
      .eq("project_id", projectId)
      .neq("status", "zaključeno")
      .order("end_date");

    return {
      data: data ? data[0] : null,
      error,
      message: "Successful Fetch of a Project",
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Error: Failed to Fetch Project",
    };
  }
};

export const getProjectData = async (
  projectId: string
): Promise<{
  data: ProjectProps | null;
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    const query = supabase
      .from("project_data")
      .select()
      .eq("id", projectId)
      .neq("status", "zaključeno")
      .order("end_date");

    const { data, error } = await query.maybeSingle();

    return {
      data: data,
      error,
      message: "Successful Fetch of a Project Data",
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Error: Failed to Fetch Project Data",
    };
  }
};

export const addProject = async (
  completeData: NewProjectDataProps
): Promise<{
  data: ProjectProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("project_data")
      .insert({ ...completeData })
      .select()
      .maybeSingle();

    revalidatePath("/", "page");

    return {
      data: data as ProjectProps,
      error,
      message: "Successfully Created a new Project",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Create Project",
    };
  }
};

export const updateProject = async (
  updatedData: UpdatedProjectDataProps,
  projectId: string
): Promise<{
  data: ProjectProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("project_data")
      .update({ ...updatedData })
      .eq("id", projectId);
    revalidatePath("/", "page");

    return {
      data,
      error,
      message: "Successfully Updated a new Project",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Update Project",
    };
  }
};

export const updateTechnicalSpecificationsProject = async (
  updatedData: TechnicalSpecificationsProps,
  projectId: string
): Promise<{
  data: ProjectProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("project_data")
      .update({ ...updatedData })
      .eq("id", projectId);
    revalidatePath("/", "page");

    return {
      data,
      error,
      message: "Successfully Updated a new Project",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Update Project",
    };
  }
};
