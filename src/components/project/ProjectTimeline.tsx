import { ProjectPhaseProps, ProjectWithCreatorProps } from "@/types";
import { project_phases } from "@/constants";
import { formatDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";

type ProjectTimelineProps = {
  phases: ProjectPhaseProps[];
  project: ProjectWithCreatorProps;
};

const ProjectTimeline = ({ phases, project }: ProjectTimelineProps) => {
  return (
    <div className="flex flex-col">
      {project_phases.map((project_phase) => {
        const phaseData = phases.find(
          (phase) => phase.name === project_phase.url
        );
        if (project.type === "drugo" && project_phase.url === "urednistvo") {
          return;
        } else
          return (
            <div key={project_phase.url} className="flex gap-8 items-start">
              <p className="w-[100px] mt-3 text-center">
                {project_phase.url === "distribucija" && !phaseData?.end_date
                  ? formatDate(project.end_date)
                  : phaseData?.end_date
                  ? formatDate(phaseData.end_date)
                  : "/"}
              </p>
              <div className="flex flex-col items-center">
                <div className="border border-black rounded-full h-16 w-16 flex justify-center items-center">
                  <Image
                    src={project_phase.imgUrl as string}
                    width={25}
                    height={25}
                    alt={project_phase.url}
                  />
                </div>
                {project_phase.url !== "distribucija" && (
                  <div className="h-[50px] w-[1px] bg-black" />
                )}
              </div>
              <div className="mt-3 flex gap-4">
                <div
                  className={`w-6 h-6 text-sm text-white flex items-center justify-center ${
                    phaseData?.status === "zaključeno"
                      ? "bg-green-500"
                      : phaseData?.status === "v teku"
                      ? "bg-orange-400"
                      : "bg-gray-400"
                  } rounded-full`}
                >
                  {phaseData?.status === "zaključeno" && "✔️"}
                </div>
                <div className="flex flex-col gap-2">
                  <Link href={`/${phaseData?.name}/${phaseData?.project_id}`}>
                    <h3 className="text-lg font-bold">{project_phase.title}</h3>
                  </Link>
                  {phaseData?.status === "zaključeno"
                    ? "končano, potrjeno"
                    : phaseData?.status === "v teku"
                    ? "v teku, ni potrjeno"
                    : "čakanje, ni potrjeno"}
                </div>
              </div>
            </div>
          );
      })}
    </div>
  );
};

export default ProjectTimeline;
