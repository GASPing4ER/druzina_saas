import { getProjectPhases } from "@/actions/project-phases";
import { getProject } from "@/actions/projects";
import { ProjectDetails, ProjectTimeline } from "@/components";

const ProjectDetailsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const projectId = params.projectId;
  const [projectDataResult, projectPhasesResult] = await Promise.all([
    getProject(projectId),
    getProjectPhases(projectId),
  ]);

  const { data: project } = projectDataResult;
  const { data: projectPhases } = projectPhasesResult;
  console.log("project phases:", projectPhases);
  if (!project) {
    return <div>ProjectDetailsPage</div>;
  } else {
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white text-slate-900">
        <ProjectDetails project={project} />
        {projectPhases && (
          <ProjectTimeline
            project_end_date={project.project_data.end_date}
            phases={projectPhases}
          />
        )}
      </main>
    );
  }
};

export default ProjectDetailsPage;
