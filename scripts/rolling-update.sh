#! bash

# path
WORK_DIR="$HOME"/demo_api
PNPM="$HOME"/.local/share/pnpm/pnpm

cd "$WORK_DIR"

PREVIOUS_CONTAINER_ID=$("$PNPM" run --silent prod:docker ps --services nest-app -q)

"$PNPM" prod:docker build nest-app

docker container kill -s SIGTERM "$PREVIOUS_CONTAINER_ID"
docker container remove -f "$PREVIOUS_CONTAINER_ID"

"$PNPM" prod:docker up -d
