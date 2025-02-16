"use client";

import { MouseEvent, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { TaskHoursEditModal } from "@/components";
import { User } from "@supabase/supabase-js";
import { TaskWithNamesProps } from "@/types";
import Image from "next/image";
import { X } from "lucide-react";
import { deleteTask } from "@/actions/tasks";

type TaskRowProps = {
  task: TaskWithNamesProps;
  user: User;
};

const TaskRow = ({ task, user }: TaskRowProps) => {
  const [openHoursForm, setOpenHoursForm] = useState(false);

  const onHandleDelete = async (taskId: string) => {
    await deleteTask(taskId);
  };
  return (
    <>
      <TableRow className="cursor-pointer">
        <TableCell>
          {(user.id === task.employee_id ||
            user.user_metadata.role === "superadmin" ||
            user.user_metadata.role === "admin") && (
            <Image
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                setOpenHoursForm(true);
              }}
              src="/icons/edit.svg"
              alt="edit"
              width={25}
              height={25}
            />
          )}
        </TableCell>
        <TableCell>
          {task.employee.first_name} {task.employee.last_name}
        </TableCell>

        <TableCell className="flex justify-between gap-4">
          {/* <TaskStatusButton task={task} user={user} /> */}
          {user.user_metadata.role.includes("admin") && (
            <X onClick={() => onHandleDelete(task.id)} />
          )}
        </TableCell>
      </TableRow>
      <TaskHoursEditModal
        task={task}
        open={openHoursForm}
        setOpen={setOpenHoursForm}
      />
    </>
  );
};

export default TaskRow;
