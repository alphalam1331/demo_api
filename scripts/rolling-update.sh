#! bash

# path
WORK_DIR="$HOME"/demo_api
PNPM="$HOME"/.local/share/pnpm/pnpm

cd "$WORK_DIR"

"$PNPM" prod:docker build nest-app

"$PNPM" prod:docker up -d --no-deps nest-app
