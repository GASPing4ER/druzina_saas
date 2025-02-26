import { formatDate, getVrstaIzdaje } from "@/utils";
import { EditProjectDialog, ProgressBar } from "@/components";
import Image from "next/image";
import { ProjectWithCreatorProps } from "@/types";
import { getUser } from "@/actions/auth";
import { getLastActivity } from "@/actions/activities";

type ProjectDetailsProps = {
  project: ProjectWithCreatorProps;
};

const ProjectDetails = async ({ project }: ProjectDetailsProps) => {
  const [user, { data: activity, error }] = await Promise.all([
    getUser(),
    getLastActivity(project.id),
  ]);
  console.log(error);
  return (
    <div className="relative flex items-end gap-20 w-full rounded-xl shadow-2xl p-8 border-b-4 border-orange-300">
      <EditProjectDialog project={project} user={user} />
      <div className="flex-1">
        <div className="flex gap-1">
          <p className="capitalize font-semibold">{project.type}</p>
          {project.type === "knjiga" && (
            <>
              <p>-</p>
              <p>{getVrstaIzdaje(project.vrsta_izdaje!)}</p>
            </>
          )}
        </div>
        <h1 className="text-4xl">
          {project.name} {project.st_izdaje}
        </h1>
        <h2 className="text-xl">{project.author}</h2>
        <div>
          <p>Stanje</p>
          <div className="flex gap-2 items-center w-[300px]">
            <ProgressBar stanje={project.stanje} />
            <p>{project.stanje}%</p>
          </div>
          <hr className="w-full border-1 border-slate-500" />
        </div>
      </div>
      <div className="flex-1 flex gap-20">
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <div className="flex justify-between">
              <div>
                <p>Začetek</p>
                <p className="font-semibold">
                  {formatDate(project.start_date)}
                </p>
              </div>
            </div>
            <hr className="w-full border-1 border-slate-500" />
          </div>
          <div>
            <p>Konec</p>
            <p className="font-semibold">
              {project.end_date && formatDate(project.end_date)}
            </p>
            <hr className="w-full border-1 border-slate-500" />
          </div>
        </div>
      </div>
      <div className="flex-1">
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
                {project.creator.first_name} {project.creator.last_name}
              </p>
            </div>
            <hr className="w-full border-1 border-slate-500" />
          </div>
          <div>
            <p>Zadnji obdeloval:</p>
            {/* TODO: make it dynamic */}
            <div className="flex gap-4 items-end">
              <Image
                src="/icons/user.svg"
                alt="user"
                width={20}
                height={20}
                className=" bg-blue-400 rounded-full p-[2px]"
              />
              <p className="font-semibold">
                {activity
                  ? `${activity.users.first_name} ${activity.users.last_name}`
                  : "/"}
              </p>
            </div>
            <hr className="w-full border-1 border-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
