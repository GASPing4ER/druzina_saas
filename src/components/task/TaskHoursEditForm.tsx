"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { taskHoursSchema } from "@/types/schemas";

import { Input } from "@/components/ui/input";
import { addTaskHours } from "@/actions/tasks";
import { useRouter } from "next/navigation";
import { TaskWithNamesProps } from "@/types";
// import DeleteDialog from "./DeleteDialog";

type TaskHoursEditFormProps = {
  task: TaskWithNamesProps;
  projectId: string;
  handleClose: () => void;
};

const TaskHoursEditForm = ({ task, handleClose }: TaskHoursEditFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof taskHoursSchema>>({
    resolver: zodResolver(taskHoursSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof taskHoursSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    try {
      await addTaskHours({
        ...values,
        task_id: task.id,
      });
      router.refresh();
      handleClose();
    } catch (error) {
      return error;
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Število opravljenih ur</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                  <FormLabel>Opis opravljenega dela</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit">Dodaj</Button>
          {/* <Button
            onClick={() => setOpenDelete(true)}
            type="submit"
            variant="ghost"
          >
            Zbriši
          </Button> */}
        </div>
        {/* <DeleteDialog open={openDelete} setOpen={setOpenDelete} /> */}
      </form>
    </Form>
  );
};

export default TaskHoursEditForm;
