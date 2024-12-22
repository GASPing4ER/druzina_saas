import { z } from "zod";

const TTypeSchema = z.enum(["publikacije", "tednik", "knjiga", "drugo"]);
const TPrioritySchema = z.enum(["nizka", "normalna", "visoka"]);
const TDepartment = z.enum([
  "urednistvo",
  "priprava-in-oblikovanje",
  "tisk",
  "distribucija",
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
  published_date: z.date(),
  start_date: z.date(),
  end_date: z.date(),
});

export const phaseFormSchema = z.object({
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  oblikovanje: z.string().optional(),
  sken: z.string().optional(),
  postavitev: z.string().optional(),
  predogled: z.boolean().optional(),
  potrditev_postavitve: z.boolean().optional(),
  navodila: z.string().optional(),
  prevzem: z.boolean().optional(),
});

export const bookFormSchema = z.object({
  name: z.string().min(2, {
    message: "Naslov mora imeti vsaj 2 karakterja.",
  }),
  author: z.string().min(2, {
    message: "Vrsta projekta mora imeti vsaj 2 karakterja.",
  }),
  type: TTypeSchema.refine((val) => TTypeSchema.options.includes(val), {
    message: "Izberite pravilno vrsto.",
  }),
  published_date: z.date(),
  start_date: z.date(),
  end_date: z.date(),
});

export const publicationsFormSchema = z.object({
  type: TTypeSchema.refine((val) => TTypeSchema.options.includes(val), {
    message: "Izberite pravilno vrsto.",
  }),
  name: z.string().min(2, {
    message: "Naslov mora imeti vsaj 2 karakterja.",
  }),
  priloge: z.string(),
  st_izdaje: z.string(),
  published_date: z.date(),
  start_date: z.date(),
  end_date: z.date(),
});

export const tednikFormSchema = z.object({
  type: TTypeSchema.refine((val) => TTypeSchema.options.includes(val), {
    message: "Izberite pravilno vrsto.",
  }),
  priloge: z.string(),
  st_izdaje: z.string(),
  published_date: z.date(),
  start_date: z.date(),
  end_date: z.date(),
});

export const otherFormSchema = z.object({
  name: z.string().min(2, {
    message: "Naslov mora imeti vsaj 2 karakterja.",
  }),
  type: TTypeSchema.refine((val) => TTypeSchema.options.includes(val), {
    message: "Izberite pravilno vrsto.",
  }),
  start_date: z.date(),
  end_date: z.date(),
});

export const technicalSpecificationsFormSchema = z.object({
  format: z.string().min(2, {
    message: "Format mora imeti vsaj 2 karakterja.",
  }),
  obseg: z.string().min(2, {
    message: "Obseg mora imeti vsaj 2 karakterja.",
  }),
  material: z.string().min(2, {
    message: "Material mora imeti vsaj 2 karakterja.",
  }),
  tisk: z.string().min(2, {
    message: "Tisk mora imeti vsaj 2 karakterja.",
  }),
  vezava: z.string().min(2, {
    message: "Vezava mora imeti vsaj 2 karakterja.",
  }),
  pakiranje: z.string().min(2, {
    message: "Pakiranje mora imeti vsaj 2 karakterja.",
  }),
  naklada: z.string().min(2, {
    message: "Naklada mora imeti vsaj 2 karakterja.",
  }),
  main_check: z.boolean(),
  technical_check: z.boolean(),
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

export const taskHoursSchema = z.object({
  hours: z.string(),
  description: z.string(),
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
