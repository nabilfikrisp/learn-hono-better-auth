import type { PaginationParams } from "@/common/types/pagination.types.js";
import { db } from "@/db/db.js";
import { leaderboard as leaderboardTable } from "@/db/schema.js";
import { getTableColumns, sql } from "drizzle-orm";
import type { LeaderboardQuery } from "./leaderboard.validator.js";

type GetLeaderboardParams = LeaderboardQuery & PaginationParams;
export async function getLeaderboard(params: GetLeaderboardParams = {}) {
  const { withRank = false, page = 1, pageSize = 10 } = params;

  const count = await db.$count(leaderboardTable);
  const totalItems = Number(count);
  const totalPages = Math.ceil(totalItems / pageSize);

  const rankSQL = sql<number>`DENSE_RANK() OVER (ORDER BY ${leaderboardTable.completedCount} DESC)::INT`;

  const leaderboard = await db
    .select({
      ...getTableColumns(leaderboardTable),
      ...(withRank ? { rank: rankSQL } : {}),
    })
    .from(leaderboardTable)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return {
    data: leaderboard,
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}
