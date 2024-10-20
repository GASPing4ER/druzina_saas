"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { fileSchema } from "@/types/schemas";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FileProps, NewFileDataProps } from "@/types";
import { updateFile } from "@/actions/files";

type FileEditFormProps = {
  file: FileProps;
  projectId: string;
  handleClose: () => void;
};

const FileEditForm = ({ file, projectId, handleClose }: FileEditFormProps) => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      name: file.name,
      description: file.description,
      link: file.link,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof fileSchema>) {
    try {
      const completeData: NewFileDataProps = {
        ...values,
        project_id: projectId,
      };

      updateFile(completeData);
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naziv datoteke</FormLabel>
                  <FormControl>
                    <Input placeholder="Vsebina knjige" {...field} />
                  </FormControl>
                  <FormDescription>Naziv datoteke</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link do datoteke</FormLabel>
                  <FormControl>
                    <Input placeholder="https://wetransfer.com/" {...field} />
                  </FormControl>
                  <FormDescription>Link do datoteke</FormDescription>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis datoteke</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Zadnja lektorirana verzija, s popravki"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Opis datoteke</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Uredi</Button>
      </form>
    </Form>
  );
};

export default FileEditForm;
