# Specify the base image with Node.js pre-installed
FROM node:16


# Create app directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the app's source code
COPY . .

# Expose the port that the app listens on
EXPOSE 3014

# Start the app
CMD [ "npm", "start" ]
