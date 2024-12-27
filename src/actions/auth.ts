"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { addUser } from "./users";
import { LoginUserProps, NewUserDataProps } from "@/types";
import { User } from "@supabase/supabase-js";

export const signup = async (formData: NewUserDataProps) => {
  const supabaseAuth = await createClient();

  const { data, error } = await supabaseAuth.auth.signUp({
    email: formData.email,
    password: formData.password!,
    options: {
      data: {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        role: formData.role.trim(),
        department: formData.department.trim(),
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = formData;

  if (data.user) {
    await addUser({ ...rest, id: data.user.id });
  }

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
};

export const login = async (formData: LoginUserProps) => {
  const supabaseAuth = await createClient();

  const { error } = await supabaseAuth.auth.signInWithPassword(formData);

  if (error) {
    return { error: error.message };
  }
  revalidatePath("/", "layout");
  redirect("/");
};

export const logout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};

export const getUser = async (): Promise<User> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user || error) {
    redirect("/login");
  }

  return data.user;
};
