
# Resource Manager

An add-on for Shadcn/UI offering a highly extensible table and form generator. <br />
Streamline frontend-to-database management with minimal setup and maximum customizability.

## Project Structure

This is a monorepo that contains:

Includes:

- `/demo` — Example  Next.j page demonstrating integration with Shadcn UI.
- `/ui` — Storybook environment for component development

## Getting Started

### Resource Manager UI Development

#### Development Workflow


Follow this workflow to streamline **UI component development** and **registry management**.


1. **Install dependencies**
   ```bash
   pnpm i
   ```

2. **Start the main development environment**
   ```bash
   pnpm dev
   ```

3. **Run Storybook for UI component development**
   ```bash
   pnpm storybook
   ```

4. **Build the registry**
   ```bash
   pnpm registry:build
   ```

4. **Update the component in the demo page**
   ```bash
   pnpm registry:add
   ```

## Coming Soon
- [ ] Sorting options  
- [ ] Grouping options  
- [ ] Filtering options




