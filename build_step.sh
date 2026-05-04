#!/bin/bash

echo "Build script"

npm install --include=dev
npm --prefix frontend install
npm run build
