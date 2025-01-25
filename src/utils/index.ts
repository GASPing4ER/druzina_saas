import { nav_details, phases } from "@/constants";
import {
  CompleteProjectPhaseProps,
  NewProjectDataProps,
  ProjectPhaseProps,
  typeFormProps,
  UpdatedProjectDataProps,
} from "@/types";
import { User } from "@supabase/supabase-js";

export const getPathname = (pathname: string) => {
  // TODO: V konstante dodaj pathnames, kjer bodo shranjeni url-ji in naslovi, in nato v tej funkciji return-i object s title-om in url-jem
  const navDetail = nav_details.find((item) => item.url === `/${pathname}`);

  if (navDetail) return navDetail;
  return null;
};

export const formatDate = (inputDate: Date) => {
  // Parse the input date as UTC
  const utcDate = new Date(inputDate);

  // Format the date for a specific time zone (e.g., Europe/Ljubljana)
  const timeZone = "Europe/Ljubljana"; // Adjust based on your needs
  const formattedDate = new Intl.DateTimeFormat("sl-SI", {
    timeZone,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(utcDate);

  return formattedDate;
};

export const isPast = (endDate: Date) => {
  const currentDate = new Date();
  const projectEndDate = new Date(endDate);

  return projectEndDate < currentDate; // Returns true if end_date is in the past
};

export const getPhaseName = (inputPhase: string) => {
  const phase = phases.find((phase) => phase.slug === inputPhase);
  return phase?.title || "/";
};

export const getPhaseNameByNapredek = (napredek: number) => {
  if (napredek === 0) {
    return "Osnutek";
  } else if (napredek === 1) {
    return "Uredništvo";
  } else if (napredek === 2) {
    return "Priprava in oblikovanje";
  } else if (napredek === 3) {
    return "Tisk";
  } else if (napredek === 4) {
    return "Distribucija";
  }
};

export const getPhaseSlugByNapredek = (napredek: number) => {
  if (napredek === 0) {
    return "osnutek";
  } else if (napredek === 1) {
    return "urednistvo";
  } else if (napredek === 2) {
    return "priprava-in-oblikovanje";
  } else if (napredek === 3) {
    return "tisk";
  } else if (napredek === 4) {
    return "distribucija";
  }
};

export const getCompleteData = (
  values: typeFormProps,
  user: User
): NewProjectDataProps => {
  if (new Date(values.start_date) > new Date()) {
    return {
      ...values,
      napredek: 0,
      status: "v pripravi",
      stanje: 0,
      creator_id: user.id,
    };
  } else if (values.type !== "drugo") {
    return {
      ...values,
      napredek: 1,
      status: "v teku",
      stanje: 0,
      creator_id: user.id,
    };
  }
  return {
    ...values,
    napredek: 2,
    status: "v teku",
    stanje: 25,
    creator_id: user.id,
  };
};

export const updateData = (
  project: CompleteProjectPhaseProps
): UpdatedProjectDataProps => {
  if (project.name === "osnutek") {
    return {
      // ...project,
      napredek: 1,
      status: "v teku",
      stanje: 0,
    };
  } else if (project.name === "urednistvo") {
    return {
      // ...project,
      napredek: 2,
      status: "v teku",
      stanje: 25,
    };
  }
  // else if (project.name === "oblikovanje") {
  //   return {
  //     // ...project,
  //     name: "priprava-in-oblikovanje",
  //     napredek: 3,
  //     status: "v teku",
  //     stanje: 40,
  //   };
  // }
  else if (project.name === "priprava-in-oblikovanje") {
    return {
      // ...project,
      napredek: 3,
      status: "v teku",
      stanje: 50,
    };
  } else if (project.name === "tisk") {
    return {
      // ...project,
      napredek: 4,
      status: "v teku",
      stanje: 75,
    };
  } else if (project.name === "dostava") {
    return {
      // ...project,
      napredek: 4,
      status: "zaključeno",
      stanje: 100,
    };
  }
};

export const getNextPhase = (phase: string) => {
  if (phase === "osnutek") {
    return "urednistvo";
  } else if (phase === "urednistvo") {
    return "priprava-in-oblikovanje";
  } else if (phase === "priprava-in-oblikovanje") {
    return "tisk";
  } else if (phase === "tisk") {
    return "dostava";
  } else if (phase === "dostava") {
    return "arhiv";
  }
};

export const getProjectPhase = (
  project_phases: ProjectPhaseProps[] | null,
  phase: string
) => {
  if (project_phases === null) {
    return null;
  }
  const phase_found = project_phases.find(
    (project_phase) => project_phase.name === phase
  );
  if (phase_found === undefined) {
    return null;
  } else {
    return phase_found;
  }
};
