import { getUser } from "@/actions/auth";
import { getArhivProjectsWithCreator } from "@/actions/projects";
import { ProjectsTable } from "@/components";

const ArhivPage = async () => {
  const user = await getUser();
  const { data: projects } = await getArhivProjectsWithCreator(user);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && projects.length !== 0 && (
        <ProjectsTable projects={projects} is_arhiv={true} />
      )}
    </main>
  );
};

export default ArhivPage;
