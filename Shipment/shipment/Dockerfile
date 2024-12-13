# Dockerfile 

FROM node:16-alpine

# Set working directory in container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the NestJS application (or other build command)
RUN npm run build

# Expose the correct port
EXPOSE 8000

# Command to start the application
CMD ["npm", "run", "start:prod"]
