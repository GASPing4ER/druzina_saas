import { getProject } from "@/actions/projects";
import { ProjectDetails } from "@/components";

const ProjectDetailsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const projectId = params.projectId;
  const project = await getProject(projectId);
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
