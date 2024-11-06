import { getPhaseProjects } from "@/actions/projects";
import { ProjectsTable } from "@/components";

const DostavaPage = async () => {
  const { data: projects } = await getPhaseProjects("prevzem");

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && projects.length !== 0 && (
        <ProjectsTable projects={projects} phase="prevzem" />
      )}
    </main>
  );
};

export default DostavaPage;
