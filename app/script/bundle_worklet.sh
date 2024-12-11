#!/bin/bash

echo "current bare-pack version:"
bare-pack --version

# start compile bundles
bare-pack --out worklet/app.bundle.js worklet/app.cjs
