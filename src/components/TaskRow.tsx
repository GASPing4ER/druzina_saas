"use client";

import React from "react";
import { TableCell, TableRow } from "./ui/table";
import { formatDate, isPast } from "@/utils";

const TaskRow = ({ task }: { task: TaskProps }) => {
  return (
    <TableRow className="cursor-pointer">
      <TableCell>{task.assigner_name}</TableCell>
      <TableCell>{task.employee_name}</TableCell>
      <TableCell>{formatDate(task.start_date)}</TableCell>
      <TableCell className={`${isPast(task.end_date) && "text-red-500"}`}>
        {formatDate(task.end_date)}
      </TableCell>
      <TableCell>{task.priority}</TableCell>
      <TableCell>{task.name}</TableCell>
    </TableRow>
  );
};

export default TaskRow;
