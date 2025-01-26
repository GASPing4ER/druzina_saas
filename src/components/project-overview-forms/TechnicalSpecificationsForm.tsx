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
import { technicalSpecificationsFormSchema } from "@/types/schemas";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { updateTechnicalSpecificationsProject } from "@/actions/projects";
import { Textarea } from "@/components//ui/textarea";
import { ProjectWithCreatorProps } from "@/types";
import { Checkbox } from "@/components//ui/checkbox";
import { useState } from "react";

type TechincalSpecificationsFormProps = {
  user: User;
  project: ProjectWithCreatorProps;
};

const TechicalSpecificationsForm = ({
  project,
}: TechincalSpecificationsFormProps) => {
  // 1. Define your form.
  const router = useRouter();
  const form = useForm<z.infer<typeof technicalSpecificationsFormSchema>>({
    resolver: zodResolver(technicalSpecificationsFormSchema),
    defaultValues: {
      ...project,
    },
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 2. Define a submit handler.
  async function onSubmit(
    values: z.infer<typeof technicalSpecificationsFormSchema>
  ) {
    setLoading(true);
    setMessage(null);
    const normalizedValues = {
      ...values,
      format: values.format ?? undefined,
      obseg: values.obseg ?? undefined,
      material: values.material ?? undefined,
      tisk: values.tisk ?? undefined,
      vezava: values.vezava ?? undefined,
      pakiranje: values.pakiranje ?? undefined,
      naklada: values.naklada ?? undefined,
    };
    const response = await updateTechnicalSpecificationsProject(
      normalizedValues,
      project.id
    );
    setLoading(false);
    if (response.error === null) {
      setMessage("Uspešno shranjeno!");
    } else {
      setError("Shranitev ni bila mogoča!");
    }
    router.refresh();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2 items-baseline">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Format</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="obseg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Obseg</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 items-baseline">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="tisk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tisk</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 items-baseline">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="vezava"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vezava</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="pakiranje"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pakiranje</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 items-baseline">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="naklada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naklada</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {project.type === "knjiga" && (
            <div className="flex-1 flex flex-col gap-2">
              <p>Potrditev:</p>
              <FormField
                control={form.control}
                name="main_check"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">glavni urednik</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="technical_check"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">tehnični urednik</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <Button type="submit" disabled={loading}>
            {loading ? "Shranjujem..." : "Shrani"}
          </Button>
          <Button
            type="button"
            className="bg-transparent border border-black text-black hover:text-white"
          >
            Izvozi povpraševanje
          </Button>
        </div>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default TechicalSpecificationsForm;
