import Link from "next/link";
import ProgressBar from "./ProgressBar";
import Image from "next/image";
import { formatDate } from "@/utils";

const DashboardProjects = async ({ projects }: DashboardProjectsProps) => {
  return (
    <ul className="flex flex-col gap-3 w-full">
      {projects.map((project) => {
        return (
          <li key={project.id}>
            <Link
              href="/projekti"
              className="flex justify-between items-center bg-slate-100 py-4 px-8 w-full rounded-xl"
            >
              <h2 className="font-semibold">{project.name}</h2>
              <div className="flex items-center gap-4">
                <div className="w-[100px]">
                  <ProgressBar stanje={project.stanje} />
                </div>
                <div className="text-sm bg-slate-200 py-1 px-4 rounded-2xl">
                  1/3
                </div>
                <div className="text-sm bg-slate-200 py-1 px-4 rounded-2xl">
                  {formatDate(project.end_date)}
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
