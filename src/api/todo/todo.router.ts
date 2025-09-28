import { authMiddleware } from "@/common/middlewares/auth.middleware.js";
import { type HonoVar } from "@/common/types/hono.types.js";
import { Hono } from "hono";

const todoRouter = new Hono<HonoVar>();

todoRouter.use(authMiddleware);

todoRouter.get("/", (c) => {
  const user = c.get("user");
  return c.json({ message: `Hello, ${user.name}. Here are your todos.` });
});

export default todoRouter;
