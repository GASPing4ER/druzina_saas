import { supabase } from "@/lib/supabase";

const ProjectDetailsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const projectId = params.projectId;
  const project = await supabase
    .from("projects")
    .select()
    .eq("id", projectId)
    .maybeSingle();
  console.log(project);
  if (!project) {
    return <div>ProjectDetailsPage</div>;
  } else {
    return <div>Project found!</div>;
  }
};

export default ProjectDetailsPage;
