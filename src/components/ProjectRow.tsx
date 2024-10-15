"use client";

import React from "react";
import { TableCell, TableRow } from "./ui/table";
import { formatDate, getPhaseName, isPast } from "@/utils";
import ProgressBar from "./ProgressBar";
import { useRouter } from "next/navigation";

const ProjectRow = ({
  project,
  pathname,
}: {
  project: ProjectProps;
  pathname: string;
}) => {
  const router = useRouter();
  return (
    <TableRow onClick={() => router.push(pathname)} className="cursor-pointer">
      <TableCell className="capitalize">
        {getPhaseName(project.current_phase)}
      </TableCell>
      <TableCell>{project.name}</TableCell>
      <TableCell className="capitalize">{project.type}</TableCell>
      <TableCell>{formatDate(project.start_date)}</TableCell>
      <TableCell className={`${isPast(project.end_date) && "text-red-500"}`}>
        {formatDate(project.end_date)}
      </TableCell>
      <TableCell>{project.creator_name}</TableCell>
      <TableCell
        className={`${
          project.status === "v teku"
            ? "bg-orange-300/40 text-orange-400"
            : project.status === "v pripravi"
            ? "bg-red-300/40 text-red-400"
            : "bg-green-300/40 text-green-400"
        }`}
      >
        {project.status}
      </TableCell>
      <TableCell className="text-center">{project.napredek}/5</TableCell>
      <TableCell>
        <ProgressBar stanje={project.stanje} />
        {project.stanje}%
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
