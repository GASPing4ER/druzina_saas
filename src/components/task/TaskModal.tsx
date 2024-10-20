import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { TaskWithNamesProps } from "@/types";
import { formatDate } from "@/utils";
import { Dispatch, SetStateAction } from "react";

type TaskModalProps = {
  task: TaskWithNamesProps;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const TaskModal = ({ task, open, setOpen }: TaskModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="text-black flex flex-col gap-2 p-2">
            {/* You can display the task details here */}
            <h2 className="uppercase font-bold text-xl">{task.name}</h2>
            <p className="uppercase italic underline">
              {formatDate(task.start_date)} - {formatDate(task.end_date)}
            </p>
            <p>{task.description}</p>
            <p>
              <strong>Dodelil:</strong> {task.assigner.first_name}{" "}
              {task.assigner.last_name}
            </p>
            <p>
              <strong>Izvaja:</strong> {task.employee.first_name}{" "}
              {task.employee.last_name}
            </p>
            <p>
              <strong>Prioriteta:</strong> {task.priority}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
