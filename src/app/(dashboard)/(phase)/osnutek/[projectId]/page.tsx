import { getProject, getSingleProject } from "@/actions/projects";
import { NextPhaseModal, ProjectDetails } from "@/components";

const ProjectDetailsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const projectId = params.projectId;
  const [singleProjectResponse, projectResponse] = await Promise.all([
    getSingleProject(projectId),
    getProject(projectId, "osnutek"),
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
