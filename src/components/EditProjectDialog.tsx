"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  BookForm,
  OtherForm,
  PublicationsForm,
  TednikForm,
} from "@/components";
import { ProjectWithCreatorProps } from "@/types";
import { User } from "@supabase/supabase-js";
import { useState } from "react";

type EditProjectDialogProps = {
  project: ProjectWithCreatorProps;
  user: User;
};

const EditProjectDialog = ({ project, user }: EditProjectDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const renderForm = () => {
    switch (project.type) {
      case "knjiga":
        return (
          <BookForm
            user={user}
            project={project}
            action="edit"
            handleClose={handleClose}
          />
        );
      case "drugo":
        return (
          <OtherForm
            user={user}
            project={project}
            action="edit"
            handleClose={handleClose}
          />
        );
      case "publikacije":
        return (
          <PublicationsForm
            user={user}
            project={project}
            action="edit"
            handleClose={handleClose}
          />
        );
      case "tednik":
        return (
          <TednikForm
            user={user}
            project={project}
            action="edit"
            handleClose={handleClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {user.user_metadata.role.includes("admin") && (
          <Image
            src="/icons/edit.svg"
            alt="edit icon"
            width={20}
            height={20}
            className="absolute top-5 right-10 cursor-pointer"
          />
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full">
        <DialogTitle>POSODOBI PROJEKT</DialogTitle>
        <DialogDescription>Posodobi podatke o projektu.</DialogDescription>
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectDialog;
