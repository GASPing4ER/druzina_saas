import { getProject, getProjectWithCreator } from "@/actions/projects";
import { NextPhaseModal, ProjectDetails } from "@/components";

const ProjectDetailsPage = async (props: {
  params: Promise<{ projectId: string }>;
}) => {
  const params = await props.params;
  const projectId = params.projectId;
  const [singleProjectResponse, projectResponse] = await Promise.all([
    getProjectWithCreator(projectId),
    getCompleteProjectPhase(projectId, "osnutek"),
  ]);

  if (!projectResponse.data || !singleProjectResponse.data) {
    return <div>Projekta nismo našli</div>;
  } else {
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white text-slate-900">
        <ProjectDetails project={singleProjectResponse.data} />
        <NextPhaseModal phase="urednistvo" project={projectResponse.data} />
      </main>
    );
  }
};

export default ProjectDetailsPage;
