import { getPhaseProjectsWithOfferer } from "@/actions/projects";
import { TiskPhaseTable } from "@/components";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const TiskPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const [projectdWithOffererResponse, params] = await Promise.all([
    getPhaseProjectsWithOfferer("tisk"),
    searchParams,
  ]);

  let projects = projectdWithOffererResponse.data;

  if (params.type && projects) {
    projects = projects.filter(
      (project) => project.offers?.offerers?.slug === params.type
    );
  }
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && projects.length !== 0 && (
        <TiskPhaseTable projects={projects} />
      )}
    </main>
  );
};

export default TiskPage;
