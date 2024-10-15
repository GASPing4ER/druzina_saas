"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const signup = async (formData: FormData) => {
  const supabaseAuth = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    firstName: formData.get("firstName") as string,
    lastname: formData.get("lastName") as string,
    role: formData.get("role") as string,
    department: formData.get("department") as string,
  };

  const { error } = await supabaseAuth.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastname.trim(),
        role: data.role.trim(),
        department: data.department.trim(),
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
};

export const login = async (formData: FormData) => {
  const supabaseAuth = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabaseAuth.auth.signInWithPassword(data);

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

export const getUser = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user || error) {
    redirect("/login");
  }

  return data.user;
};
