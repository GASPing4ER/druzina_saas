import { z } from "zod";

const TTypeSchema = z.enum(["družina", "revija", "knjiga", "drugo"]);
const TPrioritySchema = z.enum(["nizka", "normalna", "visoka"]);
const TDepartment = z.enum([
  "urednistvo",
  "priprava-za-tisk",
  "tisk",
  "dostava",
]);
const TRoleSchema = z.enum(["member", "admin", "superadmin"]);

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

export const userSchema = z.object({
  first_name: z.string().min(2, {
    message: "Ime mora imeti vsaj 2 karakterja.",
  }),
  last_name: z.string().min(2, {
    message: "Priimek mora imeti vsaj 2 karakterja.",
  }),
  email: z.string().min(2, {
    message: "Email mora imeti vsaj 2 karakterja.",
  }),
  role: TRoleSchema.refine((val) => TRoleSchema.options.includes(val), {
    message: "Izberite pravilno vlogo.",
  }),
  department: TDepartment.refine((val) => TDepartment.options.includes(val), {
    message: "Izberite pravilen oddelek.",
  }),
  password: z.string().min(8, {
    message: "Password mora imeti vsaj 8 karakterja.",
  }),
});

export const loginUserSchema = z.object({
  email: z.string().min(2, {
    message: "Email mora imeti vsaj 2 karakterja.",
  }),
  password: z.string().min(8, {
    message: "Password mora imeti vsaj 8 karakterja.",
  }),
});
