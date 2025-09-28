import { db } from "@/db/db.js";
import type { NewTodo } from "./todo.model.js";
import { todo as todoTable } from "@/db/schema.js";

export async function insertTodo(todo: NewTodo) {
  const [result] = await db.insert(todoTable).values(todo).returning();
  return result;
}
