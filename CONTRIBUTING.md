# Contributing to Resource Manager

## Development Setup

1. **Clone the repository**:
```bash
git clone <repository-url>
cd resource-manager
```

2. **Install dependencies**:
```bash
pnpm install
```

3. **Start development**:
```bash
# Start Storybook for component development
pnpm dev:docs

# Start CLI in watch mode
pnpm dev:cli
```

## Project Structure

```
resource-manager/
├── packages/
│   ├── cli/           # CLI tool source
│   ├── registry/      # Component source files
│   └── docs/          # Storybook documentation
└── package.json       # Root workspace config
```

## Adding New Components

1. **Create the component** in `packages/registry/ui/` or `packages/registry/resource-manager/`
2. **Update imports** to use `@/lib/utils` pattern
3. **Create metadata file** (`.json`) with dependencies
4. **Rebuild registry**:
```bash
pnpm build:registry
```
5. **Test with CLI**:
```bash
pnpm build:cli
resource-manager list
resource-manager add your-component
```

## Component Guidelines

- Use Tailwind CSS v4 syntax
- Follow shadcn/ui patterns for consistency
- Include proper TypeScript types
- Use `@/` import aliases
- Add appropriate `data-slot` attributes
- Include comprehensive JSDoc comments

## Publishing

The CLI package is published to npm:

```bash
pnpm build:cli
pnpm release:cli
```

## Testing

Test components in:
1. **Storybook** - `pnpm dev:docs`
2. **CLI integration** - Create test project and use CLI
3. **Real projects** - Test in actual applications

## Registry Structure

Each component needs:
- **Source file** (`.tsx`)
- **Metadata file** (`.json`) with dependencies
- **Entry in main registry.json**

The build script automatically generates the complete registry from individual component metadata files.
