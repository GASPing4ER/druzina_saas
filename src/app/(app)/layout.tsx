import { Sidebar } from "@/components";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId, sessionClaims } = auth();
  const department = sessionClaims?.department;
  const role = sessionClaims?.org_role?.split(":")[1];
  console.log(department, role);

  if (!userId) redirect("/sign-in");

  return (
    <div className="flex bg-white text-black h-screen w-full">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default AppLayout;
