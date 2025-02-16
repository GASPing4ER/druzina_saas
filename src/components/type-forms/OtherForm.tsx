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
import { otherFormSchema } from "@/types/schemas";
import { getCompleteData } from "@/utils";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { addProject, updateProjectData } from "@/actions/projects";
import { phases } from "@/constants";
import { addProjectPhase } from "@/actions/project-phases";
import { useState } from "react";
import { Label } from "../ui/label";
import { ProjectWithCreatorProps } from "@/types";

type OtherFormProps = {
  user: User;
  project?: ProjectWithCreatorProps;
  action?: "add" | "edit";
  handleClose: () => void;
};

const OtherForm = ({
  user,
  project,
  action = "add",
  handleClose,
}: OtherFormProps) => {
  // 1. Define your form.
  const router = useRouter();
  const form = useForm<z.infer<typeof otherFormSchema>>({
    resolver: zodResolver(otherFormSchema),
    defaultValues: {
      ...project,
      start_date: project && new Date(project.start_date),
      end_date: project && new Date(project.end_date),
    },
  });

  const [loading, setLoading] = useState(false);

  const startDate = form.watch("start_date");
  const tiskStatus = form.watch("is_for_tisk");
  console.log("Changes in tisk status:", tiskStatus);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof otherFormSchema>) {
    setLoading(true);
    const completeData = getCompleteData({ ...values, type: "drugo" }, user);
    if (action === "add") {
      const { data } = await addProject(completeData);
      const phase = phases[completeData.napredek].slug;
      await addProjectPhase({
        project_id: data!.id,
        name: phase,
        status: completeData.status,
      });
    } else if (action === "edit" && project) {
      await updateProjectData({ ...values }, project.id);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naslov</FormLabel>
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
        <div className="flex-1">
          <FormField
            control={form.control}
            name="is_for_tisk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ali gre projekt v tisk?</FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex gap-4"
                    value={String(field.value)} // Ensure value is a string
                    onValueChange={(value) => field.onChange(value === "true")} // Convert to boolean
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="r1" />
                      <Label htmlFor="r1">Da</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="r2" />
                      <Label htmlFor="r2">Ne</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={loading} type="submit">
          {loading ? "Ustvarjam..." : "Ustvari"}
        </Button>
      </form>
    </Form>
  );
};

export default OtherForm;
