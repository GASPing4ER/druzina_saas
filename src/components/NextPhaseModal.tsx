"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NextPhaseForm } from "@/components";
import { useState } from "react";
import { CompleteProjectPhaseProps } from "@/types";

type NextPhaseModalProps = {
  phase: string;
  project: CompleteProjectPhaseProps;
};

const NextPhaseModal = ({ phase, project }: NextPhaseModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-black py-2 px-4 rounded-full flex items-center justify-center">
      <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
        <DialogTrigger>Končaj fazo</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Ali ste prepričani, da želite zaključiti fazo?
            </DialogTitle>
            <DialogDescription>
              Tega dejanja ne boste mogli preklicati.
            </DialogDescription>
          </DialogHeader>
          <NextPhaseForm
            phase={phase}
            project={project}
            onOpen={() => setOpen((prev) => !prev)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NextPhaseModal;
