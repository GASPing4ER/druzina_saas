"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { forgotPassword, login } from "@/actions/auth";

import { loginUserSchema } from "@/types/schemas";
import { LoginUserProps } from "@/types";

const LoginUserForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {},
  });

  const email = form.watch("email");

  const handlePasswordReset = async (email: string) => {
    if (!email) {
      setErrorMessage("Vpišite email!");
      return;
    }

    const { error } = await forgotPassword(email);

    if (error) {
      setErrorMessage(error);
    }

    if (!error) {
      setErrorMessage("");
      setSuccessMessage("Povezava do resetiranja gesla je bila poslana.");
    }
  };

  // Submit handler
  async function onSubmit(values: z.infer<typeof loginUserSchema>) {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const completeData: LoginUserProps = {
        ...values,
      };

      const { error } = await login(completeData);
      if (!error) {
        setSuccessMessage("Prijava uspešna!");
      } else {
        setErrorMessage(
          "Prijava ni uspela. Preverite podatke in poskusite znova."
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrorMessage(
        "Prijava ni uspela. Preverite podatke in poskusite znova."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-600 text-sm">{successMessage}</p>
        )}

        <div className="flex gap-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormDescription>Email zaposlenega</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Geslo</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>Geslo zaposlenega</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Prijavljam..." : "Prijavi se"}
        </Button>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-6">
          <button type="button" onClick={() => handlePasswordReset(email)}>
            <p className="text-center text-sm">Ste pozabili geslo?</p>
          </button>
        </div>
      </form>
    </Form>
  );
};

export default LoginUserForm;
