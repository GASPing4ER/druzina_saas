import { supabase } from "@/lib/supabase";

export const getProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .order("end_date");
  if (error) {
    console.log(error);
  }
  return data;
};
