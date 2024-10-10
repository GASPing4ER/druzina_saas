import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (userId) redirect("/");

  return <div>{children}</div>;
};

export default AuthLayout;
