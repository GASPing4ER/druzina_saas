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
import { ProjectWithCreatorProps, ProjectPhaseProps } from "@/types";
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
import { useState } from "react";
import { updateProject } from "@/actions/projects";
import { chooseNextPhaseAction } from "@/actions/next-phase";

type UrednistvoFormProps = {
  user: User;
  project: ProjectWithCreatorProps;
  project_phase: ProjectPhaseProps | null;
};

const UrednistvoForm = ({ project, project_phase }: UrednistvoFormProps) => {
  const [actionType, setActionType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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
    setLoading(true);
    setMessage(null);
    if (actionType === "save") {
      await savePhase(values);
    } else {
      if (project_phase?.status === "v teku") {
        await chooseNextPhaseAction("priprava-in-oblikovanje", {
          ...project_phase,
          project_data: project,
        });
      } else {
        await activatePhase(values);
      }
    }
  }

  async function savePhase(values: z.infer<typeof phaseFormSchema>) {
    let response;
    if (!project_phase) {
      response = await addPhase({
        ...values,
        status: "v čakanju",
        project_id: project.id,
        name: "urednistvo",
      });
    } else {
      response = await updatePhase(project_phase?.id, {
        ...values,
      });
    }
    setLoading(false);
    if (response.error === null) {
      setMessage("Uspešno shranjeno!");
    } else {
      setError("Shranitev ni bila mogoča!");
    }
    router.refresh();
  }

  async function activatePhase(values: z.infer<typeof phaseFormSchema>) {
    if (!project_phase) {
      await Promise.all([
        await addPhase({
          ...values,
          status: "v teku",
          project_id: project.id,
          name: "urednistvo",
          start_date: new Date(),
        }),
        updateProject(
          {
            napredek: project.napredek > 1 ? project.napredek : 1,
            status: "v teku",
            stanje: project.napredek > 0 ? project.napredek : 0,
            start_date: new Date(),
          },
          project.id
        ),
      ]);
    } else if (project_phase.status === "v čakanju") {
      await Promise.all([
        updatePhase(project_phase.id, {
          ...values,
          status: "v teku",
          start_date: new Date(),
        }),
        updateProject(
          {
            napredek: project.napredek > 1 ? project.napredek : 1,
            status: "v teku",
            stanje: project.napredek > 0 ? project.napredek : 0,
            start_date: new Date(),
          },
          project.id
        ),
      ]);
    } else {
      updatePhase(project_phase.id, {
        ...values,
        status: "v teku",
        start_date: new Date(),
      });
    }
    router.refresh();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <p>Začetek faze:</p>
            <p>{`${formatDate(project.start_date)}`}</p>
          </div>
          <div className="flex">
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="w-[200px]">Konec faze:</FormLabel>
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
                          date < project.start_date
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
        <div className="flex justify-between">
          <Button
            onClick={() => setActionType("save")}
            type="submit"
            disabled={loading}
          >
            {loading && actionType === "save" ? "Shranjujem..." : "Shrani"}
          </Button>
          {project_phase?.status !== "zaključeno" && (
            <Button
              onClick={() => setActionType("activate")}
              type="submit"
              variant="outline"
            >
              {project_phase?.status === "v teku"
                ? "Zaključi fazo"
                : "Aktiviraj fazo"}
            </Button>
          )}
        </div>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default UrednistvoForm;
