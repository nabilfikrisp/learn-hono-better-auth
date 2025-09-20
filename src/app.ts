import { Hono } from "hono";
import { auth } from "./lib/auth.js";
import type { HonoVar } from "./common/types/hono-env.type.js";
import { todoRouter } from "./api/todo/todo.router.js";
import { cors } from "hono/cors";

const app = new Hono<HonoVar>();

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});
app.route("/api/todos", todoRouter);

export { app };
