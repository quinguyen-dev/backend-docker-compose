# Create a base image for the containers
FROM node:18-alpine3.16 AS base

# Define the working directory and use it
ENV WORKDIR=/usr/src/app
WORKDIR $WORKDIR

# Postgres Informatoin
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB
ARG POSTGRES_CONTAINER
ARG POSTGRES_PORT

# Copy over package.json and yarn lock file
COPY package.json .
COPY yarn.lock .

# Install packages
RUN yarn install


# Create image for development
FROM base AS development

# Define arguments 
ARG BACKEND_PORT

# Define environmental variables
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_CONTAINER=$POSTGRES_CONTAINER
ENV POSTGRES_DB=$POSTGRES_DB
ENV POSTGRES_PORT=$POSTGRES_PORT
ENV BACKEND_PORT=$BACKEND_PORT

# Create variable for database url
ENV DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_CONTAINER}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public

# Copy files into image
COPY . . 

CMD source entrypoint.sh