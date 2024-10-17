import { supabase } from "@/lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";

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
