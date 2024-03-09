FROM node:21-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /home/demo
COPY . .

# Install prod-dependencies
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --ignore-scripts

# Install dev-dependencies and build
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run build

FROM base AS dev
COPY --from=build /home/demo/node_modules /home/demo/node_modules
COPY --from=build /home/demo/dist /home/demo/dist
CMD [ "pnpm", "dev" ]

FROM base AS prod
COPY --from=prod-deps /home/demo/node_modules /home/demo/node_modules
COPY --from=build /home/demo/dist /home/demo/dist
CMD [ "pnpm", "prod" ]
