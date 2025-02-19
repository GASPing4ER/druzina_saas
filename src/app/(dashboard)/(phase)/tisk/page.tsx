import { getUser } from "@/actions/auth";
import { getPhaseProjectsWithOfferer } from "@/actions/projects";
import { TiskPhaseTable } from "@/components";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const TiskPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const [user, projectdWithOffererResponse, params] = await Promise.all([
    getUser(),
    getPhaseProjectsWithOfferer("tisk"),
    searchParams,
  ]);

  if (
    user.user_metadata.department !== "tisk" &&
    user.user_metadata.role !== "superadmin" &&
    user.user_metadata.role !== "admin"
  )
    redirect("/unauthorized");

  let projects = projectdWithOffererResponse.data;

  if (params.type && projects) {
    projects = projects.filter(
      (project) => project.offers?.offerers?.slug === params.type
    );
  }
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && projects.length !== 0 && (
        <TiskPhaseTable projects={projects} />
      )}
    </main>
  );
};

export default TiskPage;
