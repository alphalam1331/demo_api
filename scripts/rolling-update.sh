#! bash

# path
WORK_DIR="$HOME/demo_app"
PNPM="$HOME/.local/share/pnpm/pnpm"

cd $WORK_DIR

PREVIOUS_CONTAINER_ID=$($PNPM run --silent prod:docker ps --services nest-app -q)

$PNPM prod:docker build

docker container kill -s SIGTERM $PREVIOUS_CONTAINER_ID
docker container remove -f $PREVIOUS_CONTAINER_ID

$PNPM prod:docker up -d
