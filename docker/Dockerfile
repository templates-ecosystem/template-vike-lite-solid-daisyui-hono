ARG PORT=3000

# ================================
# Stage 1: Builder
# ================================
# https://nodejs.org/en/about/releases/
# https://github.com/nodejs/Release#readme
FROM node:26-alpine AS builder

WORKDIR /app

# Copy Yarn files
COPY .yarnrc.yml package.json yarn.lock \
# Copy the config files
vite.config.ts ./

# Copy Yarn files 
COPY .yarn/patches ./.yarn/patches
COPY .yarn/plugins ./.yarn/plugins
COPY .yarn/releases ./.yarn/releases
COPY docker/serverEntryDocker.mjs ./docker/serverEntryDocker.mjs

# Copy the source code
COPY src ./src

ENV IS_DOCKER=true

# Install dependencies
RUN yarn install --immutable \
# Build the application
&& yarn build:docker

# ================================
# Stage 2: Production
# ================================
FROM node:26-alpine

ARG PORT

# Install tini for proper signal handling/processing and zombie killing
RUN apk add --no-cache tini

WORKDIR /app

# Copy the build output
COPY --from=builder /app/dist ./dist

# Copy Yarn files
COPY .yarnrc.yml package.json yarn.lock ./
COPY .yarn/patches ./.yarn/patches
COPY .yarn/plugins ./.yarn/plugins
COPY .yarn/releases ./.yarn/releases

# Use node-modules linker instead of PnP
RUN yarn config set nodeLinker node-modules \
# Install production dependencies
&& yarn workspaces focus --production \
# Clean up unnecessary files
&& yarn cache clean --all \
&& rm -rf .yarn .yarnrc.yml package.json yarn.lock

# Override some config defaults with values that will work better for docker
ENV NODE_ENV=production \
PORT=${PORT} \
VCAP_APP_HOST=0.0.0.0

EXPOSE ${PORT}

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/server/index.mjs"]
