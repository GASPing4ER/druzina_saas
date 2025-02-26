"use client";

import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { formatDate, getPhaseName, isPast } from "@/utils";
// import { ProgressBar } from "@/components";
import { useRouter } from "next/navigation";
import { CompleteProjectPhaseProps } from "@/types";

type PhaseRowProps = {
  project: CompleteProjectPhaseProps;
  pathname: string;
};

const PhaseRow = ({ project, pathname }: PhaseRowProps) => {
  const router = useRouter();
  return (
    <TableRow onClick={() => router.push(pathname)} className="cursor-pointer">
      <TableCell>{getPhaseName(project.name)}</TableCell>
      <TableCell>
        {project.project_data.name} {project.project_data.st_izdaje}
      </TableCell>
      <TableCell className="capitalize">{project.project_data.type}</TableCell>
      <TableCell>
        {" "}
        {project.start_date ? formatDate(project.start_date) : "/"}
      </TableCell>
      <TableCell
        className={`${
          project.end_date && isPast(project.end_date) ? "text-red-500" : ""
        }`}
      >
        {project.end_date ? formatDate(project.end_date) : "/"}
      </TableCell>
      <TableCell>
        {project.project_data.creator.first_name}{" "}
        {project.project_data.creator.last_name}
      </TableCell>
      {/* <TableCell
        className={`${
          project.project_data.status === "v teku"
            ? "bg-orange-300/40 text-orange-400"
            : project.project_data.status === "v pripravi"
            ? "bg-red-300/40 text-red-400"
            : "bg-green-300/40 text-green-400"
        }`}
      >
        {project.project_data.status}
      </TableCell> */}
      {/* <TableCell className="text-center">
        {project.project_data.napredek}/4
      </TableCell> */}
      {/* <TableCell>
        <ProgressBar stanje={project.project_data.stanje} />
        {project.project_data.stanje}%
      </TableCell> */}
    </TableRow>
  );
};

export default PhaseRow;
