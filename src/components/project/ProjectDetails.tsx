import { formatDate } from "@/utils";
import { ProgressBar } from "@/components";
import Image from "next/image";
import { CompleteProjectPhaseProps } from "@/types";

type ProjectDetailsProps = {
  project: CompleteProjectPhaseProps;
};

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="flex flex-col gap-2 w-full rounded-xl shadow-2xl p-8 border-b-8 border-orange-300">
      <div>
        <h1 className="text-4xl">{project.project_data.name}</h1>
        <h2 className="text-xl">{project.project_data.author}</h2>
      </div>
      <div className="flex gap-20">
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <p>Začetek</p>
            <p className="font-semibold">
              {formatDate(project.project_data.start_date)}
            </p>
            <hr className="w-full border-1 border-slate-500" />
          </div>
          <div>
            <p>Konec</p>
            <p className="font-semibold">
              {formatDate(project.project_data.end_date)}
            </p>
            <hr className="w-full border-1 border-slate-500" />
          </div>
          <div>
            <p>Vrsta</p>
            <p className="capitalize font-semibold">
              {project.project_data.type}
            </p>
            <hr className="w-full border-1 border-slate-500" />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <p>Vodja projekta</p>
            <div className="flex gap-4 items-end">
              <Image
                src="/icons/user.svg"
                alt="user"
                width={20}
                height={20}
                className=" bg-green-400 rounded-full p-[2px]"
              />
              <p className="font-semibold">
                {project.project_data.creator.first_name}{" "}
                {project.project_data.creator.last_name}
              </p>
            </div>
            <hr className="w-full border-1 border-slate-500" />
          </div>
          <div>
            <p>Nadzornik faze</p>
            {/* TODO: make it dynamic */}
            <div className="flex gap-4 items-end">
              <Image
                src="/icons/user.svg"
                alt="user"
                width={20}
                height={20}
                className=" bg-blue-400 rounded-full p-[2px]"
              />
              <p className="font-semibold">Andrej Špes</p>
            </div>
            <hr className="w-full border-1 border-slate-500" />
          </div>
          <div>
            <p>Stanje</p>
            <div className="flex gap-2 items-center w-[300px]">
              <ProgressBar stanje={project.project_data.stanje} />
              <p>{project.project_data.stanje}%</p>
            </div>
            <hr className="w-full border-1 border-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
