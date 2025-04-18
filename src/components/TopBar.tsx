"use client";

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
import {
  BookForm,
  OtherForm,
  PublicationsForm,
  TednikForm,
  TypeChoice,
} from "@/components";
import { User } from "@supabase/supabase-js";
import { getCompleteProjectPhase } from "@/actions/projects";
import { getPathname } from "@/utils";
import Image from "next/image";
import { Button } from "./ui/button";

type TopBarProps = {
  user: User;
};

const TopBar = ({ user }: TopBarProps) => {
  const [projectName, setProjectName] = useState("");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const path = usePathname();
  const paths = path.split("/");
  const navDetails = getPathname(paths[1]);
  const role = user.user_metadata.role;

  useEffect(() => {
    const getProjectData = async () => {
      const { data } = await getCompleteProjectPhase(paths[2]);
      const projectName = data?.project_data.name || "";
      setProjectName(projectName);
    };
    getProjectData();
  }, [paths]);

  return (
    <section className="w-full py-6 px-12 border-b border-black flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Link
          href={navDetails?.url as string}
          className="text-xl font-semibold flex gap-4 items-center"
        >
          <Image
            src={navDetails?.imgUrl || ""}
            alt={navDetails?.title || ""}
            width={25}
            height={25}
          />
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
        {/* <input
          type="text"
          className="bg-slate-300 rounded-xl p-1 pl-4 placeholder:text-slate-950"
          placeholder="Poišči..."
        />
        <div className="w-8 h-8 bg-slate-300 rounded-full" /> */}
        <div className="bg-black text-white py-1 px-8 rounded-xl border hover:bg-transparent hover:text-black hover:border hover:border-black">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>+ DODAJ</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dodaj nov projekt</DialogTitle>
                <DialogDescription>
                  {type === ""
                    ? "Pozdravljeni! Izberite vrsto projekta za nadaljne ustvarjanje"
                    : "Dobrodošli v obrazcu za dodajanje novega projekta."}
                </DialogDescription>
                {type !== "" && (
                  <Button onClick={() => setType("")}>
                    Zamenjaj vrsto projekta
                  </Button>
                )}
              </DialogHeader>
              {role === "member" ? (
                <OtherForm user={user} handleClose={() => setOpen(false)} />
              ) : type === "" ? (
                <TypeChoice setType={setType} />
              ) : type === "knjiga" ? (
                <BookForm user={user} handleClose={() => setOpen(false)} />
              ) : type === "publikacije" ? (
                <PublicationsForm
                  user={user}
                  handleClose={() => setOpen(false)}
                />
              ) : type === "drugo" ? (
                <OtherForm user={user} handleClose={() => setOpen(false)} />
              ) : (
                <TednikForm user={user} handleClose={() => setOpen(false)} />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
