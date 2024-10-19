"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate, isPast } from "@/utils";
import { TaskModal, TaskStatusButton } from "@/components";
import { User } from "@supabase/supabase-js";
import { TaskWithNamesProps } from "@/types";

type TaskRowProps = {
  task: TaskWithNamesProps;
  user: User;
};

const TaskRow = ({ task, user }: TaskRowProps) => {
  const [open, setOpen] = useState(false); // Manage dialog state

  const handleRowClick = () => {
    setOpen(true); // Open dialog when row is clicked
  };
  return (
    <>
      <TableRow className="cursor-pointer" onClick={handleRowClick}>
        <TableCell>
          {task.employee.first_name} {task.employee.last_name}
        </TableCell>
        <TableCell>{formatDate(task.start_date)}</TableCell>
        <TableCell className={`${isPast(task.end_date) && "text-red-500"}`}>
          {formatDate(task.end_date)}
        </TableCell>
        <TableCell>{task.priority}</TableCell>
        <TableCell className="flex justify-between gap-4">
          <p>{task.name}</p>
          <TaskStatusButton task={task} user={user} />
        </TableCell>
      </TableRow>
      <TaskModal task={task} open={open} setOpen={setOpen} />
    </>
  );
};

export default TaskRow;
