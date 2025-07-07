# Use an official Node.js runtime as the base image
FROM node:18.18.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --force

# Copy the entire application code to the container
COPY . .

# Build the React application 
RUN npm run build

# Expose a port for the application (e.g., port 80)
EXPOSE 5000

# Define the command to start the application
CMD [ "npm", "start" ]
