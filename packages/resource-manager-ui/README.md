# Resource Manager UI

A React UI library for resource management with dynamic forms and tables.

## Features

- **ResourceManager**: Complete resource management component with CRUD operations
- **ResourceFormGenerator**: Dynamic form generator with validation
- **Customizable**: Built with Radix UI and class-variance-authority for easy theming
- **TypeScript**: Full TypeScript support with type definitions
- **Form Validation**: Built-in Zod validation support

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
