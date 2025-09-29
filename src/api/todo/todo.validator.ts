import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { validationErrorResponse } from "@/common/utils/response.util.js";

export const createTodoSchema = z.strictObject(
  {
    title: z
      .string()
      .min(1, {
        error: "Title is required",
      })
      .max(500),
    description: z.string().max(1000).optional(),
    completed: z.boolean().optional().default(false),
  },
  {
    error:
      "Invalid todo request body, only title, description and completed are allowed",
  }
);

export const createTodoValidator = zValidator(
  "json",
  createTodoSchema,
  async (result, c) => {
    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);
      return validationErrorResponse(c, errors);
    }
  }
);
