import { getPhaseProjects } from "@/actions/projects";
import { PhaseTable } from "@/components";

const TiskPage = async () => {
  const { data: projects } = await getPhaseProjects("tisk");

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && projects.length !== 0 && (
        <PhaseTable projects={projects} phase="tisk" />
      )}
    </main>
  );
};

export default TiskPage;
