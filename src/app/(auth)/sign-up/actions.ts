"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/lib/supabase";

export async function signup(formData: FormData) {
  const supabaseAuth = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    firstName: formData.get("firstName") as string,
    lastname: formData.get("lastName") as string,
  };

  const { data: userData, error } = await supabaseAuth.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return error;
  }

  if (userData.user) {
    const userId = userData.user.id;

    const { error } = await supabase.from("users").insert([
      {
        id: userId,
        firstName: data.firstName,
        lastName: data.lastname,
        email: data.email,
        role: "member",
      },
    ]);

    if (error) {
      return error;
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}
