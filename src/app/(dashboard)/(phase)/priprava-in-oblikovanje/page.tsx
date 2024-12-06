import { getPhaseProjects } from "@/actions/projects";
import { PhaseTable } from "@/components";

const PripravaZaTiskPage = async () => {
  const { data: projects, message } = await getPhaseProjects(
    "priprava-in-oblikovanje"
  );
  console.log(projects, message);
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && projects.length !== 0 && (
        <PhaseTable projects={projects} phase="priprava-in-oblikovanje" />
      )}
    </main>
  );
};

export default PripravaZaTiskPage;
