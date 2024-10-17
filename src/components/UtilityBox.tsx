import { TasksTable, UtilityModal } from "@/components";

const UtilityBox = ({
  type,
  data,
  projectId,
}: {
  type: string;
  data: TaskProps[] | null;
  projectId: string;
}) => {
  return (
    <div className="border w-full shadow-2xl p-4 rounded-xl flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <h2 className="uppercase text-lg">{type}</h2>
        <UtilityModal type={type} projectId={projectId} />
      </div>
      {data && data?.length > 0 ? (
        <TasksTable tasks={data} />
      ) : (
        <p className="text-sm">
          Nobena {type === "naloge" ? "naloga" : "datoteka"} ni bila najdena.
          Dodaj naloge
        </p>
      )}
    </div>
  );
};

export default UtilityBox;
