import { getUser } from "@/actions/auth";
import { getFiles } from "@/actions/files";
import { getProject } from "@/actions/projects";
import { getTasksWithNames } from "@/actions/tasks";
import {
  NextPhaseModal,
  ProgressBar,
  ProjectDetails,
  UtilityBox,
} from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectDetailsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const projectId = params.projectId;
  const [projectResponse, tasksResponse, filesResponse, userResponse] =
    await Promise.all([
      getProject(projectId),
      getTasksWithNames(projectId),
      getFiles(projectId),
      getUser(),
    ]);
  const project = projectResponse.data;
  const tasks = tasksResponse.data;
  const files = filesResponse.data;
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
        <div className="flex w-full gap-10">
          <Tabs defaultValue="naloge" className="w-[60%]">
            <TabsList>
              <TabsTrigger value="naloge">Naloge</TabsTrigger>
              <TabsTrigger value="datoteke">Datoteke</TabsTrigger>
              <TabsTrigger value="aktivnosti">Aktivnosti</TabsTrigger>
            </TabsList>
            <TabsContent value="naloge">
              <UtilityBox
                type="naloge"
                data={tasks}
                projectId={projectId}
                role={role}
              />
            </TabsContent>
            <TabsContent value="datoteke">
              <UtilityBox
                type="datoteke"
                data={files}
                projectId={projectId}
                role={role}
              />
            </TabsContent>
            <TabsContent value="aktivnosti">Tukaj bodo aktivnosti.</TabsContent>
          </Tabs>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-col gap-2 border shadow-2xl rounded-xl p-4">
              <h2 className="text-black text-2xl">Še 6 dni</h2>
              <ProgressBar stanje={70} />
            </div>
            <UtilityBox
              type="opombe"
              data={[]}
              projectId={projectId}
              role={role}
            />
          </div>
        </div>

        {/* <UtilityBox type="datoteke" data={tasks} projectId={project.id} /> */}
        {tasksCompleted && role === "superadmin" && (
          <NextPhaseModal phase="priprava-za-tisk" project={project} />
        )}
      </main>
    );
  }
};

export default ProjectDetailsPage;
