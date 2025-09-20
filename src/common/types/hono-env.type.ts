import type { auth } from "@/lib/auth.js";

export type HonoVar = {
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
};
