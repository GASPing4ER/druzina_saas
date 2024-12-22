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
// import OfferTable from "../offer/OfferTable";
import { Suspense, useState } from "react";
import { updateProject } from "@/actions/projects";
type TiskFormProps = {
  user: User;
  project: ProjectWithCreatorProps;
  project_phases: ProjectPhaseProps[] | null;
};

const TiskForm = ({ project, project_phases }: TiskFormProps) => {
  const [actionType, setActionType] = useState("");

  // 1. Define your form.
  const tisk_phase = project_phases
    ? project_phases.find((phase) => phase.name === "tisk")
    : null;
  const urednistvo_phase = project_phases
    ? project_phases.find((phase) => phase.name === "urednistvo")
    : null;
  const priprava_in_oblikovanje_phase = project_phases
    ? project_phases.find((phase) => phase.name === "priprava-in-oblikovanje")
    : null;
  const router = useRouter();
  const form = useForm<z.infer<typeof phaseFormSchema>>({
    resolver: zodResolver(phaseFormSchema),
    defaultValues: {
      end_date:
        (tisk_phase && tisk_phase.end_date && new Date(tisk_phase?.end_date)) ||
        undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof phaseFormSchema>) {
    if (actionType === "save") {
      await savePhase(values);
    } else {
      await activatePhase(values);
    }
  }

  async function savePhase(values: z.infer<typeof phaseFormSchema>) {
    if (tisk_phase === null) {
      await addPhase({
        ...values,
        status: "v čakanju",
        project_id: project.id,
        name: "tisk",
      });
    } else {
      await updatePhase(tisk_phase!.id, {
        ...values,
      });
    }
    router.refresh();
  }

  async function activatePhase(values: z.infer<typeof phaseFormSchema>) {
    if (tisk_phase?.status === "v teku") {
      await updatePhase(tisk_phase.id, { ...values, status: "zaključeno" });
    } else if (!tisk_phase) {
      await Promise.all([
        addPhase({
          ...values,
          status: "v teku",
          project_id: project.id,
          name: "tisk",
        }),
        updateProject(
          {
            napredek: project.napredek > 3 ? project.napredek : 3,
            status: "v teku",
            stanje: project.napredek > 50 ? project.napredek : 50,
          },
          project.id
        ),
      ]);
    } else if (tisk_phase.status === "v čakanju") {
      await Promise.all([
        updatePhase(tisk_phase.id, { ...values, status: "v teku" }),
        updateProject(
          {
            napredek: project.napredek > 3 ? project.napredek : 3,
            status: "v teku",
            stanje: project.napredek > 50 ? project.napredek : 50,
          },
          project.id
        ),
      ]);
    } else {
      updatePhase(tisk_phase.id, { ...values, status: "v teku" });
    }
    router.refresh();
    if (tisk_phase?.status === "v teku") {
      await updatePhase(tisk_phase!.id, {
        ...values,
        status: "zaključeno",
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
            <p>{`${
              tisk_phase && tisk_phase.start_date
                ? formatDate(tisk_phase.start_date)
                : "/"
            }`}</p>
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
          <div className="flex gap-2">
            <p>Ponudbe za tisk:</p>
            <div className="w-full flex flex-col items-start gap-4">
              <Suspense fallback={<div>Loading...</div>}>
                {/* <OfferTable /> */}
              </Suspense>
              <button
                type="button"
                className="border border-black text-sm px-1"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button onClick={() => setActionType("save")} type="submit">
            Shrani
          </Button>
          {(urednistvo_phase?.status === "zaključeno" &&
            priprava_in_oblikovanje_phase?.status === "zaključeno") ||
            (project.type === "drugo" &&
              priprava_in_oblikovanje_phase?.status === "zaključeno" &&
              tisk_phase?.status !== "zaključeno" && (
                <Button
                  onClick={() => setActionType("activate")}
                  type="submit"
                  variant="outline"
                >
                  {tisk_phase?.status === "v teku"
                    ? "Zaključi fazo"
                    : "Aktiviraj fazo"}
                </Button>
              ))}
        </div>
      </form>
    </Form>
  );
};

export default TiskForm;
