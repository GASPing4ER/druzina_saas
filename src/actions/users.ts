import { supabase } from "@/lib/supabase";
import { UserProps } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const getUsers = async (): Promise<{
  data: UserProps[] | null;
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    const { data, error } = await supabase.from("users").select();

    return {
      data: data || null,
      error,
      message: "Successful Fetch of a Users",
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Error: Failed to Fetch Users",
    };
  }
};

export const addUser = async (
  values: UserProps
): Promise<{
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    const { error } = await supabase.from("users").insert({ ...values });
    console.log("Error:", error);
    revalidatePath(`/`, "page");
    return {
      error,
      message: "Successful Creation of a User",
    };
  } catch (error) {
    return {
      error,
      message: "Database Error: Failed to Create User",
    };
  }
};
