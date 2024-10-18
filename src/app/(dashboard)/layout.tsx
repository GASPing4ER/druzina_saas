import { getUser } from "@/actions/auth";
import { Sidebar, TopBar } from "@/components";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  console.log(user);

  return (
    <div className="flex bg-white text-black h-screen w-full">
      <Sidebar user={user} />
      <div className="ml-[300px] flex-1 flex flex-col">
        <TopBar user={user} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
