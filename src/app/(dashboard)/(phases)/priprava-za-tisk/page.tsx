import { getPhaseProjects } from "@/actions/projects";
import { ProjectsTable } from "@/components";

const PripravaZaTiskPage = async () => {
  const projects: ProjectsProps | null = await getPhaseProjects(
    "priprava za tisk"
  );

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && projects.length !== 0 && (
        <ProjectsTable projects={projects} phase="priprava za tisk" />
      )}
    </main>
  );
};

export default PripravaZaTiskPage;
