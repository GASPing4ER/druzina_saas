"use client";

import { getTaskHours } from "@/actions/tasks";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskHoursProps, TaskProps } from "@/types";
import { useEffect, useState } from "react";
import TaskHoursRow from "./TaskHoursRow";

type TaskHoursTableProps = {
  task_id: TaskProps["id"];
};

const TaskHoursTable = ({ task_id }: TaskHoursTableProps) => {
  const [taskHours, setTaskHours] = useState<TaskHoursProps[] | null>(null);

  useEffect(() => {
    const fetchTaskHours = async () => {
      const { data } = await getTaskHours(task_id);
      setTaskHours(data);
    };

    fetchTaskHours();
  }, [task_id]);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Opravljene ure</TableHead>
          <TableHead>Opis</TableHead>
          <TableHead>Datum</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {taskHours &&
          taskHours.map((taskHour) => {
            return <TaskHoursRow key={taskHour.id} taskHour={taskHour} />;
          })}
      </TableBody>
    </Table>
  );
};

export default TaskHoursTable;
