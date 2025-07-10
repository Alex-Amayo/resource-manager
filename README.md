# Resource Manager

A comprehensive resource management solution for React applications. Get production-ready components via CLI - no package installation required.

## 🏗️ Architecture

- **CLI-First Approach** - Copy components as source files, not packages
- **shadcn/ui Compatible** - Works alongside existing shadcn/ui components  
- **Tailwind CSS v4** - Modern styling with CSS variables
- **TypeScript Ready** - Full type safety out of the box

## 📦 Packages

- **`@resource-manager/cli`** - CLI tool for adding components to your project
- **`registry`** - Source components and metadata (not published)
- **`docs`** - Documentation and Storybook examples

## 🚀 Quick Start

### For Users (Add components to your project)

```bash
# Install CLI globally
npm install -g @resource-manager/cli

# Initialize your project
resource-manager init

# Add components
resource-manager add button
resource-manager add resource-manager

# List all available components
resource-manager list
```

### For Contributors (Develop the CLI)

```bash
# Clone and setup
git clone <repository>
cd resource-manager
pnpm install

# Start development
pnpm dev:docs    # Storybook for component preview
pnpm dev:cli     # CLI development mode

# Build and test CLI
pnpm build:cli
cd packages/cli && npm link
resource-manager list
```

## 📋 Available Commands

### Development

```bash
# Start docs/Storybook
pnpm dev

# Start CLI in watch mode  
pnpm dev:cli

# Build registry from source components
pnpm build:registry
```

### Building

```bash
# Build everything (CLI + docs)
pnpm build

# Build individual packages
pnpm build:cli
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
