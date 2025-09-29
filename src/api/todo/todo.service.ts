import { db } from "@/db/db.js";
import { todo as todoTable } from "@/db/schema.js";
import { leaderboard as leaderboardTable } from "@/db/schema.js";
import type { NewTodo, Todo } from "./todo.model.js";
import { desc, eq, sql } from "drizzle-orm";
import type { PaginationParams } from "@/common/types/pagination.types.js";

export async function insertTodo(todo: NewTodo) {
  const [result] = await db.insert(todoTable).values(todo).returning();
  return result;
}

type GetTodosParams = { userId?: string } & PaginationParams;
export async function getTodos(params: GetTodosParams = {}) {
  const { userId, page = 1, pageSize = 10 } = params;

  const count = await db.$count(todoTable);

  const totalItems = Number(count);
  const totalPages = Math.ceil(totalItems / pageSize);

  const todos = await db
    .select()
    .from(todoTable)
    .where(userId ? eq(todoTable.userId, userId) : undefined)
    .orderBy(desc(todoTable.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return {
    data: todos,
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

export async function completeTodo(todoId: Todo["id"], userId: Todo["userId"]) {
  return await db.transaction(async (tx) => {
    const [updatedTodo] = await tx
      .update(todoTable)
      .set({ completed: true })
      .where(eq(todoTable.id, todoId))
      .returning();

    await tx
      .insert(leaderboardTable)
      .values({
        userId,
        completedCount: 1,
      })
      .onConflictDoUpdate({
        target: leaderboardTable.userId,
        set: {
          completedCount: sql`${leaderboardTable.completedCount} + 1`,
          updatedAt: new Date(),
        },
      });

    return updatedTodo;
  });
}
