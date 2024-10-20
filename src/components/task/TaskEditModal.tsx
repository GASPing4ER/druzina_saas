import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskWithNamesProps } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { TaskEditForm } from "@/components";

type TaskEditModalProps = {
  task: TaskWithNamesProps;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const TaskEditModal = ({ task, open, setOpen }: TaskEditModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uredi nalogo</DialogTitle>
          <DialogDescription className="text-black flex flex-col gap-2 p-2">
            Dobrodošli v obrazcu za urejanje naloge
          </DialogDescription>
        </DialogHeader>
        <TaskEditForm
          task={task}
          projectId={task.project_id}
          handleClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskEditModal;
