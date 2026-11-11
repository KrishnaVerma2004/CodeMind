# Multi-stage Dockerfile for CodeMind AI Platform
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY worker/package*.json ./worker/
COPY frontend/package*.json ./frontend/

RUN npm install

# Copy source
COPY . .

# Build frontend
RUN npm --workspace=frontend run build

EXPOSE 5000 5173

CMD ["npm", "run", "dev:backend"]

