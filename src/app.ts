import { Hono } from "hono";
import { cors } from "hono/cors";
import type { HonoVar } from "./common/types/hono.types.js";
import { auth } from "./lib/auth.js";
import todoRouter from "./api/todo/todo.router.js";
import leaderboardRouter from "./api/leaderboard/leaderboard.router.js";

const app = new Hono<HonoVar>();

app.use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
app.route("/api/todos", todoRouter);
app.route("/api/leaderboard", leaderboardRouter);

export { app };
