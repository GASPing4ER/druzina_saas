"use server";

import { supabase } from "@/lib/supabase";
import {
  NewTaskDataProps,
  TaskHoursProps,
  TaskProps,
  TaskWithNamesProps,
  TTaskStatus,
} from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const getTasks = async (
  projectId: string,
  phase: string
): Promise<{
  data: TaskProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select()
      .eq("project_id", projectId)
      .eq("phase", phase);

    return {
      data: data,
      error,
      message: "Successful Fetch of a Tasks",
    };
  } catch (error) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Fetch Tasks",
    };
  }
};

export const getUserTasks = async (
  userId: string
): Promise<{
  data: TaskProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select()
      .eq("employee_id", userId);

    return {
      data: data,
      error,
      message: "Successful Fetch of a Tasks",
    };
  } catch (error) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Fetch Tasks",
    };
  }
};

export const getTasksWithNames = async (
  projectId: string,
  phase: string
): Promise<{
  data: TaskWithNamesProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
      *,
      employee:employee_id (first_name, last_name),
      assigner:assigner_id (first_name, last_name)
    `
      )
      .eq("project_id", projectId)
      .eq("phase", phase);

    return {
      data: data,
      error,
      message: "Successful Fetch of a Tasks",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Fetch Tasks",
    };
  }
};

export const addTask = async (
  values: NewTaskDataProps
): Promise<{
  data: TaskProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase.from("tasks").insert({ ...values });
    revalidatePath(`/urednistvo/${values.project_id}`, "page");
    return {
      data,
      error,
      message: "Successful Creation of a Task",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Create Task",
    };
  }
};

export const updateTask = async (
  values: TaskProps
): Promise<{
  data: TaskProps | null;
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .update({ ...values })
      .eq("id", values.id);
    return {
      data,
      error,
      message: "Successful Update of a Task",
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Error: Failed to Update Task",
    };
  }
};

export const updateTaskStatus = async (
  task: TaskProps
): Promise<{
  data: TaskProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    let status: TTaskStatus;
    if (task.status === "assigned") {
      status = "done";
    } else if (task.status === "done") {
      status = "checked";
    } else {
      status = "completed";
    }

    const { data, error } = await supabase
      .from("tasks")
      .update({ status })
      .eq("id", task.id);
    revalidatePath(`/urednistvo/${task.project_id}`, "page");
    return {
      data,
      error,
      message: "Successful Update of a Task Status",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Update Task Status",
    };
  }
};

export const addTaskHours = async (values: {
  task_id: string;
  hours: string;
  description: string;
}): Promise<{
  data: TaskHoursProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("task_hours")
      .insert({ ...values, hours: +values.hours });
    revalidatePath(`/`, "layout");
    return {
      data,
      error,
      message: "Successful Creation of a Task",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Create Task",
    };
  }
};

export const getTaskHours = async (
  task_id: string
): Promise<{
  data: TaskHoursProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("task_hours")
      .select()
      .eq("task_id", task_id);
    return {
      data,
      error,
      message: "Successful Creation of a Task",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Create Task",
    };
  }
};
