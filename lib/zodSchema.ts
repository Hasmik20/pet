import { z } from "zod";

export const idFormSchema = z.number();

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name must be at least 3 characters length" }),
    ownerName: z
      .string()
      .trim()
      .min(3, { message: "The field must be at least 3 characters length" }),
    age: z.coerce.number().positive(),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Must be url " }),
    ]),
    notes: z.union([
      z.literal(""),
      z.string().trim().max(50, {
        message: "The field must be less than 50 characters length",
      }),
    ]),
  })
  .transform((data) => ({
    ...data,
    imageUrl:
      data.imageUrl ||
      " https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=100&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
  }));

export type TUseForm = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
