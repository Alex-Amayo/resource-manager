const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

async function generateRegistry() {
  const registryPath = path.join(__dirname, '../');
  const outputPath = path.join(registryPath, 'registry.json');
  
  const registry = {
    version: "1.0.0",
    components: {},
    styles: {
      "globals.css": {
        name: "globals.css",
        type: "styles",
        files: ["styles/globals.css"],
        description: "Global CSS variables and base styles for Tailwind CSS v4",
        required: true
      }
    }
  };

  // Read UI components (if ui directory exists)
  const uiDir = path.join(registryPath, 'ui');
  if (fsSync.existsSync(uiDir)) {
    const uiFiles = await fs.readdir(uiDir);
    
    for (const file of uiFiles) {
      if (file.endsWith('.json')) {
        const componentName = file.replace('.json', '');
        const metadataPath = path.join(uiDir, file);
        const metadataContent = await fs.readFile(metadataPath, 'utf-8');
        const metadata = JSON.parse(metadataContent);
        registry.components[componentName] = metadata;
      }
    }
  }

  // Add lib components
  registry.components.utils = {
    name: "utils",
    type: "lib",
    files: ["lib/utils.ts"],
    dependencies: ["clsx", "tailwind-merge"],
    devDependencies: [],
    localDependencies: [],
    description: "Utility functions for merging class names",
    docs: ""
  };

  // Add complex components
  registry.components["resource-manager"] = {
    name: "resource-manager",
    type: "component",
    files: [
      "resource-manager/index.tsx",
      "resource-manager/resource-manager.tsx", 
      "resource-manager/resource-table.tsx",
      "resource-manager/resource-actions-menu.tsx",
      "resource-manager/types.ts"
    ],
    dependencies: ["lucide-react"],
    devDependencies: [],
    registryDependencies: [
      "utils",
      "table",
      "button",
      "dropdown-menu"
    ],
    localDependencies: [
      "resource-form-generator"
    ],
    description: "A complete resource manager component with table and actions",
    docs: ""
  };

  registry.components["resource-form-generator"] = {
    name: "resource-form-generator",
    type: "component",
    files: [
      "resource-manager/resource-form-generator/resource-form-generator.tsx",
      "resource-manager/resource-form-generator/resource-form-modal.tsx",
      "resource-manager/resource-form-generator/form-types.ts",
      "resource-manager/resource-form-generator/inputs/input-text.tsx",
      "resource-manager/resource-form-generator/inputs/input-textarea.tsx",
      "resource-manager/resource-form-generator/inputs/input-select.tsx",
      "resource-manager/resource-form-generator/inputs/input-file.tsx"
    ],
    dependencies: ["react-hook-form", "@hookform/resolvers", "zod"],
    devDependencies: [],
    registryDependencies: [
      "utils",
      "dialog",
      "button",
      "input",
      "textarea",
      "select"
    ],
    description: "A dynamic form generator with validation for resource management",
    docs: ""
  };

  await fs.writeFile(outputPath, JSON.stringify(registry, null, 2));
  console.log('Registry generated successfully!');
  console.log(`Components found: ${Object.keys(registry.components).length}`);
}

generateRegistry().catch(console.error);
