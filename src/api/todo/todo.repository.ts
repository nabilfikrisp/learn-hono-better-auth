import { db } from "@/db/db.js";
import type { NewTodo } from "./todo.model.js";
import { todo as todoTable } from "@/db/schema.js";
import { desc, eq } from "drizzle-orm";

export async function insertTodo(todo: NewTodo) {
  const [result] = await db.insert(todoTable).values(todo).returning();
  return result;
}

export async function getTodosByUserId(userId: string) {
  const todoList = await db
    .select()
    .from(todoTable)
    .where(eq(todoTable.userId, userId))
    .orderBy(desc(todoTable.createdAt));

  return todoList;
}
