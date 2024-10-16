import { sidebar_navigation } from "@/constants";
import Image from "next/image";
import { SidebarNav, LogoutButton } from "@/components";
import { User } from "@supabase/supabase-js";

const Sidebar = async ({ user }: { user: User }) => {
  const role = user.user_metadata.role;
  const department = user.user_metadata.department;
  return (
    <div className="w-[300px] border-r border-black flex flex-col justify-between">
      <div className="p-10 flex flex-col gap-8">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={60}
          height={60}
          className="object-contain"
        />
        <SidebarNav
          title="Pregled"
          navigation={sidebar_navigation.pregled}
          department={department}
          role={role}
        />
        <SidebarNav
          title="Procesi"
          navigation={sidebar_navigation.procesi}
          department={department}
          role={role}
        />
        <SidebarNav
          title="Časovni okvir"
          navigation={sidebar_navigation.casovni_okvir}
          department={department}
          role={role}
        />
        <LogoutButton />
      </div>
      <div className="border-t border-black p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src="/icons/user.svg"
            alt="user"
            width={30}
            height={30}
            className="bg-green-300 p-1 rounded-full"
          />
          <p className="text-sm">
            {user?.user_metadata.firstName} {user?.user_metadata.lastName}
          </p>
        </div>
        <p className="font-bold text-lg cursor-pointer">...</p>
      </div>
    </div>
  );
};

export default Sidebar;
