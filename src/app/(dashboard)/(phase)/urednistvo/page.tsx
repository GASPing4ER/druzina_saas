import { getPhaseProjects } from "@/actions/projects";
import { ProjectsTable } from "@/components";
import { ProjectsProps } from "@/types";

const UrednistvoPage = async () => {
  const projects: ProjectsProps | null = await getPhaseProjects("urednistvo");

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && projects.length !== 0 && (
        <ProjectsTable projects={projects} phase="urednistvo" />
      )}
    </main>
  );
};

export default UrednistvoPage;
