import { z } from "zod";

export const createAdminSchema = z.object({
  fullName: z.string().trim().min(2, "Admin name must be at least 2 characters").max(100),
  email: z.string().trim().min(1, "Admin email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

export type CreateAdminFormValues = z.infer<typeof createAdminSchema>;
