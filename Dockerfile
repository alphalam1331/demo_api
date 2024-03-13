FROM node:21-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV WORKDIR="/home/demo_api"

RUN corepack enable
WORKDIR $WORKDIR

COPY . .

# Install prod-dependencies
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --ignore-scripts

# Install dev-dependencies and build
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run build

FROM base AS dev
COPY --from=build $WORKDIR/node_modules $WORKDIR/node_modules
COPY --from=build $WORKDIR/dist $WORKDIR/dist
CMD [ "pnpm", "dev" ]

FROM base AS prod
COPY --from=prod-deps $WORKDIR/node_modules $WORKDIR/node_modules
COPY --from=build $WORKDIR/dist $WORKDIR/dist
CMD [ "pnpm", "prod" ]
