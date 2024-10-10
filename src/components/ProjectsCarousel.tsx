import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const ProjectsCarousel = async () => {
  const user = await currentUser();
  return (
    <div>
      {/* TODO: Add projects parameter and map over them. Here is UI example of a project: */}
      <div className="h-[200px] w-[400px] bg-violet-500/60 rounded-xl flex flex-col p-6 justify-between">
        <h2>Hildegardino zdravilstvo</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p>Napredek</p>
            <p>25%</p>
          </div>
          <hr className="w-full border-4 rounded-xl" />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-white bg-slate-300 py-1 px-4 rounded-xl">
            10. okt. 2024
          </p>
          <div className="flex">
            <Image
              src={user?.imageUrl as string}
              alt="user"
              width={25}
              height={25}
              className="rounded-full"
            />
            <Image
              src={user?.imageUrl as string}
              alt="user"
              width={25}
              height={25}
              className="rounded-full -ml-1"
            />
            <Image
              src={user?.imageUrl as string}
              alt="user"
              width={25}
              height={25}
              className="rounded-full -ml-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
