# Backend-only Docker image for Render or local testing
FROM node:18-alpine

WORKDIR /app

COPY backend/package.json backend/package-lock.json ./
RUN npm install

COPY backend ./

ENV NODE_ENV=production
CMD ["npm", "start"]
