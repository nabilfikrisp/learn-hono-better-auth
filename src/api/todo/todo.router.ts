import { authMiddleware } from "@/common/middlewares/auth.middleware.js";
import { type HonoVar } from "@/common/types/hono.types.js";
import { Hono } from "hono";
import { createTodoValidator } from "./todo.validator.js";
import { getTodos, insertTodo } from "./todo.repository.js";

const todoRouter = new Hono<HonoVar>();

todoRouter.use(authMiddleware);

todoRouter.get("/", async (c) => {
  const result = await getTodos();

  return c.json(result);
});

todoRouter.get("/me", async (c) => {
  const user = c.get("user");
  const todos = await getTodos({ userId: user.id });

  return c.json({ todos });
});

todoRouter.post("/", createTodoValidator, async (c) => {
  const user = c.get("user");
  const tododata = c.req.valid("json");

  try {
    const newTodo = await insertTodo({ userId: user.id, ...tododata });
    return c.json({ data: newTodo }, 201);
  } catch (error) {
    console.error("Error inserting todo:", error);
    return c.json({ message: "Failed to create todo" }, 500);
  }
});

export default todoRouter;
