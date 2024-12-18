import { getProject, getSingleProject } from "@/actions/projects";
import { NextPhaseModal, ProjectDetails } from "@/components";
import Link from "next/link";

const ProjectDetailsPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const projectId = params.projectId;
  const [singleProjectResponse, projectResponse] = await Promise.all([
    getSingleProject(projectId),
    getProject(projectId, "priprava-in-oblikovanje"),
  ]);

  if (!projectResponse.data || !singleProjectResponse.data) {
    return <div>Projekta nismo našli</div>;
  } else {
    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white text-slate-900">
        <ProjectDetails project={singleProjectResponse.data} />
        <div className="w-full flex justify-between">
          <Link
            className="border border-black py-2 px-4 rounded-full"
            href={`/projekti/${singleProjectResponse.data.id}`}
          >
            Pregled projekta
          </Link>
          <NextPhaseModal phase="tisk" project={projectResponse.data} />
        </div>
      </main>
    );
  }
};

export default ProjectDetailsPage;
