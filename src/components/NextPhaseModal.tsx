"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NextPhaseForm from "./NextPhaseForm";
import { useState } from "react";
import { getPhaseName } from "@/utils";

const NextPhaseModal = ({
  phase,
  project,
}: {
  phase: string;
  project: ProjectProps;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-slate-300 text-white py-1 px-8 rounded-xl">
      <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
        <DialogTrigger>NASLEDNJA FAZA</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Premik v fazo {getPhaseName(phase)}</DialogTitle>
            <DialogDescription>
              Dobrodošli v obrazcu za premik v naslednjo fazo projekta.
            </DialogDescription>
          </DialogHeader>
          <NextPhaseForm phase={phase} project={project} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NextPhaseModal;
