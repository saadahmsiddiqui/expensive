# Expensive

Expensive is a free and open source expense manager app build using MERN stack which is still a WIP. Motivation to build this application was inconsistent UI on the proprietary application Wallet by BudgetBakers. https://budgetbakers.com/

# Features

- [ ] Multiple currency support
- [ ] Add, Update, Delete expense records
- [ ] Statistics and reports
- [ ] Loans and Debts
- [ ] Crypto Wallet Integration
- [ ] Modern and simple UI
- [ ] Toast notifications
- [ ] Android Support
- [ ] OAuth Support
- [ ] User registration

# Setup

- Postgres required, or using a docker container for Postgres is easier just run:
  ```sh
  docker run --name expensive-db -p 5432:5432 -e POSTGRES_PASSWORD=expensive -e POSTGRES_USER=expensive -e POSTGRES_DB=expensive -d postgres
  ```
- Create an `env` file in `apps/api` and update with the following variables
  ```sh
  PORT=
  DATABASE_URL=
  JWT_SIGNING_KEY=""
  USER_PASSWORD_ENCRYPTION_SALT=""
  ```
- You will need to run prisma generation and migration scripts
  ```sh
  yarn workspace @expensive/api prisma:generate
  yarn workspace @expensive/api prisma:migrate
  ```
- Start server
  ```sh
  yarn workspace @expensive/api start:dev
  ```
- Start front end
  ```sh
  yarn workspace @expensive/app start:dev
  ```
