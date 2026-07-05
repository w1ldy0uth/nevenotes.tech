FROM oven/bun:1-alpine AS base
WORKDIR /app

FROM base AS build
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --network-concurrency=8
COPY . .
RUN bun run build

FROM base AS prod-deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production --network-concurrency=8

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY package.json ./
COPY scripts ./scripts
COPY drizzle ./drizzle
COPY src/lib/server/db ./src/lib/server/db

EXPOSE 3000
CMD ["bun", "./build/index.js"]
