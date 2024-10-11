"use client";

import { getPathname } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const path = usePathname();
  const navDetails = getPathname(path);

  return (
    <section className="w-full py-6 px-12 border-b border-black flex justify-between items-center">
      <Link href={navDetails?.url as string} className="text-xl font-semibold">
        {navDetails?.title || "Url nonexistant"}
      </Link>
      <div className="flex gap-6 items-center">
        <input
          type="text"
          className="bg-slate-300 rounded-xl p-1 pl-4 placeholder:text-slate-950"
          placeholder="Poišči..."
        />
        <div className="w-8 h-8 bg-slate-300 rounded-full" />
        <button className="bg-slate-300 text-white py-1 px-8 rounded-xl">
          + DODAJ
        </button>
      </div>
    </section>
  );
};

export default TopBar;
