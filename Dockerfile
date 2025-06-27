# Base image
FROM node:18-alpine AS builder

# work direction
WORKDIR /app

# copy package.json & lock and install dependencies
COPY package*.json ./
RUN npm ci

# clone code
COPY . .

# Next.js build 
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install Production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# copy build files from Builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# run app
EXPOSE 3000
CMD ["npm", "start"]
