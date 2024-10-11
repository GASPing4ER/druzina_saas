import DashboardProjects from "./DashboardProjects";
import DashboardProjectsFilter from "./DashboardProjectsFilter";

const DashboardProjectsDisplay = ({
  projects,
}: DashboardProjectsDisplayProps) => {
  return (
    <div className="flex flex-col gap-8 w-[750px]">
      <DashboardProjectsFilter />
      <DashboardProjects projects={projects} />
    </div>
  );
};

export default DashboardProjectsDisplay;
