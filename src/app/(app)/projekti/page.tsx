import { getProjects } from "@/actions/projects";
import { ProjectsTable } from "@/components";

const ProjektiPage = async () => {
  const projects: ProjectsProps | null = await getProjects();
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && <ProjectsTable projects={projects} />}
    </main>
  );
};

export default ProjektiPage;
