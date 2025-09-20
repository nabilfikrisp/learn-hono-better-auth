import { authMiddleware } from "@/common/middlewares/auth.middleware.js";
import type { HonoVar } from "@/common/types/hono-env.type.js";
import { Hono } from "hono";
import { getTodosByUserId, insertTodo } from "./todo.repository.js";
import { createTodoValidator } from "./todo.validator.js";

export const todoRouter = new Hono<HonoVar>();

todoRouter.use(authMiddleware);

todoRouter.get("/", async (c) => {
  const user = c.get("user");

  try {
    const todoList = await getTodosByUserId(user.id);
    return c.json({ todos: todoList });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

todoRouter.post("/", createTodoValidator, async (c) => {
  const user = c.get("user");
  const todoData = c.req.valid("json");

  try {
    const newTodo = await insertTodo({
      userId: user.id,
      ...todoData,
    });
    return c.json({ todo: newTodo }, 201);
  } catch (error) {
    console.error("Error creating todo:", error);
    return c.json({ error: "Failed to create todo" }, 500);
  }
});
