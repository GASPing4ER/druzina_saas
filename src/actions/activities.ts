"use server";

import { supabase } from "@/lib/supabase";
import { ActivityProps, ActivityWithCreatorProps } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const addActivity = async (
  projectId: string,
  userId: string,
  entity: string,
  action: string
): Promise<{
  data: ActivityProps | null;
  error: PostgrestError | null | unknown;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("activities")
      .insert({
        project_id: projectId,
        user_id: userId,
        entity,
        action,
      })
      .select()
      .single();

    revalidatePath("/", "layout");
    return {
      data: data,
      error,
      message: "Successful Log of an Activity",
    };
  } catch (error) {
    return {
      data: null,
      error,
      message: "Database Error: Failed to Log an Activity",
    };
  }
};

export const getActivities = async (
  projectId: string
): Promise<{
  data: ActivityWithCreatorProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*, users(first_name, last_name)")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) {
      return {
        data: null,
        error,
        message: "Database Error: Failed to Retrieve Activities",
      };
    }

    return {
      data: data,
      error: null,
      message: "Successfully Retrieved Activities",
    };
  } catch (error) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Retrieve Activities",
    };
  }
};

export const getLastActivity = async (
  projectId: string
): Promise<{
  data: ActivityWithCreatorProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*, users(first_name, last_name)")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) {
      return {
        data: null,
        error,
        message: "Database Error: Failed to Retrieve Activities",
      };
    }

    return {
      data: data[0],
      error: null,
      message: "Successfully Retrieved Activities",
    };
  } catch (error) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Database Error: Failed to Retrieve Activities",
    };
  }
};
