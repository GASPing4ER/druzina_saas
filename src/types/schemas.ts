import { z } from "zod";

const TPhasesSchema = z.enum([
  "osnutek",
  "uredništvo",
  "oblikovanje",
  "priprava-za-tisk",
  "tisk",
  "dostava",
  "arhiv",
]);

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Naslov mora imeti vsaj 2 karakterja.",
  }),
  author: z.string().min(2, {
    message: "Avtor mora imeti vsaj 2 karakterja.",
  }),
  type: z.string().min(2, {
    message: "Vrsta projekta mora imeti vsaj 2 karakterja.",
  }),
  current_phase: TPhasesSchema.refine(
    (val) => TPhasesSchema.options.includes(val),
    {
      message:
        "Izberite pravilno začetno fazo (osnutek, uredništvo, oblikovanje, priprava-za-tisk, tisk, dostava).",
    }
  ),
  customer: z.string().min(2, {
    message: "Naročnik mora imeti vsaj 2 karakterja.",
  }),
  quantity: z.string(),
  start_date: z.date(),
  end_date: z.date(),
});
