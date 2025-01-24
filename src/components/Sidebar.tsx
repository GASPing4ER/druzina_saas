import { sidebar_navigation } from "@/constants";
import Image from "next/image";
import { SidebarNav, LogoutButton } from "@/components";
import { User } from "@supabase/supabase-js";

type SidebarProps = {
  user: User;
};
const Sidebar = async ({ user }: SidebarProps) => {
  const role = user.user_metadata.role;
  const department = user.user_metadata.department;
  return (
    <div className="w-[300px] h-full fixed z-10 bg-white top-0 left-0 border-r border-black flex flex-col justify-between">
      <div className="px-4 py-10 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="object-contain self-center"
          />
          <hr />
        </div>
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
            {user?.user_metadata.first_name} {user?.user_metadata.last_name}
          </p>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
