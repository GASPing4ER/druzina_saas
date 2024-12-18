import { getUser } from "@/actions/auth";
import { getFiles } from "@/actions/files";
import { getProject, getSingleProject } from "@/actions/projects";
import { getTasksWithNames } from "@/actions/tasks";
import { NextPhaseModal, ProjectDetails, UtilityBox } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProjectDetailsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const projectId = params.projectId;
  const [
    singleProjectResponse,
    projectResponse,
    tasksResponse,
    filesResponse,
    user,
  ] = await Promise.all([
    getSingleProject(projectId),
    getProject(projectId, "urednistvo"),
    getTasksWithNames(projectId, "urednistvo"),
    getFiles(projectId),
    getUser(),
  ]);

  if (
    user.user_metadata.department !== "urednistvo" &&
    user.user_metadata.role !== "superadmin"
  )
    redirect("/unauthorized");

  const singleProject = singleProjectResponse.data;
  const project = projectResponse.data;

  const tasks = tasksResponse.data;
  const files = filesResponse.data;
  const role = user.user_metadata.role;

  const tasksCompleted =
    tasks &&
    (tasks.length === 0 || tasks.every((task) => task.status === "completed"));
  if (!project || !singleProject) {
    return <div>Projekta nismo našli</div>;
  } else {
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white text-slate-900">
        <ProjectDetails project={singleProject} />
        <Tabs defaultValue="naloge" className="w-full flex-1">
          <div className="flex justify-between">
            <TabsList className="py-8 rounded-[30px]">
              <TabsTrigger className="py-4 px-8 rounded-[30px]" value="naloge">
                Naloge
              </TabsTrigger>
              <TabsTrigger
                className="py-4 px-8 rounded-[30px]"
                value="datoteke"
              >
                Datoteke
              </TabsTrigger>
              <TabsTrigger
                className="py-4 px-8 rounded-[30px]"
                value="tehnični-podatki"
              >
                Tehnični podatki
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-col gap-2">
              <p>
                Začetek faze:{" "}
                {project.start_date
                  ? formatDate(project.start_date)
                  : formatDate(project.project_data.start_date)}
              </p>
              <p>
                Konec faze:{" "}
                {project.end_date ? formatDate(project.end_date) : ""}
              </p>
            </div>
          </div>
          <TabsContent value="naloge">
            <UtilityBox
              type="naloge"
              phase="urednistvo"
              data={tasks}
              projectId={projectId}
              role={role}
            />
          </TabsContent>
          <TabsContent value="datoteke">
            <UtilityBox
              type="datoteke"
              phase="urednistvo"
              data={files}
              projectId={projectId}
              role={role}
            />
          </TabsContent>
          <TabsContent value="tehnični-podatki">
            <div
              className={`border bg-white w-full shadow-2xl p-8 rounded-xl flex gap-8`}
            >
              <div className="flex flex-col gap-4">
                <p>FORMAT: {project.project_data.format}</p>
                <p>OBSEG: {project.project_data.obseg}</p>
                <p>MATERIAL: {project.project_data.material}</p>
                <p>TISK: {project.project_data.tisk}</p>
              </div>
              <div className="flex flex-col gap-4">
                <p>VEZAVA: {project.project_data.vezava}</p>
                <p>PAKIRANJE: {project.project_data.pakiranje}</p>
                <p>NAKLADA: {project.project_data.naklada}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-between align-items w-full">
          <Link
            className="border border-black py-2 px-4 rounded-full"
            href={`/projekti/${project.project_data.id}`}
          >
            Pregled projekta
          </Link>

          {/* <UtilityBox type="datoteke" data={tasks} projectId={project.id} /> */}
          {tasksCompleted && role === "superadmin" && (
            <NextPhaseModal phase="priprava-in-oblikovanje" project={project} />
          )}
        </div>
      </main>
    );
  }
};

export default ProjectDetailsPage;
