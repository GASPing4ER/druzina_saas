import { getUser } from "@/actions/auth";
import { getProject } from "@/actions/projects";
import { getTasks } from "@/actions/tasks";
import { NextPhaseModal, ProjectDetails, UtilityBox } from "@/components";

const ProjectDetailsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const projectId = params.projectId;
  const [projectResponse, tasksResponse, userResponse] = await Promise.all([
    getProject(projectId),
    getTasks(projectId),
    getUser(),
  ]);
  const project = projectResponse.data;
  const tasks = tasksResponse.data;
  const role = userResponse.user_metadata.role;
  const tasksCompleted =
    tasks &&
    (tasks.length === 0 || tasks.every((task) => task.status === "completed"));
  if (!project) {
    return <div>Projekta nismo našli</div>;
  } else {
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white text-slate-900">
        <ProjectDetails project={project} />
        <UtilityBox type="naloge" data={tasks} projectId={project.id} />
        {/* <UtilityBox type="datoteke" data={tasks} projectId={project.id} /> */}
        {tasksCompleted && role === "superadmin" && (
          <NextPhaseModal phase="priprava-za-tisk" project={project} />
        )}
      </main>
    );
  }
};

export default ProjectDetailsPage;
