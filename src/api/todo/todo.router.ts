import { authMiddleware } from "@/common/middlewares/auth.middleware.js";
import { type HonoVar } from "@/common/types/hono.types.js";
import { Hono } from "hono";
import { createTodoValidator } from "./todo.validator.js";
import { completeTodo, getTodos, insertTodo } from "./todo.service.js";

const todoRouter = new Hono<HonoVar>();

todoRouter.use(authMiddleware);

todoRouter.get("/", async (c) => {
  const result = await getTodos();

  return c.json({ message: "Success get todos", ...result });
});

todoRouter.get("/me", async (c) => {
  const user = c.get("user");
  const result = await getTodos({ userId: user.id });

  return c.json({ message: "Success get my todos", ...result });
});

todoRouter.post("/", createTodoValidator, async (c) => {
  const user = c.get("user");
  const tododata = c.req.valid("json");

  try {
    const newTodo = await insertTodo({ userId: user.id, ...tododata });

    return c.json({ message: "Success create todo", data: newTodo }, 201);
  } catch (error) {
    console.error("Error inserting todo:", error);

    return c.json({ message: "Failed to create todo" }, 500);
  }
});

todoRouter.post("/:id/complete", async (c) => {
  const user = c.get("user");
  const todoId = c.req.param("id");

  try {
    const updatedTodo = await completeTodo(todoId, user.id);

    return c.json({
      message: "Todo completed",
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Error completing todo:", error);

    return c.json({ message: "Failed to complete todo" }, 500);
  }
});

export default todoRouter;
