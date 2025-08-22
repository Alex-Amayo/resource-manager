# Resource Manager

A modern, flexible resource management system built with React and Next.js.

## Project Structure

This is a monorepo containing multiple packages:

### `/packages/demo`
A Next.js application showcasing the Resource Manager component in action. It includes:
- Full implementation examples
- Various use cases and configurations
- UI components and styling

### `/packages/ui`
The core UI library containing:
- Resource Manager component
- Reusable UI components
- Form generators
- Utility functions

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Run the demo application:
```bash
pnpm --filter demo dev
```

3. Run the UI development environment:
```bash
pnpm --filter ui dev
```

## Features

- Modern UI components built with React
- Flexible resource management interface
- Form generation capabilities
- Responsive design
- TypeScript support
- Storybook documentation for UI components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
