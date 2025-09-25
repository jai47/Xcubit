# 1. Use the official Node.js image as a base
FROM node:20-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package.json package-lock.json* ./

# 4. Install dependencies
RUN npm install --omit=dev --legacy-peer-deps

# 5. Copy the rest of the application code
COPY . .

# 6. Build the Next.js project
RUN npm run build

# 7. Use a lightweight base image for production
FROM node:20-alpine AS runner

# 8. Set the working directory and environment
WORKDIR /app

# 9. Copy built assets and dependencies from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 10. Set environment variables
ENV NODE_ENV=production

# 11. Expose the Next.js default port
EXPOSE 3000

# 12. Run the Next.js application
CMD ["npm", "start"]

# helpdesk
# about
# remove ticket

#  docker build --platform linux/amd64 -t xcubit:2.6 .
#  docker tag xcubit:2.6 jai4/xcubit:2.6
# docker push jai4/xcubit:2.6
# docker run -d -p 3000:3000 --env-file .env jai4/xcubit:2.5