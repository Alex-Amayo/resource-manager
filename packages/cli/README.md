# Resource Manager CLI

A CLI tool for adding Resource Manager components to your project. Copy components as source files with automatic dependency resolution.

## Installation

```bash
npm install -g @resource-manager/cli
```

Or use directly with npx:

```bash
npx @resource-manager/cli --help
```

## Quick Start

1. **Initialize your project** (adds CSS variables and setup):
```bash
resource-manager init
```

2. **List available components**:
```bash
resource-manager list
```

3. **Add components**:
```bash
resource-manager add button
resource-manager add resource-manager
```

## Commands

### `init`
Initialize your project with necessary CSS variables and configuration.

```bash
resource-manager init [options]

Options:
  -y, --yes    Skip confirmation prompts
```

### `list`
Show all available components.

```bash
resource-manager list [options]

Options:
  -t, --type <type>    Filter by component type (ui, component, lib)
```

### `add`
Add a component to your project.

```bash
resource-manager add <component> [options]

Options:
  -p, --path <path>    Specify output path (default: ./src/components)
  --overwrite         Overwrite existing files

Examples:
  resource-manager add button
  resource-manager add button --path ./components
  resource-manager add resource-manager --overwrite
```

## Available Components

### UI Components (7)
- **`button`** - Customizable button with variants and sizes
  - Dependencies: `@radix-ui/react-slot`, `class-variance-authority`
- **`input`** - Form input with consistent styling
- **`textarea`** - Multi-line text input
- **`select`** - Dropdown select with Radix UI
  - Dependencies: `@radix-ui/react-select`, `lucide-react`
- **`table`** - Data table component
- **`dialog`** - Modal dialog component
  - Dependencies: `@radix-ui/react-dialog`, `lucide-react`
- **`dropdown-menu`** - Dropdown menu component
  - Dependencies: `@radix-ui/react-dropdown-menu`, `lucide-react`

### Complex Components (2)
- **`resource-manager`** - Complete resource management solution
  - Dependencies: `lucide-react`
  - Includes table view, actions menu, CRUD operations
- **`resource-form-generator`** - Dynamic form generator with validation
  - Dependencies: `react-hook-form`, `@hookform/resolvers`, `zod`
  - Generates forms based on field definitions

### Utilities (1)
- **`utils`** - Class name merging utilities
  - Dependencies: `clsx`, `tailwind-merge`

## Requirements

- **React 18+** (or React 19)
- **Tailwind CSS v4**
- **TypeScript** (recommended)

## What the CLI Does

1. **Copies source files** - Components are copied as `.tsx` source files, not compiled packages
2. **Installs dependencies** - Automatically installs required npm packages
3. **Resolves local dependencies** - Automatically adds dependent components (e.g., `button` when adding `resource-manager`)
4. **Updates import paths** - Converts `@/` aliases to relative paths
5. **Adds CSS variables** - Includes necessary Tailwind CSS variables during `init`

## File Structure

After running `resource-manager init` and adding components:

```
your-project/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── resource-manager/
│   │   │   ├── resource-manager.tsx
│   │   │   └── ...
│   │   └── lib/
│   │       └── utils.ts
│   └── styles/
│       └── globals.css  # CSS variables
└── package.json  # Updated with dependencies
```

## Compatibility

This CLI is compatible with:
- ✅ **shadcn/ui** - Can be used alongside existing shadcn/ui components
- ✅ **Next.js** - Works with App Router and Pages Router
- ✅ **Vite** - Works with Vite-based React apps
- ✅ **Create React App** - Works with CRA projects
- ✅ **Any React framework** - Framework agnostic

## Local Development

For local development of the CLI:

```bash
git clone <repository>
cd resource-manager
pnpm install
pnpm build:cli
cd packages/cli
npm link
```
