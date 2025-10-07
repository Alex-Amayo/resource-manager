#!/usr/bin/env zsh

echo "Building GitHub Pages version..."
pnpm build:gh-pages

echo "Installing serve if needed..."
pnpm dlx serve -v >/dev/null 2>&1 || pnpm add -g serve

echo "Starting local server..."
pnpm dlx serve packages/demo/out -p 8080

echo "You can now view the GitHub Pages build at http://localhost:8080"
