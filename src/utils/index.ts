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
  if (new Date(values.start_date) > new Date()) {
    return {
      ...values,
      napredek: 0,
      status: "v pripravi",
      current_phase: "osnutek",
      stanje: 0,
      creatorId: user.id,
      creator_name: `${user.user_metadata.firstName} ${user.user_metadata.lastName}`,
    };
  } else if (values.type !== "drugo") {
    return {
      ...values,
      current_phase: "urednistvo",
      napredek: 1,
      status: "v teku",
      stanje: 0,
      creatorId: user.id,
      creator_name: `${user.user_metadata.firstName} ${user.user_metadata.lastName}`,
    };
  } else if (values.type === "drugo") {
    return {
      ...values,
      current_phase: "priprava-za-tisk",
      napredek: 3,
      status: "v teku",
      stanje: 40,
      creatorId: user.id,
      creator_name: `${user.user_metadata.firstName} ${user.user_metadata.lastName}`,
    };
  }
};

export const updateData = (project: ProjectProps): updatedDataProps => {
  console.log(project);
  if (project.current_phase === "osnutek") {
    return {
      // ...project,
      current_phase: "urednistvo",
      napredek: 1,
      status: "v teku",
      stanje: 0,
    };
  } else if (project.current_phase === "urednistvo") {
    return {
      // ...project,
      current_phase: "priprava-za-tisk",
      napredek: 2,
      status: "v teku",
      stanje: 25,
    };
  }
  // else if (project.current_phase === "oblikovanje") {
  //   return {
  //     // ...project,
  //     current_phase: "priprava-za-tisk",
  //     napredek: 3,
  //     status: "v teku",
  //     stanje: 40,
  //   };
  // }
  else if (project.current_phase === "priprava-za-tisk") {
    return {
      // ...project,
      current_phase: "tisk",
      napredek: 3,
      status: "v teku",
      stanje: 50,
    };
  } else if (project.current_phase === "tisk") {
    return {
      // ...project,
      current_phase: "dostava",
      napredek: 4,
      status: "v teku",
      stanje: 75,
    };
  } else if (project.current_phase === "dostava") {
    return {
      // ...project,
      napredek: 4,
      current_phase: "arhiv",
      status: "zaključeno",
      stanje: 100,
    };
  }
};

export const getNextPhase = (phase: string) => {
  if (phase === "osnutek") {
    return "urednistvo";
  } else if (phase === "urednistvo") {
    return "priprava-za-tisk";
  } else if (phase === "priprava-za-tisk") {
    return "tisk";
  } else if (phase === "tisk") {
    return "dostava";
  } else if (phase === "dostava") {
    return "arhiv";
  }
};
