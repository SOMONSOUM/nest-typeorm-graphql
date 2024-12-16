## Setup

1. Clone the repository
2. Run `yarn install`
3. Run `cp .env.example .env && npm run migration:run`
4. Run `yarn start:dev` to start the server
5. The migrations will be automatically run when the server starts
6. Change any entity (create a new one, or modify an existing one)
7. Run `npm run migration:generate --name=my-migration-name` to generate a new migration
8. Run `npm run migration:run` to run the new migration (or just restart the server)
