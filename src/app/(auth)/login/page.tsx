import LoginUserForm from "@/components/LoginUserForm";

export default function LoginPage() {
  return (
    <div className="w-full h-screen bg-white text-slate-900 flex flex-col gap-6 items-center justify-center">
      <h1 className="text-4xl">PRIJAVA</h1>
      <LoginUserForm />
    </div>
  );
}
