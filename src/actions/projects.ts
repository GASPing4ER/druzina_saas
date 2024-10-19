"use server";

import { supabase } from "@/lib/supabase";
import {
  NewProjectDataProps,
  ProjectProps,
  UpdatedProjectDataProps,
} from "@/types";
import { PostgrestError, User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const getProjects = async (user: User) => {
  if (
    user.user_metadata.role === "superadmin" ||
    user.user_metadata.role === "admin"
  ) {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .neq("status", "zaključeno")
      .order("end_date");
    if (error) {
      console.log(error);
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .neq("status", "zaključeno")
      .eq("current_phase", user.user_metadata.department)
      .order("end_date");
    if (error) {
      console.log(error);
    }
    return data;
  }
};

export const getPhaseProjects = async (phase: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("current_phase", phase)
    .order("end_date");
  if (error) {
    console.log(error);
  }

  return data;
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

export const addProject = async (completeData: NewProjectDataProps) => {
  try {
    await supabase.from("projects").insert({ ...completeData });
    revalidatePath("/", "page");
  } catch (error) {
    return {
      error,
      message: "Database Error: Failed to Create Project",
    };
  }
};

export const updateProject = async (
  updatedData: UpdatedProjectDataProps,
  projectId: string
) => {
  try {
    await supabase
      .from("projects")
      .update({ ...updatedData })
      .eq("id", projectId);
    revalidatePath("/", "page");
  } catch (error) {
    return {
      error,
      message: "Database Error: Failed to Update Project",
    };
  }
};
