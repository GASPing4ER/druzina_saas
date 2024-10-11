const DashboardProjectsFilter = () => {
  return (
    <div className="flex justify-between items-center">
      <button className="bg-zinc-300 text-sm text-white py-1 px-4 rounded-xl font-semibold">
        Vsi projekti
      </button>
      <ul className="flex gap-4 text-sm text-black/60">
        <li>Uredništvo</li>
        <li>Oblikovanje</li>
        <li>Priprava za tisk</li>
        <li>Tisk</li>
        <li>Dostava</li>
      </ul>
      <button className="text-zinc-300 text-sm border border-zinc-300 bg-white py-1 px-4 rounded-xl font-semibold">
        Končano
      </button>
    </div>
  );
};

export default DashboardProjectsFilter;
