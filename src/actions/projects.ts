import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export const getProjects = async (user: User) => {
  if (
    user.user_metadata.role === "superadmin" ||
    user.user_metadata.role === "admin"
  ) {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .neq("status", "zaključeno")
      .order("end_date");
    if (error) {
      console.log(error);
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .neq("status", "zaključeno")
      .eq("current_phase", user.user_metadata.department)
      .order("end_date");
    if (error) {
      console.log(error);
    }
    return data;
  }
};

export const getPhaseProjects = async (phase: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("current_phase", phase)
    .order("end_date");
  if (error) {
    console.log(error);
  }

  return data;
};

export const getProject = async (projectId: string) => {
  const response = await supabase
    .from("projects")
    .select()
    .eq("id", projectId)
    .maybeSingle();

  const project: ProjectProps | null = response.data;
  return project;
};

export const addProject = async (completeData: completeDataProps) => {
  try {
    await supabase.from("projects").insert({ ...completeData });
  } catch (error) {
    console.log(error);
  }
};
