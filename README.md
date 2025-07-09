# Resource Manager

A React UI library for resource management with dynamic forms and tables built with shadcn/ui components.

## 📦 Packages

- **`resource-manager-ui`** - Core UI components library
- **`resource-manager-docs`** - Documentation and Storybook examples

## 🚀 Quick Start

```bash
# Install dependencies
pnpm bootstrap

# Start development environment (UI + docs)
pnpm dev

# Build everything for production
pnpm build
```

## 📋 Available Commands

### Development

```bash
# Start both UI dev mode and docs
pnpm dev

# Start just the UI package in watch mode
pnpm dev:ui

# Start just the docs
pnpm dev:docs
```

### Building

```bash
# Build everything (UI + docs)
pnpm build

# Build just the UI package
pnpm build:ui

# Build just the docs
pnpm build:docs
```

### Cleaning

```bash
# Clean all build artifacts
pnpm clean

# Clean just UI dist folder
pnpm clean:ui

# Clean just docs dist/storybook folders
pnpm clean:docs
```

### Linting & Type Checking

```bash
# Lint all packages
pnpm lint

# Lint with auto-fix
pnpm lint:fix

# Lint individual packages
pnpm lint:ui
pnpm lint:docs

# Type check all packages
pnpm type-check

# Type check individual packages
pnpm type-check:ui
```

### Storybook

```bash
# Start Storybook dev server
pnpm storybook

# Build Storybook for production
pnpm storybook:build

# Start Storybook in docs mode
pnpm storybook:docs
```

### Preview

```bash
# Preview built docs
pnpm preview

# Alternative preview command
pnpm preview:docs
```

### Publishing & Release

```bash
# Dry run publish (see what would be published)
pnpm release:dry

# Build and publish the UI package
pnpm release

# Changeset commands (for version management)
pnpm changeset
pnpm changeset:version
pnpm changeset:publish
```

## 🔄 Common Workflows

### Development Workflow
```bash
# 1. Install dependencies
pnpm bootstrap

# 2. Start development
pnpm dev

# 3. Make changes to components in packages/resource-manager-ui/src/
# 4. View changes in docs at http://localhost:5173
# 5. View Storybook at http://localhost:6006 (run pnpm storybook)
```

### Clean Build Workflow
```bash
# Clean and rebuild everything
pnpm clean && pnpm build
```

### Lint and Fix Issues
```bash
# Check for linting issues
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Check types
pnpm type-check
```

### Release Workflow
```bash
# 1. Make sure everything builds
pnpm build

# 2. Check what would be published
pnpm release:dry

# 3. Publish to npm
pnpm release
```

## 🏗️ Project Structure

```
resource-manager/
├── packages/
│   ├── resource-manager-ui/    # Core UI library
│   │   ├── src/
│   │   │   ├── components/     # React components
│   │   │   ├── lib/           # Utilities
│   │   │   └── index.ts       # Main exports
│   │   ├── dist/              # Built files
│   │   └── package.json
│   └── docs/                  # Documentation & Storybook
│       ├── src/
│       └── package.json
├── package.json               # Root package with scripts
├── pnpm-workspace.yaml       # PNPM workspace config
└── README.md                 # This file
```

## 🛠️ Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4+** - Styling
- **shadcn/ui** - Component foundation
- **Radix UI** - Headless components
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Vite** - Build tool
- **Storybook** - Component documentation
- **PNPM** - Package manager

## 📚 Documentation

- **Local Development**: [http://localhost:5173](http://localhost:5173) (after running `pnpm dev`)
- **Storybook**: [http://localhost:6006](http://localhost:6006) (after running `pnpm storybook`)

## 🔧 Requirements

- Node.js 18+
- PNPM 8+

## 📄 License

MIT
