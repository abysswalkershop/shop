FROM node:24-alpine AS builder

WORKDIR /app

COPY . .

ENV NODE_ENV=production

RUN npm install
RUN npm run build

# ----
FROM node:24-alpine

WORKDIR /app

ENV DISABLE_MEDUSA_ADMIN=false
ENV MEDUSA_WORKER_MODE=server
ENV PORT=9000

COPY --from=builder /app/.medusa/server /app/

ENV NODE_ENV=production

RUN npm install

EXPOSE 9000

CMD ["sh", "-c", "npm run predeploy && npm run start"]