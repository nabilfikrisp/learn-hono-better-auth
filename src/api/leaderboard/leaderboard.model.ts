import type { leaderboard } from "@/db/schema.js";
import type { InferSelectModel } from "drizzle-orm";

export type Leaderboard = InferSelectModel<typeof leaderboard>;
export type LeaderboardWithRank = Leaderboard & { rank: number };
export type NewLeaderboard = Omit<Leaderboard, "id">;
