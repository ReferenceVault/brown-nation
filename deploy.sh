#!/usr/bin/env bash
# Pulls the latest main, rebuilds, and (re)starts the app under pm2.
# Safe to re-run.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

git pull origin main
./build.sh
pm2 startOrReload ecosystem.config.js
pm2 save
