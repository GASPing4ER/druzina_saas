import { ProjectDetails } from "@/components";
import { supabase } from "@/lib/supabase";

const ProjectDetailsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const projectId = params.projectId;
  const response = await supabase
    .from("projects")
    .select()
    .eq("id", projectId)
    .maybeSingle();

  const project: ProjectProps | null = response.data;
  if (!project) {
    return <div>ProjectDetailsPage</div>;
  } else {
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white text-slate-900">
        <ProjectDetails project={project} />
      </main>
    );
  }
};

export default ProjectDetailsPage;
