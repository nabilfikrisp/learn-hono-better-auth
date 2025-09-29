import { Hono } from "hono";
import { leaderboardQueryValidator } from "./leaderboard.validator.js";
import { getLeaderboard } from "./leaderboard.service.js";

const leaderboardRouter = new Hono();

leaderboardRouter.get("/", leaderboardQueryValidator, async (c) => {
  const query = c.req.valid("query");

  const result = await getLeaderboard(query);

  return c.json({ message: "Success get leaderboard", ...result });
});

export default leaderboardRouter;
