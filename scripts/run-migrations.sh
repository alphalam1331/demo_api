#! bash

# path
WORKDIR="$HOME"/demo_api
PNPM="$HOME"/.local/share/pnpm/pnpm

cd "$WORKDIR"

APP_CONTAINER_ID=$("$PNPM" --silent prod:docker ps -a -q --services nest-app)
echo "$APP_CONTAINER_ID"
docker exec -w /home/demo_api "$APP_CONTAINER_ID" pnpm db:mrun
