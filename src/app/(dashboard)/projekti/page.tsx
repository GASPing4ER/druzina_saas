import { getProjects } from "@/actions/projects";
import { ProjectsTable } from "@/components";
import { createClient } from "@/utils/supabase/server";

const ProjektiPage = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const projects: ProjectsProps | null = await getProjects(data.user!);
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && <ProjectsTable projects={projects} />}
    </main>
  );
};

export default ProjektiPage;
