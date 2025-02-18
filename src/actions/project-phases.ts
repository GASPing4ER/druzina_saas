"use server";

import { supabase } from "@/lib/supabase";
import {
  NewProjectPhaseDataProps,
  ProjectPhaseProps,
  UpdateProjectPhaseDataProps,
} from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { addActivity } from "./activities";

export const addProjectPhase = async (
  values: NewProjectPhaseDataProps,
  userId: string
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

    await addActivity(
      values.project_id,
      userId,
      `PHASE:${values.name}`,
      "CREATE"
    );

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
  userId: string,
  values: UpdateProjectPhaseDataProps
): Promise<{
  error: PostgrestError | null;
  data: ProjectPhaseProps | null;
  message: string;
}> => {
  try {
    const { project_id, name, ...rest } = values;
    let action = "UPDATE";
    if (values.status === "zaključeno") {
      action = "END";
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ data, error }, _] = await Promise.all([
      supabase
        .from("project_phases")
        .update({ ...rest })
        .eq("id", projectId)
        .maybeSingle(),
      addActivity(project_id, userId, `PHASE:${name}`, action),
    ]);

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
  values: NewProjectPhaseDataProps,
  userId: string
): Promise<{
  error: PostgrestError | null;
  data: ProjectPhaseProps | null;
  message: string;
}> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ data, error }, _] = await Promise.all([
      supabase
        .from("project_phases")
        .insert({ ...values })
        .select()
        .maybeSingle(),
      addActivity(values.project_id, userId, `PHASE:${values.name}`, "CREATE"),
    ]);

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
