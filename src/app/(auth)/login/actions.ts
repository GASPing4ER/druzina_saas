"use server";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
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
}
