import { serve } from "@hono/node-server";
import { app } from "./app.js";
import { ENV } from "./utils/envConfig.js";

serve(
  {
    fetch: app.fetch,
    port: ENV.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
