# Set the base image
FROM node:latest

# Update application repository list
RUN apt-get update

RUN npm install

# Make a folder in your image where your app's source code can live
RUN mkdir -p /src/app

# Tell your container where your app's source code will live
WORKDIR /src/app

# What source code do you what to copy, and where to put it?
COPY . /src/app

# Expose default port
EXPOSE 8080

# Set the default command
CMD ["npm", "run server-dev"]