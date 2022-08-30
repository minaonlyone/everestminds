FROM node:14-alpine AS builder
ENV NODE_ENV production
# Install dependencies
WORKDIR /
COPY package.json .
COPY package-lock.json .
RUN npm install 
WORKDIR /everestminds
# Install other dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install 
# Build the app & Copy Files
RUN npm build
WORKDIR /
COPY . .
EXPOSE 5000
# Start the app
CMD ["npm", "start"]