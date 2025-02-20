"use client";

import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { formatDate, getPhaseName, isPast } from "@/utils";
import { useRouter } from "next/navigation";
import { CompleteProjectPhaseWithOffererProps } from "@/types";

type TiskPhaseRowProps = {
  project: CompleteProjectPhaseWithOffererProps;
};

const TiskPhaseRow = ({ project }: TiskPhaseRowProps) => {
  const router = useRouter();
  return (
    <TableRow
      onClick={() => router.push(`/tisk/${project.project_data.id}`)}
      className="cursor-pointer"
    >
      <TableCell>{getPhaseName(project.name)}</TableCell>
      <TableCell>{project.project_data.name}</TableCell>
      <TableCell className="capitalize">{project.project_data.type}</TableCell>
      <TableCell>
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
      <TableCell>{project.offers?.offerers?.name}</TableCell>
    </TableRow>
  );
};

export default TiskPhaseRow;
