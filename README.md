# Event Ticket System - Frontend

Web frontend for the **Event Ticket System**, a university project for the *Databases in Network Applications* course.
It is the client for the Django REST API in [Isia07/BazyDanych](https://github.com/Isia07/BazyDanych), which runs the
same domain on four different databases. The frontend lets you switch between them at runtime.

## Features

**For customers**
- Browse upcoming events and view event details
- Order tickets: choose a ticket type and quantity, apply available discounts and confirm the order
- Register and log in (password strength meter, form validation)
- Send messages to the organisers and receive notifications in reply

**Admin panel** (users with `is_staff`)
- Create, edit and delete events, event types, ticket types, discounts and order statuses
- Read customer messages and reply with notifications

**Database switcher**

The backend exposes the same API for four databases, and the frontend sends every request to the one you pick:

| Option    | Database                         | API prefix         |
|-----------|----------------------------------|--------------------|
| `rel`     | relational (PostgreSQL)          | `/api/v1/rel/`     |
| `obj-rel` | object-relational (PostgreSQL)   | `/api/v1/obj-rel/` |
| `obj`     | object (ZODB)                    | `/api/v1/obj/`     |
| `nosql`   | NoSQL (MongoDB)                  | `/api/v1/nosql/`   |

Each database has its own users, so switching the database logs you out.

## Tech stack

Nuxt 4, Vue 3 (Composition API), TypeScript, Nuxt UI 4, Tailwind CSS 4, Pinia, Zod, ESLint.

## Project structure

- `app/components/` - components organised with Atomic Design: `Atoms`, `Molecules`, `Organisms`, `Template`
- `app/pages/` - customer pages, auth pages and the `/admin` panel
- `app/stores/` - one Pinia store per API resource (events, orders, tickets, discounts, messages, ...)
- `app/plugins/auth-fetch.ts` - `$apiFetch` and `$authFetch`: build the API URL for the selected database and add
  the auth token to requests
- `app/middleware/` - route guards for logged-in users, the admin panel and route ids
- `shared/types/` - TypeScript types of the API resources

## Getting started

1. Start the backend from [Isia07/BazyDanych](https://github.com/Isia07/BazyDanych) with Docker Compose. The API
   listens on `http://localhost:8000`.
2. Configure the frontend:

   ```bash
   cp .env.example .env
   # NUXT_PUBLIC_BASE_URL=http://localhost:8000
   ```

3. Install dependencies and run the dev server on `http://localhost:3000`:

   ```bash
   pnpm install
   pnpm dev
   ```

Other scripts: `pnpm build` (production build), `pnpm preview` (preview the build).

Everything in it comes from the code of both repos:
- Four databases and API prefixes: from SetDatabase.vue, auth-fetch.ts and the backend's urls.py.
- Port 8000: from the backend's docker-compose.yml.
- Logout after switching the database: from the switcher form.
- Admin access: from the admin.ts middleware, which checks is_staff.
