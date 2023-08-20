import { z } from "zod";

export const newTaskSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string(),
  priority: z.enum(["LOW", "HIGH"]),
  completed: z.boolean(),
});

export type TaskSchema = z.infer<typeof newTaskSchema>;

export const taskIdSchema = z.object({
  id: z.string(),
});

export type TaskIdSchema = z.infer<typeof taskIdSchema>;
