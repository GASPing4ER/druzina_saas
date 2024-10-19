"use server";

import { supabase } from "@/lib/supabase";
import {
  NewProjectDataProps,
  ProjectProps,
  ProjectsProps,
  UpdatedProjectDataProps,
} from "@/types";
import { PostgrestError, User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const getProjects = async (
  user: User
): Promise<{
  data: ProjectsProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    if (
      user.user_metadata.role === "superadmin" ||
      user.user_metadata.role === "admin"
    ) {
      const { data, error } = await supabase
        .from("projects")
        .select()
        .neq("status", "zaključeno")
        .order("end_date");

      return {
        data,
        error,
        message: `Successfully Fetched Projects for ${user.user_metadata.role}`,
      };
    } else {
      const { data, error } = await supabase
        .from("projects")
        .select()
        .neq("status", "zaključeno")
        .eq("current_phase", user.user_metadata.department)
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
  data: ProjectsProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("current_phase", phase)
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

export const getProject = async (
  projectId: string
): Promise<{
  data: ProjectProps | null;
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("id", projectId)
      .maybeSingle();

    return {
      data: data || null,
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

export const addProject = async (
  completeData: NewProjectDataProps
): Promise<{
  data: ProjectProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert({ ...completeData });
    revalidatePath("/", "page");

    return {
      data,
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
      .from("projects")
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
