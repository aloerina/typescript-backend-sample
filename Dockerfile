#############################
# Generate node_modules
#############################
FROM node:20.10.0-slim AS modules-builder
WORKDIR /app

COPY package.json package-lock.json ./
# PrismaClient の生成に必要
COPY prisma ./prisma
# npm install 時に postinstall で `prisma generate` が自動実行される
# https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client#generating-prisma-client-in-the-postinstall-hook-of-prismaclient
RUN --mount=type=cache,target=~/.npm npm ci --only=production


#############################
# Generate js files
#############################
FROM node:20.10.0-slim AS js-builder
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
# tsc を通すために PrismaClient が必要
COPY prisma ./prisma
RUN --mount=type=cache,target=~/.npm npm ci
COPY src ./src
RUN npm run build


#############################
# Target image
#############################
FROM node:20.10.0-slim
ENV NODE_ENV=production
WORKDIR /app

# Prisma の依存パッケージ
RUN --mount=type=cache,target=/var/cache/apt \
    --mount=type=cache,target=/var/lib/apt/lists \
    rm /etc/apt/apt.conf.d/docker-clean \
    && apt-get update \
    && apt-get install -y --no-install-recommends libssl3=3.0.11-1~deb12u2

# express-openapi-validator のために OpenAPI Spec のファイルが必要
COPY openapi ./openapi
COPY --from=js-builder /app/dist ./dist
COPY --from=modules-builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "/app/dist/index.js"]
