const UtilityBox = ({ type }: { type: string }) => {
  return (
    <div className="border w-full shadow-2xl p-4 rounded-xl flex flex-col gap-2">
      <h2 className="uppercase">{type}</h2>
      <p className="text-sm">
        Nobena {type === "naloge" ? "naloga" : "datoteka"} ni bila najdena.
        Dodaj naloge
      </p>
    </div>
  );
};

export default UtilityBox;
