#!/usr/bin/env bash

_DIR=$(cd "$(dirname "$0")"; pwd)

cd $_DIR

set -ex

git pull

version=$(cat package.json|jq -r '.version')

./build.sh
min(){
bun run uglifyjs -- -o min.$2 --compress --mangle --toplevel -- $1.$2
}
min lib/index js
min lib/index cjs
#exit 0
mdi
npm set unsafe-perm true
npm version patch
git add -u
git commit -m v$version || true
git push
npm publish --access=public
