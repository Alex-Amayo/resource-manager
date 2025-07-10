// Export all components and types for easier imports
export * from './types';

// Main components
export { ResourceManager } from './resource-manager';
export { ResourceTable } from './resource-table';
export { ResourceActionsMenu } from './resource-actions-menu';

// Form-related components
export { ResourceFormModal } from './resource-form-generator/resource-form-modal';
export { ResourceFormGenerator } from './resource-form-generator/resource-form-generator';

// Form types
export * from './resource-form-generator/form-types';

// Input components for advanced usage
export { InputText } from './resource-form-generator/inputs/input-text';
export { InputTextarea } from './resource-form-generator/inputs/input-textarea';
export { InputSelect } from './resource-form-generator/inputs/input-select';
export { InputFile } from './resource-form-generator/inputs/input-file';
