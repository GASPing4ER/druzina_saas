"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskWithNamesProps } from "@/types";
import { Dispatch, SetStateAction, Suspense } from "react";
import { TaskHoursEditForm, TaskHoursTable } from "@/components";

type TaskHoursEditModalProps = {
  task: TaskWithNamesProps;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const TaskHoursEditModal = ({
  task,
  open,
  setOpen,
}: TaskHoursEditModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj ure</DialogTitle>
          <DialogDescription className="text-black flex flex-col gap-2 p-2">
            Dobrodošli v obrazcu za dodajanje ur
          </DialogDescription>
        </DialogHeader>
        <TaskHoursEditForm
          task={task}
          projectId={task.project_id}
          handleClose={() => setOpen(false)}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <TaskHoursTable task_id={task.id} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default TaskHoursEditModal;
