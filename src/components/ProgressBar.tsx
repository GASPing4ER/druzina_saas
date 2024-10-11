const ProgressBar = ({ stanje }: ProgressBarProps) => {
  return (
    <div className="relative w-full h-[8px] rounded-xl bg-slate-200">
      <div
        className={`absolute left-0 top-0 h-full rounded-xl ${
          stanje < 20
            ? "bg-red-400"
            : stanje < 60
            ? "bg-orange-300"
            : "bg-green-400"
        }`}
        style={{ width: `${stanje}%` }}
      />
    </div>
  );
};

export default ProgressBar;
