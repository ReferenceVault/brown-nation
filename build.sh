#!/usr/bin/env bash
# Installs dependencies and compiles the Next.js app. Run from anywhere.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

npm install
npm run build
