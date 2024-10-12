"use server";

import { supabase } from "@/lib/supabase";
import { createClient } from "./server";

export const getUser = async (): Promise<{
  data: UserProps;
}> => {
  const supabaseAuth = createClient();
  const { data: userData } = await supabaseAuth.auth.getUser();
  const userId = userData.user?.id as string;
  const { data } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .maybeSingle();

  return {
    data,
  };
};

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select();
  return {
    data,
    error,
  };
};
