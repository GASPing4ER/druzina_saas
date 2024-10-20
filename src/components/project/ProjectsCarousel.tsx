import Image from "next/image";
import { ProgressBar } from "@/components";
import {
  carouselProjectBgColors,
  carouselProjectUserColors,
} from "@/constants";
import { formatDate } from "@/utils";
import Link from "next/link";
import { ProjectsProps } from "@/types";

type ProjectsCarouselProps = {
  projects: ProjectsProps;
};

const ProjectsCarousel = async ({ projects }: ProjectsCarouselProps) => {
  return (
    <div className="w-[964px] overflow-x-scroll whitespace-nowrap flex gap-8 pb-4">
      {projects.map((project, index) => {
        const colorIndex = index % 3;
        return (
          <Link
            key={project.id}
            href={`/${project.current_phase}/${project.id}`}
          >
            <div key={project.id} className="inline-block">
              <div
                className="h-[175px] w-[300px] rounded-xl flex flex-col p-6 justify-between"
                style={{
                  backgroundColor: `${carouselProjectBgColors[colorIndex]}`,
                }}
              >
                <h2 className="text-white font-bold">{project.name}</h2>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-white">
                    <p>Napredek</p>
                    <p>{project.stanje} %</p>
                  </div>
                  <ProgressBar stanje={project.stanje} />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-white font-semibold bg-slate-300 py-1 px-4 rounded-xl">
                    {formatDate(project.end_date)}
                  </p>
                  <div className="flex">
                    {carouselProjectUserColors.map((color: string) => (
                      <Image
                        key={color}
                        src="/icons/user.svg"
                        alt="user"
                        width={25}
                        height={25}
                        className="p-1 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectsCarousel;
