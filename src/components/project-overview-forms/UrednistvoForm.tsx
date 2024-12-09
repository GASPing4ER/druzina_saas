"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { phaseFormSchema } from "@/types/schemas";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { CompleteProjectPhaseProps, ProjectPhaseProps } from "@/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { formatDate } from "@/utils";
import { addPhase, updatePhase } from "@/actions/project-phases";
type UrednistvoFormProps = {
  user: User;
  project: CompleteProjectPhaseProps;
  project_phase: ProjectPhaseProps | null;
};

const UrednistvoForm = ({ project, project_phase }: UrednistvoFormProps) => {
  // 1. Define your form.
  const router = useRouter();
  const form = useForm<z.infer<typeof phaseFormSchema>>({
    resolver: zodResolver(phaseFormSchema),
    defaultValues: {
      end_date:
        (project_phase &&
          project_phase.end_date &&
          new Date(project_phase?.end_date)) ||
        undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof phaseFormSchema>) {
    if (project_phase === null) {
      await addPhase({
        ...values,
        status: "v čakanju",
        project_id: project.project_data.id,
        name: "urednistvo",
      });
    } else {
      await updatePhase(project_phase?.id, {
        ...values,
      });
    }
    router.refresh();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <p>Začetek uredništva:</p>
            <p>{`${formatDate(project.project_data.start_date)}`}</p>
          </div>
          <div className="flex">
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-[200px]">Konec uredništva:</FormLabel>
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
                          date < project.project_data.start_date
                        } // This line allows today's date
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Shrani</Button>
      </form>
    </Form>
  );
};

export default UrednistvoForm;
