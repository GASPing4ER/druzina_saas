import { Sidebar, TopBar } from "@/components";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log("user", data.user);
  if (error || !data.user) redirect("/login");
  return (
    <div className="flex bg-white text-black h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
