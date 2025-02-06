import { getUser } from "@/actions/auth";
import {
  getCompleteProjectPhase,
  getProjectWithCreator,
} from "@/actions/projects";
import { getTasksWithNames } from "@/actions/tasks";
import { NextPhaseModal, ProjectDetails, UtilityBox } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProjectDetailsPage = async (props: {
  params: Promise<{ projectId: string }>;
}) => {
  const params = await props.params;
  const projectId = params.projectId;
  const [singleProjectResponse, projectResponse, tasksResponse, user] =
    await Promise.all([
      getProjectWithCreator(projectId),
      getCompleteProjectPhase(projectId, "priprava-in-oblikovanje"),
      getTasksWithNames(projectId, "priprava-in-oblikovanje"),
      getUser(),
    ]);

  if (
    user.user_metadata.department !== "priprava-in-oblikovanje" &&
    user.user_metadata.role !== "superadmin" &&
    user.user_metadata.role !== "admin"
  )
    redirect("/unauthorized");

  const project = projectResponse.data;
  const tasks = tasksResponse.data;
  const role = user.user_metadata.role;

  const tasksCompleted =
    tasksResponse.data &&
    (tasksResponse.data.length === 0 ||
      tasksResponse.data.every((task) => task.status === "completed"));

  if (!project || !singleProjectResponse.data) {
    return <div>Projekta nismo našli</div>;
  } else {
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white text-slate-900">
        <ProjectDetails project={singleProjectResponse.data} />
        <Tabs defaultValue="naloge" className="w-full flex-1">
          <div className="flex justify-between">
            <TabsList className="py-8 rounded-[30px]">
              <TabsTrigger className="py-4 px-8 rounded-[30px]" value="naloge">
                Naloge
              </TabsTrigger>
              <TabsTrigger
                className="py-4 px-8 rounded-[30px]"
                value="tehnični-podatki"
              >
                Tehnični podatki
              </TabsTrigger>
              <TabsTrigger
                className="py-4 px-8 rounded-[30px]"
                value="navodila"
              >
                Navodila
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
              phase="priprava-in-oblikovanje"
              data={tasks}
              project={project}
              user={user}
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
          <TabsContent value="navodila">
            <div
              className={`border bg-white w-full shadow-2xl p-8 rounded-xl flex gap-8`}
            >
              <div className="flex flex-col gap-4">
                {project.project_data.type === "knjiga" && (
                  <>
                    <div className="flex gap-4">
                      <p>OBLIKOVANJE:</p>
                      <p>{project.oblikovanje}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-between align-items w-full">
          {role === "superadmin" ||
            (role === "admin" && (
              <Link
                className="border border-black py-2 px-4 rounded-full"
                href={`/projekti/${project.project_data.id}`}
              >
                Pregled projekta
              </Link>
            ))}

          {/* <UtilityBox type="datoteke" data={tasks} projectId={project.id} /> */}
          {tasksCompleted && (role === "superadmin" || role === "admin") && (
            <NextPhaseModal phase="tisk" project={project} />
          )}
        </div>
      </main>
    );
  }
};

export default ProjectDetailsPage;
