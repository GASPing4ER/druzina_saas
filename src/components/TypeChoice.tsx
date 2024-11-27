"use client";

import { Dispatch, SetStateAction } from "react";

type TypeChoiceProps = {
  setType: Dispatch<SetStateAction<string>>;
};
const TypeChoice = ({ setType }: TypeChoiceProps) => {
  return (
    <ul className="flex flex-col gap-2 w-[250px] border border-black rounded-md">
      <li
        className="hover:bg-gray-300 px-4 py-3 cursor-pointer"
        onClick={() => setType("tednik")}
      >
        Tednik - Družina
      </li>
      <hr className="p-0 m-0" />
      <li
        className="hover:bg-gray-300 px-4 py-3 cursor-pointer"
        onClick={() => setType("publikacije")}
      >
        Publikacije
      </li>
      <hr />
      <li
        className="hover:bg-gray-300 px-4 py-3 cursor-pointer"
        onClick={() => setType("knjiga")}
      >
        Knjiga
      </li>
      <hr />
      <li
        className="hover:bg-gray-300 px-4 py-3 cursor-pointer"
        onClick={() => setType("drugo")}
      >
        Druge tiskovine
      </li>
    </ul>
  );
};

export default TypeChoice;
