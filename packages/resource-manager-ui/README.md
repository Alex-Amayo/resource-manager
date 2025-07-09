# Resource Manager UI

A React UI library for resource management with dynamic forms and tables.

## Features

- **ResourceManager**: Complete resource management component with CRUD operations
- **ResourceFormGenerator**: Dynamic form generator with validation
- **Customizable**: Built with Radix UI and class-variance-authority for easy theming
- **TypeScript**: Full TypeScript support with type definitions
- **Form Validation**: Built-in Zod validation support
- **Tailwind CSS Ready**: Uses utility classes that work with your existing Tailwind setup

## Installation

```bash
npm install resource-manager-ui
# or
yarn add resource-manager-ui
# or
pnpm add resource-manager-ui
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom
```

### Tailwind CSS Setup

This library uses Tailwind CSS utility classes and expects Tailwind CSS to be configured in your project. The components are built with modern Tailwind patterns and will work with your existing Tailwind setup.

#### Required CSS Variables

The components use CSS custom properties for theming. Add these variables to your CSS:

```css
@import "tailwindcss";

:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(0 0% 3.9%);
  --primary: hsl(0 0% 9%);
  --primary-foreground: hsl(0 0% 98%);
  --secondary: hsl(0 0% 96%);
  --secondary-foreground: hsl(0 0% 9%);
  --muted: hsl(0 0% 96%);
  --muted-foreground: hsl(0 0% 45.1%);
  --accent: hsl(0 0% 96%);
  --accent-foreground: hsl(0 0% 9%);
  --destructive: hsl(0 84.2% 60.2%);
  --destructive-foreground: hsl(0 0% 98%);
  --border: hsl(0 0% 89.8%);
  --input: hsl(0 0% 89.8%);
  --ring: hsl(0 0% 3.9%);
  --radius: 0.5rem;
  --popover: hsl(0 0% 100%);
  --popover-foreground: hsl(0 0% 3.9%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(0 0% 3.9%);
}

.dark {
  --background: hsl(240 10% 3.9%);
  --foreground: hsl(0 0% 98%);
  --primary: hsl(0 0% 98%);
  --primary-foreground: hsl(240 5.9% 10%);
  --secondary: hsl(240 3.7% 15.9%);
  --secondary-foreground: hsl(0 0% 98%);
  --muted: hsl(240 3.7% 15.9%);
  --muted-foreground: hsl(240 5% 64.9%);
  --accent: hsl(240 3.7% 15.9%);
  --accent-foreground: hsl(0 0% 98%);
  --destructive: hsl(0 62.8% 30.6%);
  --destructive-foreground: hsl(0 0% 98%);
  --border: hsl(240 3.7% 15.9%);
  --input: hsl(240 3.7% 15.9%);
  --ring: hsl(240 4.9% 83.9%);
  --popover: hsl(240 10% 3.9%);
  --popover-foreground: hsl(0 0% 98%);
  --card: hsl(240 10% 3.9%);
  --card-foreground: hsl(0 0% 98%);
}
```

#### Tailwind Configuration

Add these colors to your `tailwind.config.js` to ensure proper theming:

```js
module.exports = {
  content: [
    // your content paths
    "./node_modules/resource-manager-ui/dist/**/*.{js,mjs}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
```

## Usage

### ResourceManager

```tsx
import { ResourceManager } from 'resource-manager-ui'

const MyComponent = () => {
  const fields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
  ]

  const handleCreate = (data: any) => {
    // Handle create logic
  }

  const handleUpdate = (data: any) => {
    // Handle update logic
  }

  const handleDelete = (id: string) => {
    // Handle delete logic
  }

  return (
    <ResourceManager
      resourceName="User"
      fields={fields}
      data={users}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  )
}
```

### ResourceFormGenerator

```tsx
import { ResourceFormGenerator } from 'resource-manager-ui'

const MyForm = () => {
  const fields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const },
  ]

  const handleSubmit = (data: any) => {
    console.log('Form data:', data)
  }

  return (
    <ResourceFormGenerator
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Create"
    />
  )
}
```

## Styling

This library uses Tailwind CSS classes. Make sure you have Tailwind CSS configured in your project, or the components may not display correctly.

## TypeScript

The library is built with TypeScript and exports all necessary types:

```tsx
import type { 
  ResourceData, 
  FieldDef, 
  InputType, 
  ModalMode, 
  ResourceManagerProps, 
  ResourceTableProps 
} from 'resource-manager-ui'
```

## License

MIT
