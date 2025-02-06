import React from "react";
import { ResetPasswordForm } from "@/components";

export default async function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-background mt-20  py-20 px-24">
      <div className="w-full max-w-[1120px] flex justify-start mb-10">
        <ResetPasswordForm />
      </div>
    </main>
  );
}
