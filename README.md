# nevenotes.tech

My personal site - bio, blog, notes, and projects, backed by a self-built CMS . Built with SvelteKit and Bun, self-hosted on k8s.

## Stack

- **SvelteKit** + **Bun** (native Postgres client, password hashing, S3 client)
- **Postgres** via `drizzle-orm`, **MinIO** (S3-compatible) for images/resumes
- Markdown rendering via `marked` + `shiki`, full-text search via Postgres `tsvector`
- Custom session-cookie auth (single admin, no signup flow)
- Tailwind CSS v4, dark mode + accent color picker, EN/RU i18n

## Local development

```sh
docker compose up -d        # Postgres + MinIO
bun install
bun run db:migrate
bun run create-admin <email> <password>
bun run dev
```

Copy `.env.example` to `.env` first and fill in the values (defaults match `docker-compose.yml`).

## Scripts

| Command                   | Description                                      |
| ------------------------- | ------------------------------------------------ |
| `bun run dev`             | Start the dev server                             |
| `bun run build`           | Production build                                 |
| `bun run check`           | Typecheck                                        |
| `bun run lint` / `format` | Lint / format                                    |
| `bun run db:generate`     | Generate a Drizzle migration from schema changes |
| `bun run db:migrate`      | Apply migrations                                 |
| `bun run create-admin`    | Seed the single admin user                       |

## Deployment

Docker image built via the root `Dockerfile`, deployed with the Helm chart in `helm/nevenotes-tech/`.
CI (`.github/workflows/ci.yml`) builds and pushes the image to GHCR on merge to `main`.
