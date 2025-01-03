import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(4, { message: "Введите корректный пароль" });

// можно было сделать пароли опциональными (создать другую схему)

export const formLoginSchema = z.object({
  username: z.string().min(4, { message: "Введите корректный юзернейм" }),
  password: passwordSchema,
});

// ------------------ email, fullname, password, confirmPass.
// export const formRegisterSchema = formLoginSchema
//   .merge(
//     z.object({
//       fullName: z.string().min(2, { message: "Введите имя и фамилию" }),
//       confirmPassword: passwordSchema,
//     }),
//   )
//   // password который вводим, и конфирм пароль совпадают
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Пароли не совпадают",
//     path: ["confirmPassword"], // что будет тригериться
//   });

// types:
// export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
