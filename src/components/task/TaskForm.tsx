"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { taskSchema } from "@/types/schemas";
import { useRouter } from "next/navigation";
import { getUsers } from "@/actions/users";
import { addTask } from "@/actions/tasks";
import { NewTaskDataProps, UserProps } from "@/types";
import { getUser } from "@/actions/auth";

type TaskFormProps = {
  projectId: string;
  phase: string;
  handleClose: () => void;
};

const TaskForm = ({ projectId, phase, handleClose }: TaskFormProps) => {
  const router = useRouter();
  const [users, setUsers] = useState<UserProps[]>([]);
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      employee_ids: [],
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const [response, currentUser] = await Promise.all([
        getUsers(),
        getUser(),
      ]);
      if (currentUser.user_metadata.role === "member") {
        setUsers([
          {
            id: currentUser.id,
            email: currentUser.email as string,
            first_name: currentUser.user_metadata.first_name,
            last_name: currentUser.user_metadata.last_name,
            department: currentUser.user_metadata.department,
            role: currentUser.user_metadata.role,
          },
        ]);
      } else if (response.data) {
        const filteredUsers = response.data.filter(
          (user: UserProps) =>
            user.department === phase && user.role === "member"
        );
        setUsers(filteredUsers);
      }
    };
    fetchUsers();
  }, [phase]);

  async function onSubmit(values: z.infer<typeof taskSchema>) {
    console.log("Submitting...");
    const currentUser = await getUser();
    const tasks: NewTaskDataProps[] = values.employee_ids.map((userId) => ({
      employee_id: userId,
      phase,
      assigner_id: currentUser.id,
      project_id: projectId,
      status: "assigned",
    }));

    try {
      for (const task of tasks) {
        console.log("Adding new task:", task);
        const response = await addTask(task);
        console.log("Error:", response.error);
      }
      router.refresh();
      handleClose();
    } catch (error) {
      console.error("Error adding tasks:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) =>
          console.log("Validation Errors:", errors)
        )}
        className="space-y-4"
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="employee_ids"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Izvajalci naloge</FormLabel>
                <div className="flex flex-col gap-2">
                  {users.map((user) => (
                    <label
                      key={user.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        value={user.id}
                        checked={field.value?.includes(user.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const newValue = checked
                            ? [...(field.value || []), user.id]
                            : (field.value || []).filter(
                                (id) => id !== user.id
                              );
                          field.onChange(newValue);
                        }}
                      />
                      <span>{`${user.first_name} ${user.last_name}`}</span>
                    </label>
                  ))}
                </div>
                <FormDescription>
                  Izberite enega ali več izvajalcev
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button onClick={() => console.log("Clicked to submit")} type="submit">
          Dodaj naloge
        </Button>
      </form>
    </Form>
  );
};

export default TaskForm;
