import { getUser } from "@/actions/auth";
import { getPhaseProjects } from "@/actions/projects";
import { ProjectsTable } from "@/components";
import { redirect } from "next/navigation";

const UrednistvoPage = async () => {
  const [user, projects] = await Promise.all([
    getUser(),
    getPhaseProjects("urednistvo"),
  ]);

  if (
    user.user_metadata.department !== "urednistvo" &&
    user.user_metadata.role !== "superadmin"
  )
    redirect("/unauthorized");

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white">
      {projects && projects.length !== 0 && (
        <ProjectsTable projects={projects} phase="urednistvo" />
      )}
    </main>
  );
};

export default UrednistvoPage;
