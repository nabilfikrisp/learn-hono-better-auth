import type { todo } from "@/db/schema.js";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Todo = InferSelectModel<typeof todo>;
export type NewTodo = InferInsertModel<typeof todo>;
