import { getProjectWithCreator } from "@/actions/projects";
import { ProjectDetails } from "@/components";

const ProjectDetailsPage = async (props: {
  params: Promise<{ projectId: string }>;
}) => {
  const params = await props.params;
  const projectId = params.projectId;
  const { data: project } = await getProjectWithCreator(projectId);

  if (!project) {
    return <div>Projekta nismo našli</div>;
  } else {
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white text-slate-900">
        <ProjectDetails project={project} />
      </main>
    );
  }
};

export default ProjectDetailsPage;
