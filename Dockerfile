# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache tini

COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Use tini as entrypoint to handle signals properly
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "src/index.js"]

# The port your app runs on
EXPOSE 8080

# Set Node to production mode
ENV PORT=8080
# ENV NODE_ENV=production

# Create a non-root user and switch to it
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nodejs -u 1001 \
    && chown -R nodejs:nodejs /app
USER nodejs