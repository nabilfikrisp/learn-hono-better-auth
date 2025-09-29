import type { Context } from "hono";

export function validationErrorResponse(
  c: Context,
  errors: string[],
  message = "Validation error"
) {
  return c.json({ message, errors }, 422);
}
