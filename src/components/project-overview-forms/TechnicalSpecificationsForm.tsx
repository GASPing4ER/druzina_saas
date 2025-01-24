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

  // 2. Define a submit handler.
  async function onSubmit(
    values: z.infer<typeof technicalSpecificationsFormSchema>
  ) {
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
    await updateTechnicalSpecificationsProject(normalizedValues, project.id);
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
                    <Textarea
                      placeholder="160 x 220 mm"
                      {...field}
                      value={field.value ?? ""}
                    />
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
                    <Textarea
                      placeholder="Knjižni blok: 224 str., vezni list: 6 str., ovitek 2 str."
                      {...field}
                      value={field.value ?? ""}
                    />
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
                    <Textarea
                      placeholder="Holmen book"
                      {...field}
                      value={field.value ?? ""}
                    />
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
                    <Textarea
                      placeholder="Digitalni tisk"
                      {...field}
                      value={field.value ?? ""}
                    />
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
                    <Textarea
                      placeholder="Bruširano"
                      {...field}
                      value={field.value ?? ""}
                    />
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
                    <Textarea
                      placeholder="Škatle po 20"
                      {...field}
                      value={field.value ?? ""}
                    />
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
                    <Input
                      placeholder="1000"
                      {...field}
                      value={field.value ?? ""}
                    />
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
        <Button type="submit">Shrani</Button>
      </form>
    </Form>
  );
};

export default TechicalSpecificationsForm;
