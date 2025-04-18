import { getUser } from "@/actions/auth";
import { getProjectsWithCreator } from "@/actions/projects";
import { ProjectsTable } from "@/components";

const ProjektiPage = async () => {
  const user = await getUser();
  const { data: projects } = await getProjectsWithCreator(user);
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white w-full">
      {projects && <ProjectsTable projects={projects} />}
    </main>
  );
};

export default ProjektiPage;
