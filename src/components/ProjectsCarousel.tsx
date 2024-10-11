import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

const ProjectsCarousel = async ({ projects }: ProjectsCarouselProps) => {
  const user = await currentUser();
  return (
    <div className="w-[964px] overflow-x-scroll whitespace-nowrap flex gap-8 pb-4">
      {/* TODO: Add projects parameter and map over them. Here is UI example of a
      project: */}
      {projects.map((project) => {
        return (
          <div key={project.id} className="inline-block">
            <div className="h-[175px] w-[300px] bg-violet-500/60 rounded-xl flex flex-col p-6 justify-between">
              <h2>{project.naziv}</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p>Napredek</p>
                  <p>{project.stanje} %</p>
                </div>
                <ProgressBar stanje={project.stanje} />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-white bg-slate-300 py-1 px-4 rounded-xl">
                  {project.end_date}
                </p>
                <div className="flex">
                  <Image
                    src={user?.imageUrl as string}
                    alt="user"
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                  <Image
                    src={user?.imageUrl as string}
                    alt="user"
                    width={25}
                    height={25}
                    className="rounded-full -ml-1"
                  />
                  <Image
                    src={user?.imageUrl as string}
                    alt="user"
                    width={25}
                    height={25}
                    className="rounded-full -ml-1"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsCarousel;
