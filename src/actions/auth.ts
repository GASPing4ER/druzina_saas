"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { addUser } from "./users";
import { LoginUserProps, NewUserDataProps } from "@/types";
import { User } from "@supabase/supabase-js";

export const signup = async (formData: NewUserDataProps) => {
  const supabaseAuth = createClient();

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
    console.log("Adding user...");
    await addUser({ ...rest, id: data.user.id });
  }

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
};

export const login = async (formData: LoginUserProps) => {
  const supabaseAuth = createClient();

  const { error } = await supabaseAuth.auth.signInWithPassword(formData);

  if (error?.code === "email_not_confirmed") {
    // Return the error message to the page for display
    console.log(error);
    return { error: "Potrdi svoj email." };
  } else if (error) {
    return { error: error.message };
  }

  // Optionally return something upon success, like redirect instructions
  return { success: true };
};

export const logout = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
};

export const getUser = async (): Promise<User> => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user || error) {
    redirect("/login");
  }

  return data.user;
};
