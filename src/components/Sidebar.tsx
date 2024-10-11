import { sidebar_navigation } from "@/constants";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { SidebarNav } from "@/components";
import { SignOutButton } from "@clerk/nextjs";

const Sidebar = async () => {
  const user = await currentUser();
  return (
    <div className="w-[300px] border-r border-black flex flex-col justify-between">
      <div className="p-10 flex flex-col gap-8">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="object-contain"
        />
        <SidebarNav title="Pregled" navigation={sidebar_navigation.pregled} />
        <SidebarNav title="Procesi" navigation={sidebar_navigation.procesi} />
        <SidebarNav
          title="Časovni okvir"
          navigation={sidebar_navigation.casovni_okvir}
        />
        <SignOutButton />
      </div>
      <div className="border-t border-black p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src={user?.imageUrl as string}
            alt="user avatar"
            width={25}
            height={25}
            className="rounded-full"
          />
          <p className="text-sm">
            {user?.firstName} {user?.lastName}
          </p>
        </div>
        <p className="font-bold text-lg cursor-pointer">...</p>
      </div>
    </div>
  );
};

export default Sidebar;
