import { getUser } from "@/actions/auth";
import { getProjects } from "@/actions/projects";
import { ProjectsTable } from "@/components";

const ProjektiPage = async () => {
  const user = await getUser();
  const { data: projects } = await getProjects(user);
  console.log(projects);
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && <ProjectsTable projects={projects} />}
    </main>
  );
};

export default ProjektiPage;
