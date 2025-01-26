import { getUser } from "@/actions/auth";
import {
  getCompleteProjectPhase,
  getProjectWithCreator,
} from "@/actions/projects";
import { NextPhaseModal, ProjectDetails } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/utils";
import Link from "next/link";

const ProjectDetailsPage = async (props: {
  params: Promise<{ projectId: string }>;
}) => {
  const params = await props.params;
  const projectId = params.projectId;
  const [singleProjectResponse, projectResponse, user] = await Promise.all([
    getProjectWithCreator(projectId),
    getCompleteProjectPhase(projectId, "distribucija"),
    getUser(),
  ]);

  const project = projectResponse.data;
  const role = user.user_metadata.role;

  if (!project || !singleProjectResponse.data) {
    return <div>Projekta nismo našli</div>;
  } else {
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white text-slate-900">
        <ProjectDetails project={singleProjectResponse.data} />
        <Tabs defaultValue="prevzem" className="w-full flex-1">
          <div className="flex justify-between">
            <TabsList className="py-8 rounded-[30px]">
              <TabsTrigger className="py-4 px-8 rounded-[30px]" value="prevzem">
                Prevzem
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
          <TabsContent value="prevzem"></TabsContent>
          <TabsContent value="navodila">
            <div
              className={`border bg-white w-full shadow-2xl p-8 rounded-xl flex gap-8`}
            >
              <div className="flex flex-col gap-4">{project.navodila}</div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-between align-items w-full">
          {role === "superadmin" && (
            <Link
              className="border border-black py-2 px-4 rounded-full"
              href={`/projekti/${project.project_data.id}`}
            >
              Pregled projekta
            </Link>
          )}
          {role === "superadmin" && (
            <NextPhaseModal phase="arhiv" project={project} />
          )}
        </div>
      </main>
    );
  }
};

export default ProjectDetailsPage;
