"use server";

import { supabase } from "@/lib/supabase";
import {
  NewProjectPhaseDataProps,
  ProjectPhaseProps,
  UpdateProjectPhaseDataProps,
} from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const addProjectPhase = async (
  values: NewProjectPhaseDataProps
): Promise<{
  error: PostgrestError | null;
  data: ProjectPhaseProps | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("project_phases")
      .insert({ ...values })
      .select()
      .maybeSingle();

    revalidatePath("/", "page");
    return {
      error,
      data,
      message: "Successfully added a new project phase",
    };
  } catch (error: unknown) {
    return {
      error: error as PostgrestError,
      data: null,
      message: "Database Error: Failed to Add Project Phase",
    };
  }
};

export const closeProjectPhase = async (
  projectId: string
): Promise<{
  error: PostgrestError | null;
  data: ProjectPhaseProps | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("project_phases")
      .update({ status: "zaključeno" })
      .eq("id", projectId)
      .maybeSingle();

    revalidatePath("/", "page");
    return {
      error,
      data,
      message: "Successfully added a new project phase",
    };
  } catch (error: unknown) {
    return {
      error: error as PostgrestError,
      data: null,
      message: "Database Error: Failed to Add Project Phase",
    };
  }
};

export const updatePhase = async (
  projectId: string,
  values: UpdateProjectPhaseDataProps
): Promise<{
  error: PostgrestError | null;
  data: ProjectPhaseProps | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("project_phases")
      .update({ ...values })
      .eq("id", projectId)
      .maybeSingle();

    revalidatePath("/", "page");
    return {
      error,
      data,
      message: "Successfully added a new project phase",
    };
  } catch (error: unknown) {
    return {
      error: error as PostgrestError,
      data: null,
      message: "Database Error: Failed to Add Project Phase",
    };
  }
};

export const addPhase = async (
  values: NewProjectPhaseDataProps
): Promise<{
  error: PostgrestError | null;
  data: ProjectPhaseProps | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("project_phases")
      .insert({ ...values })
      .select()
      .maybeSingle();

    revalidatePath("/", "page");
    return {
      error,
      data,
      message: "Successfully added a new project phase",
    };
  } catch (error: unknown) {
    return {
      error: error as PostgrestError,
      data: null,
      message: "Database Error: Failed to Add Project Phase",
    };
  }
};

export const getProjectPhases = async (
  projectId: string
): Promise<{
  error: PostgrestError | null;
  data: ProjectPhaseProps[] | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("project_phases")
      .select()
      .eq("project_id", projectId);
    return {
      error,
      data,
      message: "Successfully added a new project phase",
    };
  } catch (error: unknown) {
    return {
      error: error as PostgrestError,
      data: null,
      message: "Database Error: Failed to Add Project Phase",
    };
  }
};
