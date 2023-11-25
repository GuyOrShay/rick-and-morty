# Stage 1: Build the Angular application
FROM node:16 as builder

# Set the working directory
WORKDIR /app

# # Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy NX workspace configuration files
COPY nx.json ./

# Copy the apps and libs directories
# COPY apps ./
COPY ./ ./

RUN npm i -g nx

# Build the specific project
RUN npx nx run rick-and-morty:build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=builder /app/dist/rick-and-morty /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
