#!/usr/bin/env bash

DIR=$(dirname $(realpath "$0"))
cd $DIR
set -ex

rm -rf lib
rsync -av --include='*/' --include='*.js' --include='*.mjs' --exclude=* src/ lib/
bun run cep -- -o lib -c src
#esbuild --format=esm --allow-overwrite --bundle --target=node18 --outdir=lib lib/index.js
bun run babel --plugins @babel/plugin-transform-modules-commonjs lib/*.js -d lib --out-file-extension .cjs
