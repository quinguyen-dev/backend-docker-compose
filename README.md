# Prisma/Postgres/Docker Mini Project

### To run application:

1. `yarn install`
2. `yarn run dev`

Once the containers spin up, you can seed the database with `yarn prisma db seed`. The project directory should be mounted within the backend container, so live edits on your machine should reflect over.
