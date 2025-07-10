# Migration to Registry Dependencies

This document outlines the migration from bundled shadcn/ui components to using `registryDependencies` for better shadcn/ui integration.

## What Changed

### Before
- shadcn/ui components were bundled in our registry (`ui/button.tsx`, `ui/input.tsx`, etc.)
- Components imported like: `import { Button } from "../ui/button.tsx"`
- Users got our specific version of shadcn/ui components

### After  
- shadcn/ui components are referenced as `registryDependencies`
- Components import using standard shadcn/ui paths: `import { Button } from "@/components/ui/button"`
- Users install shadcn/ui components themselves, giving them control over versions and customizations

## Benefits

1. **Smaller payload** - Users only download resource-manager specific code
2. **Better compatibility** - Works with any shadcn/ui setup  
3. **User control** - Users can customize shadcn/ui components before installing resource-manager
4. **Standard practice** - Follows shadcn/ui ecosystem conventions
5. **Easier maintenance** - We don't need to keep shadcn/ui components in sync

## Updated Registry Structure

```json
{
  "resource-manager": {
    "registryDependencies": [
      "utils",
      "table", 
      "button",
      "dropdown-menu"
    ]
  },
  "resource-form-generator": {
    "registryDependencies": [
      "utils",
      "dialog",
      "button", 
      "input",
      "textarea", 
      "select"
    ]
  }
}
```

## Installation Flow

When users run:
```bash
npx @resource-manager/cli add resource-manager
```

The CLI will:
1. Install resource-manager components
2. Automatically run `npx shadcn@latest add table button dropdown-menu` 
3. Show fallback instructions if shadcn CLI isn't available

## User Prerequisites

Users need:
1. A Next.js/React project with shadcn/ui initialized (`npx shadcn@latest init`)
2. shadcn/ui CLI available (`npm install -g shadcn@latest` or use npx)

## Manual Installation (if CLI fails)

If automatic dependency installation fails, users can manually install:

```bash
# Install shadcn/ui dependencies
npx shadcn@latest add utils table button dropdown-menu dialog input textarea select

# Then install resource-manager components  
npx @resource-manager/cli add resource-manager
```

## Breaking Changes

- Import paths changed from relative to standard shadcn/ui paths
- No longer includes bundled shadcn/ui components
- Requires shadcn/ui to be set up in the target project

## Migration for Existing Users

Existing users upgrading should:

1. Ensure shadcn/ui is initialized: `npx shadcn@latest init`
2. Install required shadcn/ui components manually if needed
3. Update imports in customized components to use `@/components/ui/` paths
4. Remove old bundled ui components from their project
