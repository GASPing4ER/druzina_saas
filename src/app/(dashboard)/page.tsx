import { getUser } from "@/actions/auth";
import { getAllProjects } from "@/actions/projects";
import { getUserTasks } from "@/actions/tasks";
import { DashboardProjectsDisplay, ProjectsCarousel } from "@/components";

export default async function Home() {
  const user = await getUser();
  const [projectsResponse, tasksResponse] = await Promise.all([
    getAllProjects(user),
    getUserTasks(user.id),
  ]);
  let filteredProjects;
  const projects = projectsResponse.data;
  const tasks = tasksResponse.data;

  if (user.user_metadata.role !== "member") {
    filteredProjects = projects || [];
  } else {
    filteredProjects = projects
      ? projects.filter((project) =>
          tasks?.find((task) => task.project_id === project.project_id)
        )
      : [];
  }
  console.log("PROJECTS:", projects);
  console.log("TASKS:", tasks);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start pl-12 py-6 bg-white w-[1000px]">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold">
            Pozdravljeni, {user?.user_metadata.first_name}!
          </h1>
          <p className="font-semibold">Preveri pretekle dejavnosti.</p>
        </div>
        <button className="text-zinc-400 py-3 px-8 border border-zinc-400 rounded-xl">
          Oktober 2024
        </button>
      </div>
      {projects !== null && (
        <>
          <ProjectsCarousel projects={filteredProjects} />
          <DashboardProjectsDisplay projects={filteredProjects} />
        </>
      )}
    </main>
  );
}
