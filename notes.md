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
