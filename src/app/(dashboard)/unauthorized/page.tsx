import Link from "next/link";
import React from "react";

const UnauthorizedPage = () => {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-12 py-6 bg-white text-slate-900">
      <h1 className="text-4xl font-semibold">DO TE STRANI NIMATE DOSTOPA!</h1>
      <Link href="/" className="font-semibold">
        Vrni se na nadzorno ploščo
      </Link>
    </main>
  );
};

export default UnauthorizedPage;
