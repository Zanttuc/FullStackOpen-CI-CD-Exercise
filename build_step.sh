#!/bin/bash

echo "Build script"

npm install --include=dev
npm run build
