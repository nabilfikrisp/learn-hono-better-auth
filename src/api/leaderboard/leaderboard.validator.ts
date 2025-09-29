import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const leaderboardQuerySchema = z.object({
  withRank: z
    .stringbool({
      error: "withRank must be a boolean",
    })
    .optional(),
});

export type LeaderboardQuery = z.infer<typeof leaderboardQuerySchema>;

export const leaderboardQueryValidator = zValidator(
  "query",
  leaderboardQuerySchema,
  async (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: "Validation error",
          errors: result.error.issues.map((issue) => issue.message),
        },
        400
      );
    }
  }
);
