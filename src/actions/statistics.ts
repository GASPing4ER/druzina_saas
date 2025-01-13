"use server";

type GetReportDataReturn = {
  data: StatisticsData | null;
  error:
    | {
        projectError: PostgrestError | null;
        userError: PostgrestError | null;
      }
    | null
    | PostgrestError;
  message: string;
};

import { supabase } from "@/lib/supabase";
import { StatisticsData } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";

export const getReportData = async ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}): Promise<GetReportDataReturn> => {
  try {
    // Call the RPC function for project hours with startDate and endDate
    const { data: projectData, error: projectError } = await supabase.rpc(
      "get_project_hours",
      {
        start_date: startDate,
        end_date: endDate,
      }
    );

    // Call the RPC function for user hours with startDate and endDate
    const { data: userData, error: userError } = await supabase.rpc(
      "get_user_hours",
      {
        start_date: startDate,
        end_date: endDate,
      }
    );

    return {
      data: {
        projectData,
        userData,
      },
      error: {
        projectError,
        userError,
      },
      message: "Successful fetch of statistic data",
    };
  } catch (error) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "Failed fetch of statistic data",
    };
  }
};
