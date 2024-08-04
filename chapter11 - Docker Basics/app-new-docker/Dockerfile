# Pull the image of node to create a container that have node pre-installed
FROM node:latest

# Files to be copied to the container work directory
# COPY index.js /home/app/index.js
# COPY package.json /home/app/package.json

# Command to copy all files from the current directory to the work directory
COPY . /home/app

# Setting the work directory of the container
WORKDIR /home/app

# Command will be run to install the dependencies in the container
RUN npm install

# Exposing the port 3000 from the container
EXPOSE 3000

# Runs command to start the application in the container
CMD ["node", "index.js"]