# Getting Started

### Overview

This application uses the the following tech stack.

- ReactJS
- NodeJS
- TypeScript
- Prisma
- Postgres
- Express
- Docker (For the database)

> [!TIP]
> I could have made it using the `pnpm` or the `yarn` package manager but for this use case npm will do the job

## Setup

## Install dependencies manually

```sh
cd server

```

```sh
npm install
```

```sh
cd client
```

```sh
npm install
```

### Setup the database locally

> [!IMPORTANT]
> Make sure your postgresql database is running locally

- Set the password to the postgresql database `POSTGRES_PASSWORD=mysecretpassword`
- Leave the user as `postgres`
- Map the port to `5432:5432`

### Docker DB Setup

Run the following command

```sh
docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

### Migrate and Seed the database

To seed the database locally run the following commands:

```sh
cd server
```

```sh
npx prisma migrate dev
```

```sh
npx prisma db seed
```

## Commands

Run the following commands to run the server:

- `cd` in to the `server` directory.

```sh
cd server
```

```sh
npm install
```

```sh
npm run dev
```

Run the following commands to run the frontend:

- `cd` into the `client` directory.

```sh
cd client
```

```sh
npm install
```

```sh
npm run dev
```
