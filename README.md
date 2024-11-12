# polling-app

This is a polling app made for the ConnectHear assessment process.

## Requirements

- docker-compose
- node + yarn
- TinyImage API Key

## Stack

- SvelteKit
- Drizzle
- Playwright (WIP)
- Tailwind

### Setup

- Clone the repository
- Rename env.example to .**env** and add the tinyImg api key.
- Install dependencies

```sh
yarn
```

In a separate terminal, run:

```bash
docker compose up
```

Push the schema to the database:

```sh
yarn run db:push
```

Run the app

```sh
yarn run dev
```

---
