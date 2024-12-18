import { FilesTable, TasksTable, UtilityModal } from "@/components";
import { FileProps, TaskWithNamesProps } from "@/types";

type UtilityBoxProps =
  | {
      type: "naloge";
      phase: string;
      data: TaskWithNamesProps[] | null;
      projectId: string;
      role: string;
    }
  | {
      type: "datoteke";
      phase: string;
      data: FileProps[] | null;
      projectId: string;
      role: string;
    }
  | {
      type: "opombe";
      phase: string;
      data: [] | null;
      projectId: string;
      role: string;
    };

const UtilityBox = ({
  type,
  phase,
  data,
  projectId,
  role,
}: UtilityBoxProps) => {
  return (
    <div
      className={`border bg-white w-full shadow-2xl p-4 rounded-xl flex flex-col gap-2 ${
        type === "opombe" && "min-h-[200px]"
      }`}
    >
      <div className="flex items-center gap-4">
        <h2 className="uppercase text-lg">{type}</h2>
        {(role === "superadmin" ||
          (type !== "naloge" && type !== "opombe")) && (
          <UtilityModal phase={phase} type={type} projectId={projectId} />
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
