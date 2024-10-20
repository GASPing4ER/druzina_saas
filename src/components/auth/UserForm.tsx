"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { userSchema } from "@/types/schemas";
import { Input } from "@/components/ui/input";
import { departmentTypes, roleTypes } from "@/constants";
import { signup } from "@/actions/auth";
import { NewUserDataProps } from "@/types";

const UserForm = () => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      const completeData: NewUserDataProps = {
        ...values,
      };

      await signup(completeData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ime</FormLabel>
                  <FormControl>
                    <Input placeholder="Ana" {...field} />
                  </FormControl>
                  <FormDescription>Ime zaposlenega</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priimek</FormLabel>
                  <FormControl>
                    <Input placeholder="Novak" {...field} />
                  </FormControl>
                  <FormDescription>Priimek zaposlenega</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vloga</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Izberite vlogo" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleTypes.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Vloga zaposlenega</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Oddelek</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Izberite prioriteto" />
                      </SelectTrigger>
                      <SelectContent>
                        {departmentTypes.map((department) => (
                          <SelectItem key={department} value={department}>
                            {department}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Oddelek zaposlenega</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ana.novak@gmail.com"
                      {...field}
                    />
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
        <Button type="submit">Registriraj se</Button>
      </form>
    </Form>
  );
};

export default UserForm;
