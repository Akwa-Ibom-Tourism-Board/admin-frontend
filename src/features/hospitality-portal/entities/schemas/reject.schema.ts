import { z } from "zod";

export const rejectSchema = z.object({
  rejectionReason: z.string().trim().min(10, "Rejection reason must be at least 10 characters"),
});

export type RejectFormValues = z.infer<typeof rejectSchema>;
