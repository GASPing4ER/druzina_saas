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
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { updateProject } from "@/actions/projects";
import { Textarea } from "../ui/textarea";
import { chooseNextPhaseAction } from "@/actions/next-phase";

type PripravOblikovanjeFormProps = {
  user: User;
  project: ProjectWithCreatorProps;
  project_phase: ProjectPhaseProps | null;
};

const PripravOblikovanjeForm = ({
  project,
  project_phase,
}: PripravOblikovanjeFormProps) => {
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
      oblikovanje: project_phase?.oblikovanje || "",
      opombe: project_phase?.opombe || "",
      sken: project_phase?.sken || "",
      postavitev: project_phase?.postavitev || "",
      predogled: project_phase?.predogled,
      potrditev_postavitve: project_phase?.potrditev_postavitve,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof phaseFormSchema>) {
    setLoading(true);
    setMessage(null);
    if (actionType === "save") {
      savePhase(values);
    } else {
      if (project_phase?.status === "v teku") {
        await chooseNextPhaseAction("tisk", {
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
        name: "priprava-in-oblikovanje",
      });
    } else {
      response = await updatePhase(project_phase?.id, {
        ...values,
      });
    }
    setLoading(false);
    if (response.error === null) {
      setMessage(response.message);
    } else {
      setError(response.message);
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
          name: "priprava-in-oblikovanje",
        }),
        updateProject(
          {
            napredek: project.napredek > 2 ? project.napredek : 2,
            status: "v teku",
            stanje: project.napredek > 25 ? project.napredek : 25,
          },
          project.id
        ),
      ]);
    } else if (project_phase.status === "v čakanju") {
      await Promise.all([
        updatePhase(project_phase.id, { ...values, status: "v teku" }),
        updateProject(
          {
            napredek: project.napredek > 2 ? project.napredek : 2,
            status: "v teku",
            stanje: project.napredek > 25 ? project.napredek : 25,
          },
          project.id
        ),
      ]);
    } else {
      updatePhase(project_phase.id, { ...values, status: "v teku" });
    }
    setLoading(false);
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
                project_phase && project_phase.start_date
                  ? formatDate(project_phase.start_date)
                  : project.type === "drugo"
                  ? formatDate(project.start_date)
                  : "/"
              }`}</p>
            </div>
            <div className="flex">
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-[200px]">Konec faze:</FormLabel>
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
            {project.type === "knjiga" ? (
              <>
                <div>
                  <FormField
                    control={form.control}
                    name="oblikovanje"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between gap-2">
                        <FormLabel>Oblikovanje:</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="sken"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between gap-2">
                        <FormLabel>Sken in obdelava fotografij:</FormLabel>
                        <FormControl className="flex-1">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="postavitev"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between gap-2">
                        <FormLabel>Postavitev:</FormLabel>
                        <FormControl className="flex-1">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            ) : (
              <div>
                <FormField
                  control={form.control}
                  name="opombe"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-2">
                      <FormLabel>Opombe:</FormLabel>
                      <FormControl className="flex-1">
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="predogled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-2">
                  <FormLabel className="mt-[5px]">Predogled:</FormLabel>
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
            <FormField
              control={form.control}
              name="potrditev_postavitve"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-2">
                  <FormLabel className="mt-[5px]">
                    Potrditev postavitve:
                  </FormLabel>
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
          {project_phase?.status !== "zaključeno" &&
            (project_phase?.status !== "v teku" ? (
              <Button
                onClick={() => setActionType("activate")}
                type="submit"
                variant="outline"
              >
                Aktiviraj fazo
              </Button>
            ) : project_phase.predogled === true &&
              project_phase.potrditev_postavitve === true ? (
              <Button
                onClick={() => setActionType("activate")}
                type="submit"
                variant="outline"
              >
                Zaključi fazo
              </Button>
            ) : (
              <></>
            ))}
        </div>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default PripravOblikovanjeForm;
