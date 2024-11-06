"use client";

import { useState } from "react";
import { DashboardProjects, DashboardProjectsFilter } from "@/components";
import { CompleteProjectPhaseProps } from "@/types";

type DashboardProjectsDisplayProps = {
  projects: CompleteProjectPhaseProps[];
};

const DashboardProjectsDisplay = ({
  projects,
}: DashboardProjectsDisplayProps) => {
  const [phase, setPhase] = useState("");
  const filteredProjects =
    phase !== ""
      ? [...projects].filter((project) => project.name === phase)
      : projects.filter((project) => project.name !== "osnutek");

  const onHandlePhase = (chosenPhase: string) => {
    setPhase(chosenPhase);
  };
  return (
    <div className="flex flex-col gap-8 w-full">
      <DashboardProjectsFilter onHandlePhase={onHandlePhase} />
      <DashboardProjects projects={filteredProjects} />
    </div>
  );
};

export default DashboardProjectsDisplay;
