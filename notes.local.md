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

## next step

- for our own implementation, implement all crud with raw sql and attach openAPI for every route
