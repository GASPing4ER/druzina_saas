import { supabase } from "@/lib/supabase";
import { FileProps, NewFileDataProps } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const getFiles = async (
  projectId: string
): Promise<{
  data: FileProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("files")
      .select()
      .eq("project_id", projectId);

    if (error) {
      // If there's an error from Supabase, handle it explicitly
      return {
        data: null,
        error,
        message: "Failed to fetch files: " + error.message,
      };
    }

    return {
      data: data || null,
      error: null,
      message: "Successfully fetched files",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "An unexpected error occurred while fetching files",
    };
  }
};

export const addFile = async (
  values: NewFileDataProps
): Promise<{
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { error } = await supabase.from("files").insert({ ...values });

    if (error) {
      return {
        error,
        message: "Failed to create file: " + error.message,
      };
    }

    revalidatePath(`/urednistvo/${values.project_id}`, "page");

    return {
      error: null,
      message: "Successfully created file",
    };
  } catch (error: unknown) {
    return {
      error: error as PostgrestError,
      message: "An unexpected error occurred while creating a file",
    };
  }
};

export const updateFile = async (
  values: FileProps
): Promise<{
  data: FileProps | null;
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("files")
      .update({ ...values })
      .eq("id", values.id);
    revalidatePath(`/urednistvo/${values.project_id}`, "page");
    return {
      data,
      error,
      message: "Successful Creation of a File",
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Error: Failed to Create File",
    };
  }
};
