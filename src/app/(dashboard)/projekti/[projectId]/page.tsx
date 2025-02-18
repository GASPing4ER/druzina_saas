import { getActivities } from "@/actions/activities";
import { getUser } from "@/actions/auth";
import { getOffers } from "@/actions/offers";
import { getProjectPhases } from "@/actions/project-phases";
import { getProjectWithCreator } from "@/actions/projects";
import {
  ActivityTable,
  PhaseSpecifications,
  ProjectDetails,
  ProjectTimeline,
} from "@/components";

const ProjectDetailsPage = async (props: {
  params: Promise<{ projectId: string }>;
}) => {
  const params = await props.params;
  const projectId = params.projectId;
  const [
    projectDataResult,
    projectPhasesResult,
    offersResults,
    activitiesResults,
  ] = await Promise.all([
    getProjectWithCreator(projectId),
    getProjectPhases(projectId),
    getOffers(projectId),
    getActivities(projectId),
  ]);
  const { data: project } = projectDataResult;
  const { data: projectPhases } = projectPhasesResult;
  const { data: activities } = activitiesResults;
  const user = await getUser();
  if (!project) {
    return <div>ProjectDetailsPage</div>;
  } else {
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white text-slate-900">
        <ProjectDetails project={project} />
        <div className="flex items-start gap-10 w-full">
          {projectPhases && (
            <ProjectTimeline project={project} phases={projectPhases} />
          )}
          <PhaseSpecifications
            user={user}
            project={project}
            project_phases={projectPhases}
            offers={offersResults.data}
          />
        </div>
        <ActivityTable activities={activities} />
      </main>
    );
  }
};

export default ProjectDetailsPage;
