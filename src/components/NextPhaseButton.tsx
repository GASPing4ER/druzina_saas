"use client";

import { updateProject } from "@/actions/projects";
import { updateData } from "@/utils";
import { useRouter } from "next/navigation";

const NextPhaseButton = ({ project }: { project: ProjectProps }) => {
  const router = useRouter();
  const handleNextPhase = async () => {
    const updatedData = updateData(project);
    if (updatedData) {
      try {
        console.log("Updating...");
        updateProject(updatedData, project.id);
        router.push(`/${updatedData.current_phase}/${project.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return <button onClick={handleNextPhase}>Naslednja faza</button>;
};

export default NextPhaseButton;
