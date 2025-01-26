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

import { offerSchema } from "@/types/schemas";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { OffererProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { addOffer, addOfferer, getOfferers } from "@/actions/offers";

type OfferFormProps = {
  projectId: string;
  handleClose: () => void;
};

const OfferForm = ({ projectId, handleClose }: OfferFormProps) => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof offerSchema>>({
    resolver: zodResolver(offerSchema),
    defaultValues: {},
  });

  const [offerers, setOfferers] = useState<OffererProps[]>([]);

  useEffect(() => {
    const fetchOfferers = async () => {
      const { data } = await getOfferers();

      if (data) {
        setOfferers(data);
      }
    };

    fetchOfferers();
  }, []);

  const offered_id = form.watch("offerer_id");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof offerSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { offerer_name, ...rest } = values;
    try {
      if (values.offerer_id === "nov_izvajalec" && values.offerer_name) {
        const { data, error, message } = await addOfferer({
          name: values.offerer_name,
        });
        console.log(data, error, message);
        if (data) {
          const {
            data: offerData,
            error,
            message,
          } = await addOffer({
            ...rest,
            offerer_id: data.id,
            project_id: projectId,
            total: rest.price * rest.quantity,
          });
          console.log(offerData, error, message);
        }
      } else {
        await addOffer({
          ...rest,
          project_id: projectId,
          total: rest.price * rest.quantity,
        });
      }
      handleClose();
      router.refresh();
    } catch (error) {
      return error;
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="offerer_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Izvajalec</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Izberite izvajalca" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          ...offerers,
                          { id: "nov_izvajalec", name: "Nov izvajalec" },
                        ].map((offerer) => (
                          <SelectItem key={offerer.id} value={offerer.id}>
                            {offerer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {offered_id === "nov_izvajalec" && (
            <div className="flex-1">
              <FormField
                control={form.control}
                name="offerer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ime novega izvajalca</FormLabel>
                    <FormControl>
                      <Input placeholder="D Tisk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Število izvodov</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cena na izvod (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Ustvari</Button>
      </form>
    </Form>
  );
};

export default OfferForm;
