"use client";

import { login } from "./actions";
import { useState, useTransition } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await login(formData);

      if (result?.error) {
        setError(result.error); // Set error message if login fails
      } else {
        setError(null); // Clear any previous errors on success
      }
    });
  };

  return (
    <div className="w-full h-screen bg-white text-slate-900 flex flex-col gap-6 items-center justify-center">
      <h1 className="text-4xl">PRIJAVA</h1>
      <form
        action={handleSubmit}
        className="py-8 px-32 rounded-xl shadow-lg border-t flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Geslo:</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-slate-900 text-white p-2 rounded-xl"
        >
          Prijavi se
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
