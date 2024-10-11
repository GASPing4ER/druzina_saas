import { DashboardProjectsDisplay, ProjectsCarousel } from "@/components";
import { projectsDummyData } from "@/constants";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start pl-12 py-6 bg-white w-[1000px]">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold">
            Pozdravljeni, {user?.firstName}!
          </h1>
          <p className="font-semibold">Preveri pretekle dejavnosti.</p>
        </div>
        <button className="text-zinc-400 py-3 px-8 border border-zinc-400 rounded-xl">
          Oktober 2024
        </button>
      </div>
      <ProjectsCarousel projects={projectsDummyData} />
      <DashboardProjectsDisplay projects={projectsDummyData} />
    </main>
  );
}
