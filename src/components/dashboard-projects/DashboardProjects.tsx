import Link from "next/link";
import { ProgressBar } from "@/components";
import Image from "next/image";
import { formatDate, getPhaseName } from "@/utils";
import { CompleteProjectPhaseProps } from "@/types";

type DashboardProjectsProps = {
  projects: CompleteProjectPhaseProps[];
};

const DashboardProjects = ({ projects }: DashboardProjectsProps) => {
  return (
    <ul className="flex flex-col gap-3 w-full">
      {projects.map((project) => {
        return (
          <li key={project.id}>
            <Link
              href={`/${project.name}/${project.project_data.id}`}
              className="flex justify-between items-center bg-slate-100 py-4 px-8 w-full rounded-xl"
            >
              <div className="flex gap-4">
                <h2 className="font-semibold">{project.project_data.name}</h2>
                <h3>{getPhaseName(project.name)}</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-[100px]">
                  <ProgressBar stanje={project.project_data.stanje} />
                </div>
                {project.project_data.stanje}%
                {/* <div className="text-sm bg-slate-200 py-1 px-4 rounded-2xl">
                  TODO: Dynamic tasks tracking
                  1/3
                </div> */}
                <div className="text-sm bg-slate-200 py-1 px-4 rounded-2xl">
                  {formatDate(project.project_data.end_date)}
                </div>
                <Image
                  src="/icons/user.svg"
                  alt="user"
                  width={30}
                  height={30}
                  className="bg-stone-400 p-1 rounded-full"
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DashboardProjects;
