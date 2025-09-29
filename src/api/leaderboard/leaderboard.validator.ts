import { validationErrorResponse } from "@/common/utils/response.util.js";
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
      const errors = result.error.issues.map((issue) => issue.message);
      return validationErrorResponse(c, errors);
    }
  }
);
