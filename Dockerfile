FROM node:22 AS builder
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:22-alpine
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /usr/src/app/dist ./dist
CMD ["pnpm", "run", "start:prod"]
