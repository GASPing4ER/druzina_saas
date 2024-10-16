"use client";

import { getPathname } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectForm } from "@/components";
import { User } from "@supabase/supabase-js";
import { getProject } from "@/actions/projects";

const TopBar = ({ user }: { user: User }) => {
  const [projectName, setProjectName] = useState("");
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const paths = path.split("/");
  const includesPath = path.includes("phase");
  const navDetails = includesPath
    ? getPathname(paths[2])
    : getPathname(paths[1]);

  useEffect(() => {
    const getProjectData = async () => {
      const project = await getProject(includesPath ? paths[3] : paths[2]);

      const projectName = project?.name || "";
      setProjectName(projectName);
    };
    getProjectData();
  }, [includesPath, paths]);

  return (
    <section className="w-full py-6 px-12 border-b border-black flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Link
          href={
            includesPath
              ? `/phase/${navDetails?.url as string}`
              : (navDetails?.url as string)
          }
          className="text-xl font-semibold"
        >
          {navDetails?.title || "Url nonexistant"}
        </Link>
        {projectName !== "" && (
          <>
            <p>-</p>
            <h2 className="text-xl">{projectName}</h2>
          </>
        )}
      </div>
      <div className="flex gap-6 items-center">
        <input
          type="text"
          className="bg-slate-300 rounded-xl p-1 pl-4 placeholder:text-slate-950"
          placeholder="Poišči..."
        />
        <div className="w-8 h-8 bg-slate-300 rounded-full" />
        <div className="bg-slate-300 text-white py-1 px-8 rounded-xl">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>+ DODAJ</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dodaj nov projekt</DialogTitle>
                <DialogDescription>
                  Dobrodošli v obrazcu za dodajanje novega projekta.
                </DialogDescription>
              </DialogHeader>
              <ProjectForm user={user} handleClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
