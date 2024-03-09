#! bash

# path
WORK_DIR="$HOME/demo_app"
PNPM="$HOME/.local/share/pnpm/pnpm"

cd $WORK_DIR

$PNPM prodc build
$PNPM prodc up -d
