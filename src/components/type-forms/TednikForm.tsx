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
import { Input } from "@/components/ui/input";
import { tednikFormSchema } from "@/types/schemas";
import { getCompleteData } from "@/utils";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { addProject, updateProjectData } from "@/actions/projects";
import { phases } from "@/constants";
import { addProjectPhase } from "@/actions/project-phases";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { ProjectWithCreatorProps } from "@/types";

type TednikFormProps = {
  user: User;
  project?: ProjectWithCreatorProps;
  action?: "add" | "edit";
  handleClose: () => void;
};

const TednikForm = ({
  user,
  project,
  action = "add",
  handleClose,
}: TednikFormProps) => {
  // 1. Define your form.
  const router = useRouter();
  const form = useForm<z.infer<typeof tednikFormSchema>>({
    resolver: zodResolver(tednikFormSchema),
    defaultValues: {
      ...project,
      start_date: project && new Date(project.start_date),
      end_date: project && new Date(project.end_date),
    },
  });

  const [loading, setLoading] = useState(false);

  const startDate = form.watch("start_date");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof tednikFormSchema>) {
    setLoading(true);
    const completeData = getCompleteData(
      { ...values, type: "tednik", name: `Tednik` },
      user
    );
    if (action === "add") {
      const { data } = await addProject({
        ...completeData,
        obseg: "32 strani",
        format: "290 x 420mm",
        tisk: "4/4",
        pakiranje: "Svežnji",
        material: "45 g/m2 časopisni",
        vezava: "znašanje / snopič",
        naklada: "19.000",
      });
      const phase = phases[completeData.napredek].slug;
      await addProjectPhase(
        {
          project_id: data!.id,
          name: phase,
          status: completeData.status,
        },
        user.id
      );
    } else if (action === "edit" && project) {
      const { data, error } = await updateProjectData(
        { ...values, name: `Tednik ${values.st_izdaje}` },
        project.id,
        user.id
      );
      console.log("Data:", data, "Error:", error);
    }

    router.refresh();
    setLoading(false);
    handleClose();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2 items-baseline">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="st_izdaje"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Številka izdaje</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
              name="priloge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priloge</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
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
                  <FormLabel>Začetek projekta</FormLabel>
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
                  <FormLabel>Rok izvedbe</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button disabled={loading} type="submit">
          {loading ? "Ustvarjam..." : "Ustvari"}
        </Button>
      </form>
    </Form>
  );
};

export default TednikForm;
