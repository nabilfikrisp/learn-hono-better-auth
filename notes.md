# Notes

## schema.ts

need to export the tableFunction, cannot do central default export

```ts
// this works ✅
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
});
```

```ts
// this doesnt ❌
const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
});

export const schema = {
  usersTable,
};
```

## better auth table schema

setup better auth through its [docs](https://www.better-auth.com/docs/installation)

then generate the schema needed for better auth

```bash
pnpm dlx @better-auth/cli@latest generate
```

this will generate auth-schema.ts in root folder, just copy paste the content to our db/schema.ts
we need to do this for every user table changes

## expanding user table from better auth

we may do it manually but better auth provides addational fields on setup

```ts
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      hobby: { type: "string", required: false },
    },
  },
});
```

## better auth routes docs

start the server and open this [http://localhost:3001/api/auth/reference#tag/default](http://localhost:3001/api/auth/reference#tag/default)

## BetterAuth uses a traditional session-based authentication model with HTTP-only cookies.

When a user signs in, BetterAuth creates a session in the database and sets an HTTP-only cookie on the client. The browser automatically sends this cookie with each request. On my side, I set up the auth middleware (BetterAuth provides examples) to validate the cookie by checking the corresponding session in the session table. If the session exists and is valid, I get the user details from BetterAuth; if it doesn’t, I handle it myself—for example, by returning a 401 Unauthorized or redirecting to the login page.

## step by step from the first

- setup hono
- setup drizzle
- setup better auth
- generate better auth schema first
- move the scehma to our own shecma file
- generate drizzle migrations
- migrate drizzle schema
- setup email and password in better auth, with openAPI plugins
- check the traditional email password sign up, sign in, and sign out
- set up mock SMTP using mailpit docker image
- implement our own nodemailer funciton
- attach the function to emailVerification in better auth config
- test the sign in if the verification working
- setup middleware and cors, guard protected routes with the middleware (better auth give us the example)
- create todo route, and guard it
- the follow along is done
