FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose the port your Angular app runs on
EXPOSE 4007

# Build and serve the Angular app
CMD npm  start
