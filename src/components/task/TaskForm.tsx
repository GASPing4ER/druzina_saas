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
import { addTask, getTasks } from "@/actions/tasks";
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
      const [response, tasksResponse, currentUser] = await Promise.all([
        getUsers(),
        getTasks(projectId, phase),
        getUser(),
      ]);

      const tasks = tasksResponse.data;
      const assignedUserIds = new Set(
        tasks?.map((task: NewTaskDataProps) => task.employee_id)
      );

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
            user.department === phase && !assignedUserIds.has(user.id)
        );
        setUsers(filteredUsers);
      }
    };
    fetchUsers();
  }, [phase, projectId]);

  async function onSubmit(values: z.infer<typeof taskSchema>) {
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
        await addTask(task);
      }
      router.refresh();
      handleClose();
    } catch (error) {
      throw new Error(error as string);
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
        <Button type="submit">Dodaj naloge</Button>
      </form>
    </Form>
  );
};

export default TaskForm;
