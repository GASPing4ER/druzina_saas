import { getUser } from "@/actions/auth";
import { getOffererWithOfferId } from "@/actions/offers";
import {
  getCompleteProjectPhase,
  getProjectWithCreator,
} from "@/actions/projects";
import { ProjectDetails } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/utils";
import Link from "next/link";

const ProjectDetailsPage = async (props: {
  params: Promise<{ projectId: string }>;
}) => {
  const params = await props.params;
  const projectId = params.projectId;
  const [singleProjectResponse, projectResponse, user] = await Promise.all([
    getProjectWithCreator(projectId, true),
    getCompleteProjectPhase(projectId, "tisk"),
    getUser(),
  ]);

  let offerer;

  if (projectResponse.data && projectResponse.data.ponudba_id) {
    const { data } = await getOffererWithOfferId(
      projectResponse.data.ponudba_id
    );
    offerer = data?.offerer.name;
  }

  const project = projectResponse.data;
  const role = user.user_metadata.role;
  if (!project || !singleProjectResponse.data) {
    return <div>Projekta nismo našli</div>;
  } else {
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white text-slate-900">
        <ProjectDetails project={singleProjectResponse.data} />
        <Tabs defaultValue="izvajalec" className="w-full flex-1">
          <div className="flex justify-between">
            <TabsList className="py-8 rounded-[30px]">
              <TabsTrigger
                className="py-4 px-8 rounded-[30px]"
                value="izvajalec"
              >
                Izvajalec
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
                Rok izvedbe:{" "}
                {project.end_date ? formatDate(project.end_date) : ""}
              </p>
            </div>
          </div>
          <TabsContent value="izvajalec">
            <p className="text-2xl px-8 py-4">{offerer}</p>
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
          {(role === "superadmin" || role === "admin") && (
            <Link
              className="border border-black py-2 px-4 rounded-full"
              href={`/${
                project.project_data.status === "zaključeno"
                  ? "arhiv"
                  : "projekti"
              }/${project.project_data.id}`}
            >
              Pregled projekta
            </Link>
          )}
          {/* {(role === "superadmin" || role === "admin") && (
            <NextPhaseModal phase="tisk" project={project} />
          )} */}
        </div>
      </main>
    );
  }
};

export default ProjectDetailsPage;
