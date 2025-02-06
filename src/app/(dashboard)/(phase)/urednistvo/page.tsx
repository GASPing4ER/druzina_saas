import { getUser } from "@/actions/auth";
import { getPhaseProjects } from "@/actions/projects";
import { PhaseTable } from "@/components";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const UrednistvoPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const [user, projectsResponse, params] = await Promise.all([
    getUser(),
    getPhaseProjects("urednistvo"),
    searchParams,
  ]);

  if (
    user.user_metadata.department !== "urednistvo" &&
    user.user_metadata.role !== "superadmin" &&
    user.user_metadata.role !== "admin"
  )
    redirect("/unauthorized");
  let projects = projectsResponse.data;

  console.log(projectsResponse.data);
  if (params.type && projects) {
    projects = projects.filter(
      (project) => project.project_data.type === params.type
    );
  }

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && projects.length !== 0 && (
        <PhaseTable projects={projects} phase="urednistvo" />
      )}
    </main>
  );
};

export default UrednistvoPage;
