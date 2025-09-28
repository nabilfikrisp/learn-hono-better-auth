import { Hono } from "hono";
import { cors } from "hono/cors";
import type { HonoVar } from "./common/types/hono.types.js";
import { auth } from "./lib/auth.js";

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

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

export { app };
