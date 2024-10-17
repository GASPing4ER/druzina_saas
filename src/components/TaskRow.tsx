"use client";

import { useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import { formatDate, isPast } from "@/utils";
import TaskModal from "./TaskModal";

const TaskRow = ({ task }: { task: TaskProps }) => {
  const [open, setOpen] = useState(false); // Manage dialog state

  const handleRowClick = () => {
    setOpen(true); // Open dialog when row is clicked
  };
  return (
    <>
      <TableRow className="cursor-pointer" onClick={handleRowClick}>
        <TableCell>{task.assigner_name}</TableCell>
        <TableCell>{task.employee_name}</TableCell>
        <TableCell>{formatDate(task.start_date)}</TableCell>
        <TableCell className={`${isPast(task.end_date) && "text-red-500"}`}>
          {formatDate(task.end_date)}
        </TableCell>
        <TableCell>{task.priority}</TableCell>
        <TableCell>{task.name}</TableCell>
      </TableRow>
      <TaskModal task={task} open={open} setOpen={setOpen} />
    </>
  );
};

export default TaskRow;
