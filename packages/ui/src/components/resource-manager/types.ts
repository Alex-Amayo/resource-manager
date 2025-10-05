import type {ReactNode} from 'react';

// General resource manager types
export interface ResourceData {
  id: string | number;
  [key: string]: any;
}

export type InputType = 'text' | 'number' | 'tags' | 'select' | 'textarea' | 'file';

// Only the minimal types for resource manager and table
export interface FieldDef {
  key: string;
  label: string;
  inputType: InputType;
  fieldType: string;
  renderCell: (value: any, row?: any) => ReactNode;
  options?: { label: string; value: string }[];
  required?: boolean;
  // Optional file upload handler for file input fields
  onFileUpload?: (file: File) => Promise<string>;
}

export type ModalMode = "add" | "edit";

export interface ResourceManagerProps {
  title: string;
  resourceName: string;
  data: ResourceData[];
  fields: FieldDef[];
  onCreate: (values: Partial<ResourceData>) => void;
  onUpdate: (id: string , values: Partial<ResourceData>) => void;
  onDelete?: (ids: Array<string | number>) => void;
  defaultValues?: Partial<ResourceData>;
  onSelectionChange?: (selectedIds: Array<string | number>) => void;
}

export interface ResourceTableProps {
  data: ResourceData[];
  fields: FieldDef[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  renderActionsMenu: (rowIdx: number, onEdit: () => void, onDelete: () => void) => ReactNode;
  resourceName: string;
}
