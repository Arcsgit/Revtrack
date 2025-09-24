# Multi-stage build for Next.js with Python support
FROM node:18-alpine AS base

# Install Python and build dependencies
RUN apk add --no-cache python3 py3-pip python3-dev build-base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY Backend/package*.json ./Backend/
RUN npm ci
RUN cd Backend && npm ci

# Install Python dependencies
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

# Install Playwright browsers
RUN npx playwright install --with-deps chromium

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/Backend/node_modules ./Backend/node_modules
COPY . .

# Build Next.js app
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Install Python and runtime dependencies
RUN apk add --no-cache python3 py3-pip
COPY --from=deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=deps /root/.cache/ms-playwright /root/.cache/ms-playwright

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/Backend ./Backend
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/*.py ./

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]