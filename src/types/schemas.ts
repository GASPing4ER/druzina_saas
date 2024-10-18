import { z } from "zod";

const TTypeSchema = z.enum(["družina", "revija", "knjiga", "drugo"]);
const TPrioritySchema = z.enum(["nizka", "normalna", "visoka"]);

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Naslov mora imeti vsaj 2 karakterja.",
  }),
  author: z.string().min(2, {
    message: "Vrsta projekta mora imeti vsaj 2 karakterja.",
  }),
  type: TTypeSchema.refine((val) => TTypeSchema.options.includes(val), {
    message: "Izberite pravilno vrsto.",
  }),
  quantity: z.string(),
  start_date: z.date(),
  end_date: z.date(),
});

export const phaseSchema = z.object({
  start_date: z.date(),
  end_date: z.date(),
});

export const taskSchema = z.object({
  name: z.string().min(2, {
    message: "Naslov mora imeti vsaj 2 karakterja.",
  }),
  description: z.string().min(2, {
    message: "Avtor mora imeti vsaj 2 karakterja.",
  }),
  priority: TPrioritySchema.refine(
    (val) => TPrioritySchema.options.includes(val),
    {
      message: "Izberite pravilno prioriteto.",
    }
  ),
  employee_id: z.string().min(2, {
    message: "Vrsta projekta mora imeti vsaj 2 karakterja.",
  }),
  start_date: z.date(),
  end_date: z.date(),
});

export const fileSchema = z.object({
  name: z.string().min(2, {
    message: "Naslov mora imeti vsaj 2 karakterja.",
  }),
  description: z.string().min(2, {
    message: "Opis mora imeti vsaj 2 karakterja.",
  }),
  link: z.string().min(2, {
    message: "Link mora imeti vsaj 2 karakterja.",
  }),
});
