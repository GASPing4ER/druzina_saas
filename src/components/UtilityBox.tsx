const UtilityBox = ({
  type,
  data,
}: {
  type: string;
  data: TaskProps[] | null;
}) => {
  return (
    <div className="border w-full shadow-2xl p-4 rounded-xl flex flex-col gap-2">
      <h2 className="uppercase">{type}</h2>
      {data && data?.length > 1 ? (
        data.map((item) => <div key={item.id}>{item.name}</div>)
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
