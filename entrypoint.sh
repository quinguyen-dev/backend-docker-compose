#!/bin/sh

# Generate Prisma artifacts
yarn prisma generate

# Deploy schema into database
yarn prisma migrate deploy

# Enable hot reloading
yarn tsx watch src/index.ts