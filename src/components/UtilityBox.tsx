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
    <div
      className={`border bg-white w-full shadow-2xl p-4 rounded-xl flex flex-col gap-2 ${
        type === "opombe" && "min-h-[200px]"
      }`}
    >
      <div className="flex items-center gap-4">
        <h2 className="uppercase text-lg">{type}</h2>
        <UtilityModal type={type} projectId={projectId} />
      </div>
      {data && data?.length > 0 ? (
        <TasksTable tasks={data} />
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
          <p>
            OPOZORILO: DATOTEKE IN OPOMBE ŠE NE DELUJEJO, ZATO JIH NE DODAJAJ!
          </p>
        </>
      )}
    </div>
  );
};

export default UtilityBox;
