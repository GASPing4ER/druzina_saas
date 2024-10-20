import { supabase } from "@/lib/supabase";
import { UserProps } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const getUsers = async (): Promise<{
  data: UserProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase.from("users").select();

    return {
      data: data || null,
      error,
      message: "Successful Fetch of a Users",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Fetch Users",
    };
  }
};

export const addUser = async (
  values: UserProps
): Promise<{
  data: UserProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase.from("users").insert({ ...values });
    revalidatePath(`/`, "page");
    return {
      data,
      error,
      message: "Successful Creation of a User",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Create User",
    };
  }
};
