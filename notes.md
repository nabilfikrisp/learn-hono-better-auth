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
