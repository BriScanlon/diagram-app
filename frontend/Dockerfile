# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Vite app
RUN npm run build

# Use nginx to serve the frontend build files
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80 to serve the frontend
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
