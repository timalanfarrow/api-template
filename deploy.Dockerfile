# FID Access Dockerfile
#
# For more information on how to modify this file and all
# available directives, visit the link below:
# https://docs.docker.com/engine/reference/builder/

# Node chosen for its immediate access to NodeJS; ships
# with the yarn package manager and Aptitude
# https://yarnpkg.com/en/
ARG VERSION=11
FROM node:${VERSION}

# Super meta
LABEL author="JETS Tech"
LABEL appName="api-template"
LABEL appVersion="0.0.1"

# Copy all files (that aren't ignored by .dockerignore) to
# our `home/api` directory and install all project dependencies
WORKDIR /home/api
COPY . .
# uncomment if you always want fresh packages
RUN yarn --pure-lockfile
# uncomment if you want to use the in-cache node_modules
# RUN yarn

# Init project env variables and expose app port; NODE_ENV
# is set to `production` here. Use `yarn dev` locally for
# development; only use Docker for deploying the
# application.
ENV NODE_ENV=production
ENV PORT=8912

RUN yarn knex migrate:latest

EXPOSE 8912

CMD yarn test:base
