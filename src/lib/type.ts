import { z } from "zod";

export const newTaskSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string(),
  priority: z.enum(["LOW", "HIGH"]),
  completed: z.boolean(),
});

export type TaskSchema = z.infer<typeof newTaskSchema>;
