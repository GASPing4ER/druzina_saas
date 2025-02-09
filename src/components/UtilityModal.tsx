"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TaskForm, FileForm } from "@/components";

type UtilityModalProps = {
  type: string;
  phase: string;
  projectId: string;
};

const UtilityModal = ({ type, phase, projectId }: UtilityModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
        <DialogTrigger className="bg-green-600/60 px-2 rounded-full text-white font-bold text-lg">
          +
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Ustvari {type === "naloge" ? "nalogo" : "datoteko"}
            </DialogTitle>
            <DialogDescription>
              Dobrodošli v obrazcu za ustvarjanje{" "}
              {type === "naloge" ? "nalog" : "datotek"}
            </DialogDescription>
          </DialogHeader>
          {type === "naloge" ? (
            <TaskForm
              projectId={projectId}
              phase={phase}
              handleClose={() => setOpen(false)}
            />
          ) : (
            <FileForm
              projectId={projectId}
              phase={phase}
              handleClose={() => setOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UtilityModal;
