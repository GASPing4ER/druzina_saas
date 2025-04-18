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
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { updateProject } from "@/actions/projects";
import { chooseNextPhaseAction } from "@/actions/next-phase";

type DistribucijaFormProps = {
  user: User;
  project: ProjectWithCreatorProps;
  project_phases: ProjectPhaseProps[] | null;
};

const DistribucijaForm = ({
  user,
  project,
  project_phases,
}: DistribucijaFormProps) => {
  const [actionType, setActionType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tisk_phase = project_phases
    ? project_phases.find((phase) => phase.name === "tisk")
    : null;
  const distribucija_phase = project_phases
    ? project_phases.find((phase) => phase.name === "distribucija")
    : null;
  // 1. Define your form.
  const router = useRouter();
  const form = useForm<z.infer<typeof phaseFormSchema>>({
    resolver: zodResolver(phaseFormSchema),
    defaultValues: {
      end_date:
        (distribucija_phase &&
          distribucija_phase.end_date &&
          new Date(distribucija_phase?.end_date)) ||
        undefined,
      navodila: distribucija_phase?.navodila,
      prevzem: distribucija_phase?.prevzem,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof phaseFormSchema>) {
    setLoading(true);
    setMessage(null);
    if (actionType === "save") {
      await savePhase(values);
    } else {
      if (distribucija_phase?.status === "v teku") {
        await chooseNextPhaseAction("arhiv", {
          ...distribucija_phase,
          project_data: project,
        });
      } else {
        await activatePhase(values);
      }
    }
  }

  async function savePhase(values: z.infer<typeof phaseFormSchema>) {
    let response;
    if (!distribucija_phase) {
      response = await addPhase(
        {
          ...values,
          status: "v čakanju",
          project_id: project.id,
          name: "distribucija",
        },
        user.id
      );
    } else {
      response = await updatePhase(distribucija_phase!.id, user.id, {
        ...values,
        project_id: project.id,
        name: "distribucija",
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
    if (!distribucija_phase) {
      await Promise.all([
        addPhase(
          {
            ...values,
            status: "v teku",
            project_id: project.id,
            name: "distribucija",
            start_date: new Date(),
          },
          user.id
        ),
        updateProject(
          {
            napredek: project.napredek > 4 ? project.napredek : 4,
            status: "v teku",
            stanje: project.napredek > 75 ? project.napredek : 75,
          },
          project.id
        ),
      ]);
    } else if (distribucija_phase.status === "v čakanju") {
      await Promise.all([
        updatePhase(distribucija_phase.id, user.id, {
          ...values,
          project_id: project.id,
          status: "v teku",
          start_date: new Date(),
          name: "distribucija",
        }),
        updateProject(
          {
            napredek: project.napredek > 4 ? project.napredek : 4,
            status: "v teku",
            stanje: project.napredek > 75 ? project.napredek : 75,
          },
          project.id
        ),
      ]);
    } else {
      updatePhase(distribucija_phase.id, user.id, {
        ...values,
        project_id: project.id,
        status: "v teku",
        start_date: new Date(),
        name: "distribucija",
      });
    }
    router.refresh();
    if (distribucija_phase?.status === "v teku") {
      await updatePhase(distribucija_phase!.id, user.id, {
        ...values,
        project_id: project.id,
        status: "zaključeno",
        name: "distribucija",
      });
    }
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-10">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex gap-4">
              <p>Začetek faze:</p>
              <p>{`${
                distribucija_phase && distribucija_phase.start_date
                  ? formatDate(distribucija_phase.start_date)
                  : "/"
              }`}</p>
            </div>
            <div className="flex">
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-[200px]">Rok izvedbe:</FormLabel>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full text-left font-normal",
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
            <div>
              <FormField
                control={form.control}
                name="navodila"
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-2">
                    <FormLabel className="mt-[10px]">Navodila:</FormLabel>
                    <FormControl className="flex-1">
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="prevzem"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel className="mt-[5px]">Prevzem:</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
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
          {tisk_phase &&
            tisk_phase.status === "zaključeno" &&
            distribucija_phase?.status !== "zaključeno" && (
              <Button
                onClick={() => setActionType("activate")}
                type="submit"
                variant="outline"
              >
                {distribucija_phase?.status === "v teku"
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

export default DistribucijaForm;
