"use client";

import { redirect, usePathname } from "next/navigation";

const Redirector = ({ project }: { project: ProjectProps }) => {
  const path = usePathname();
  if (!path.includes(project.current_phase)) {
    redirect(`/phase/${project.current_phase}/${project.id}`);
  }
  return <></>;
};

export default Redirector;
