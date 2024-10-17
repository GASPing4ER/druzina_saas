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

import { taskSchema } from "@/types/schemas";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { getUser } from "@/actions/auth";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { addTask } from "@/actions/tasks";
import { useRouter } from "next/navigation";

const TaskForm = ({
  projectId,
  handleClose,
}: {
  projectId: string;
  handleClose: () => void;
}) => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {},
  });

  useEffect(() => {
    const getUsersData = async () => {
      const response = await fetch("/api/get-users");
      if (!response.ok) throw new Error("Failed to fetch users");

      const { users } = await response.json();
      const result = users.filter(
        (user: User) =>
          user.user_metadata.department === "urednistvo" &&
          user.user_metadata.role === "member"
      );
      setUsers(result);
    };

    getUsersData();
  }, []);

  const startDate = form.watch("start_date");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof taskSchema>) {
    const user = await getUser();
    console.log("SUBMITTED");
    const chosenUser = users.find((user) => user.id === values.employee_id);
    const employee_name = `${chosenUser?.user_metadata.firstName} ${chosenUser?.user_metadata.lastName}`;
    try {
      const completeData: NewTaskDataProps = {
        ...values,
        assigner_name: `${user.user_metadata.firstName} ${user.user_metadata.lastName}`,
        assigner_id: user.id,
        project_id: projectId,
        status: "assigned",
        employee_name,
      };

      addTask(completeData);
      router.refresh();
      handleClose();
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naziv naloge</FormLabel>
                  <FormControl>
                    <Input placeholder="Lektoriranje vsebine" {...field} />
                  </FormControl>
                  <FormDescription>Naziv naloge</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis naloge</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Lektoriraj vsebino na strani 8"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Opis naloge</FormDescription>
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
              name="employee_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Izvajalec naloge</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Izberite izvajalca" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {`${user.user_metadata.firstName} ${user.user_metadata.lastName}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Zaposleni, ki bo nalogo izvajal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioriteta</FormLabel>
                  <FormControl>
                    <Input placeholder="Nizka" {...field} />
                  </FormControl>
                  <FormDescription>Prioriteta</FormDescription>
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
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Začetek naloge</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Izberi datum</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                      onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        } // This line allows today's date
                        className="z-10"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Začetek naloge</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Konec naloge</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Izberi datum</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                      onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                      <Calendar
                        className="z-10"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                          date < startDate
                        } // This line allows today's date
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Konec naloge</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default TaskForm;
