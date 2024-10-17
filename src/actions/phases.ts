import { supabase } from "@/lib/supabase";
import { phaseSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addPhase = async (
  values: z.infer<typeof phaseSchema>,
  phase: string,
  projectId: string
) => {
  try {
    await supabase.from(phase).insert({ ...values, project_id: projectId });
    revalidatePath("/", "page");
  } catch (error) {
    return {
      error,
      message: "Database Error: Failed to Create Project",
    };
  }
};
