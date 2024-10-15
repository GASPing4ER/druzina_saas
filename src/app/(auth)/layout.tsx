import { getUser } from "@/actions/auth";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  await getUser();

  return <div>{children}</div>;
};

export default AuthLayout;
