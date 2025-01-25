import { FilesTable, TasksTable, UtilityModal } from "@/components";
import {
  CompleteProjectPhaseProps,
  FileProps,
  TaskWithNamesProps,
} from "@/types";
import { User } from "@supabase/supabase-js";

type UtilityBoxProps =
  | {
      type: "naloge";
      phase: string;
      data: TaskWithNamesProps[] | null;
      project: CompleteProjectPhaseProps;
      user: User;
    }
  | {
      type: "datoteke";
      phase: string;
      data: FileProps[] | null;
      project: CompleteProjectPhaseProps;
      user: User;
    }
  | {
      type: "opombe";
      phase: string;
      data: [] | null;
      project: CompleteProjectPhaseProps;
      user: User;
    };

const UtilityBox = ({ type, phase, data, project, user }: UtilityBoxProps) => {
  const role = user.user_metadata.role;
  return (
    <div
      className={`border bg-white w-full shadow-2xl p-4 rounded-xl flex flex-col gap-2 ${
        type === "opombe" && "min-h-[200px]"
      }`}
    >
      <div className="flex items-center gap-4">
        <h2 className="uppercase text-lg">{type}</h2>
        {(role === "superadmin" ||
          user.id === project.project_data.creator_id ||
          (type !== "naloge" && type !== "opombe")) && (
          <UtilityModal phase={phase} type={type} projectId={project.id} />
        )}
      </div>
      {data && data.length > 0 ? (
        type === "naloge" ? (
          <TasksTable tasks={data} />
        ) : (
          <FilesTable files={data} />
        )
      ) : (
        <>
          <p className="text-sm">
            Nobena{" "}
            {type === "naloge"
              ? "naloga"
              : type === "datoteke"
              ? "datoteka"
              : "opomba"}{" "}
            ni bila najdena. Dodaj {type}!
          </p>
        </>
      )}
    </div>
  );
};

export default UtilityBox;
