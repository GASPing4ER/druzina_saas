import { supabase } from "@/lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const getTasks = async (
  projectId: string
): Promise<{
  data: TaskProps[] | null;
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select()
      .eq("project_id", projectId)
      .order("priority");

    return {
      data: data || null,
      error,
      message: "Successful Fetch of a Tasks",
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Error: Failed to Fetch Tasks",
    };
  }
};

export const addTask = async (
  values: NewTaskDataProps
): Promise<{
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    const { error } = await supabase.from("tasks").insert({ ...values });
    revalidatePath(`/urednistvo/${values.project_id}`, "page");
    return {
      error,
      message: "Successful Creation of a Task",
    };
  } catch (error) {
    return {
      error,
      message: "Database Error: Failed to Create Task",
    };
  }
};

export const updateTaskStatus = async (task: TaskProps) => {
  let status: TTaskStatus;

  if (task.status === "assigned") {
    status = "done";
  } else if (task.status === "done") {
    status = "checked";
  } else {
    status = "completed";
  }

  try {
    const { error } = await supabase
      .from("tasks")
      .update({ status })
      .eq("id", task.id);
    revalidatePath(`/urednistvo/${task.project_id}`, "page");
    return {
      error,
      message: "Successful Update of a Task Status",
    };
  } catch (error) {
    return {
      error,
      message: "Database Error: Failed to Update Task Status",
    };
  }
};
