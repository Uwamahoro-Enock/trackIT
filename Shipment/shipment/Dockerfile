# Start with the official Node.js image
FROM node:16

# Create app directory in container
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app’s source code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port for the shipment service (e.g., 3001)
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start:prod"]
