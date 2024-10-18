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

const UtilityModal = ({
  type,
  projectId,
}: {
  type: string;
  projectId: string;
}) => {
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
              handleClose={() => setOpen(false)}
            />
          ) : (
            <FileForm
              projectId={projectId}
              handleClose={() => setOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UtilityModal;
