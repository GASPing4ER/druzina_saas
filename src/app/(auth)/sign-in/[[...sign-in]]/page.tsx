import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <SignIn />
    </div>
  );
};

export default SignInPage;
