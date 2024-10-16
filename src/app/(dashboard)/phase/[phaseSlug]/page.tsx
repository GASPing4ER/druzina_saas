import { getPhaseProjects } from "@/actions/projects";
import { ProjectsTable } from "@/components";

const PhasePage = async ({ params }: { params: { phaseSlug: string } }) => {
  const phase = params.phaseSlug;
  const projects: ProjectsProps | null = await getPhaseProjects(phase);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && projects.length !== 0 && (
        <ProjectsTable projects={projects} phase={phase} />
      )}
    </main>
  );
};

export default PhasePage;
