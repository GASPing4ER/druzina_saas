import { supabase } from "@/lib/supabase";
import { NewPhaseProps } from "@/types";
import { phaseSchema } from "@/types/schemas";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addPhase = async (
  values: z.infer<typeof phaseSchema>,
  phase: string,
  projectId: string
): Promise<{
  error: PostgrestError | null;
  data: NewPhaseProps | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from(phase)
      .insert({ ...values, project_id: projectId });

    revalidatePath("/", "page");
    return {
      error,
      data,
      message: "Successfully added a new phase",
    };
  } catch (error: unknown) {
    return {
      error: error as PostgrestError,
      data: null,
      message: "Database Error: Failed to Create Project",
    };
  }
};
