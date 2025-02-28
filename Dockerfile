# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev  # Устанавливаем только прод-зависимости

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache tini

COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Используем tini для правильного управления процессами
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "src/index.js"]

# Открываем порт
EXPOSE 8080

# Создаём и переключаемся на пользователя nodejs
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nodejs -u 1001 \
    && chown -R nodejs:nodejs /app
USER nodejs
