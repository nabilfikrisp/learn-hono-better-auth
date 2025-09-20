import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const createTodoSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(500),
    description: z.string().max(1000).optional(),
    completed: z.boolean().optional().default(false),
  })
  .strict();

export const createTodoValidator = zValidator(
  "json",
  createTodoSchema,
  async (result, c) => {
    if (!result.success) {
      return c.json(
        { errors: result.error.issues.map((issue) => issue.message) },
        400
      );
    }
  }
);
