"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/utils";
import { TaskHoursProps } from "@/types";

type TaskHoursRowProps = {
  taskHour: TaskHoursProps;
};

const TaskHoursRow = ({ taskHour }: TaskHoursRowProps) => {
  return (
    <TableRow className="cursor-pointer">
      <TableCell>
        <p>{taskHour.hours}</p>
      </TableCell>
      <TableCell>{taskHour.description}</TableCell>
      <TableCell>{formatDate(taskHour.created_at)}</TableCell>
    </TableRow>
  );
};

export default TaskHoursRow;
