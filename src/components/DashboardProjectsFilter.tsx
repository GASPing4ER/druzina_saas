import { phases } from "@/constants";

type DashboardProjectsFilterProps = {
  onHandlePhase: (chosenPhase: string) => void;
};

const DashboardProjectsFilter = ({
  onHandlePhase,
}: DashboardProjectsFilterProps) => {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={() => onHandlePhase("")}
        className="bg-zinc-300 text-sm text-white py-1 px-4 rounded-xl font-semibold"
      >
        Vsi projekti
      </button>
      <ul className="flex gap-4 text-sm text-black/60">
        {phases.map((phase) => (
          <li
            key={phase.slug}
            className="cursor-pointer"
            onClick={() => onHandlePhase(phase.slug)}
          >
            {phase.title}
          </li>
        ))}
      </ul>
      <button className="text-zinc-300 text-sm border border-zinc-300 bg-white py-1 px-4 rounded-xl font-semibold">
        Končano
      </button>
    </div>
  );
};

export default DashboardProjectsFilter;
