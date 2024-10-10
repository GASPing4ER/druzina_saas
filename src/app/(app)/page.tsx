import { ProjectsCarousel } from "@/components";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start px-12 py-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">
          Pozdravljeni, {user?.firstName}!
        </h1>
        <p className="font-semibold">Preveri pretekle dejavnosti.</p>
      </div>
      <ProjectsCarousel />
      <SignOutButton />
    </main>
  );
}
