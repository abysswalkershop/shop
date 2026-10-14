FROM oven/bun:1.3.6-alpine AS dependencies
WORKDIR /app

COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Public keys are embedded by Next.js. The backend must be reachable at build time.
ARG MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_STRIPE_KEY
ARG NEXT_PUBLIC_DEFAULT_REGION=us
ARG STOREFRONT_STATIC_COUNTRIES

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN node node_modules/next/dist/bin/next build

FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8000
ENV HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
# Keep the prewarmed API responses, without shipping the compiler cache.
COPY --from=builder --chown=node:node /app/.next/cache/fetch-cache ./.next/cache/fetch-cache

USER node
EXPOSE 8000
CMD ["node", "server.js"]
