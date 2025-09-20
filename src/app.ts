import { Hono } from "hono";
import { auth } from "./lib/auth.js";

const app = new Hono();

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

export { app };
