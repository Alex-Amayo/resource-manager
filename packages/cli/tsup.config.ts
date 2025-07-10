import { defineConfig } from 'tsup'

export default defineConfig([
  // CLI executable
  {
    entry: ['src/cli.ts'],
    format: ['cjs'],
    dts: false,
    clean: true,
    shims: true,
    minify: false,
    banner: {
      js: '#!/usr/bin/env node'
    }
  },
  // Library exports
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    dts: true,
    clean: false,
    shims: true,
    minify: false
  }
])
