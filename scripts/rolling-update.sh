#! bash

# path
WORKDIR="$HOME"/demo_api
PNPM="$HOME"/.local/share/pnpm/pnpm

cd "$WORKDIR"

"$PNPM" prod:docker build nest-app

"$PNPM" prod:docker up -d --no-deps nest-app
