"use client";

import { supabase } from "@/lib/supabase";
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

const TopBar = ({ user }: { user: User }) => {
  const [projectName, setProjectName] = useState("");
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const paths = path.split("/");
  const navDetails = getPathname(paths[1]);

  useEffect(() => {
    const getProject = async () => {
      const { data } = await supabase
        .from("projects")
        .select()
        .eq("id", paths[2])
        .maybeSingle();

      const projectName = data?.name || "";
      setProjectName(projectName);
    };
    getProject();
  }, [paths]);

  return (
    <section className="w-full py-6 px-12 border-b border-black flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Link
          href={navDetails?.url as string}
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
