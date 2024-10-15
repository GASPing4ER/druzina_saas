import { nav_details, phases } from "@/constants";
import { formSchema } from "@/types/schemas";
import { User } from "@supabase/supabase-js";
import { z } from "zod";

export const getPathname = (pathname: string) => {
  // TODO: V konstante dodaj pathnames, kjer bodo shranjeni url-ji in naslovi, in nato v tej funkciji return-i object s title-om in url-jem

  const navDetail = nav_details.find((item) => item.url === `/${pathname}`);

  if (navDetail) return navDetail;
  return null;
};

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const formattedDate = new Intl.DateTimeFormat("sl-SI", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate;
};

export const isPast = (endDate: string) => {
  const currentDate = new Date();
  const projectEndDate = new Date(endDate);

  return projectEndDate < currentDate; // Returns true if end_date is in the past
};

export const getPhaseName = (inputPhase: string) => {
  const phase = phases.find((phase) => phase.slug === inputPhase);
  return phase?.title || "/";
};

export const getCompleteData = (
  values: z.infer<typeof formSchema>,
  user: User
) => {
  console.log(values);
  if (values.current_phase === "uredništvo") {
    return {
      ...values,
      current_phase: "urednistvo",
      napredek: 1,
      status: "v teku",
      stanje: 0,
      creatorId: user.id,
      creator_name: `${user.user_metadata.firstName} ${user.user_metadata.lastName}`,
    };
  }
};
