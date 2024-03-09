#! bash

# path
WORK_DIR="$HOME"/demo_api
PNPM="$HOME"/.local/share/pnpm/pnpm

cd "$WORK_DIR"

PREVIOUS_CONTAINER_ID=$("$PNPM" run --silent prod:docker ps --services nest-app -q)

"$PNPM" prod:docker build nest-app

if [ -n $PREVIOUS_CONTAINER_ID ]; then
    docker container kill -s SIGTERM "$PREVIOUS_CONTAINER_ID"
    docker container remove -f "$PREVIOUS_CONTAINER_ID"
fi

"$PNPM" prod:docker up -d --no-deps nest-app
