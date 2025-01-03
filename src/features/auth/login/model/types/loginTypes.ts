import { z } from "zod";
import { formLoginSchema } from "../constants/schemas";

export type LoginSchema = z.infer<typeof formLoginSchema>;