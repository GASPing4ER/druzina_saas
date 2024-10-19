import { supabase } from "@/lib/supabase";
import { FileProps, NewFileDataProps } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const getFiles = async (
  projectId: string
): Promise<{
  data: FileProps[] | null;
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("files")
      .select()
      .eq("project_id", projectId);

    return {
      data: data || null,
      error,
      message: "Successful Fetch of a Files",
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Error: Failed to Fetch Files",
    };
  }
};

export const addFile = async (
  values: NewFileDataProps
): Promise<{
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    const { error } = await supabase.from("files").insert({ ...values });
    revalidatePath(`/urednistvo/${values.project_id}`, "page");
    return {
      error,
      message: "Successful Creation of a File",
    };
  } catch (error) {
    return {
      error,
      message: "Database Error: Failed to Create File",
    };
  }
};
