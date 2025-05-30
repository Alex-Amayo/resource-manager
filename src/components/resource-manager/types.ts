import type {ReactNode} from 'react';

// General resource manager types
export interface ResourceData {
  id?: string | number;
  [key: string]: any;
}

export type InputType = 'text' | 'number' | 'tags' | 'select' | 'textarea';

// Only the minimal types for resource manager and table
export interface FieldDef {
  key: string;
  label: string;
  inputType: InputType;
  fieldType: string;
  renderCell: (value: any, row?: any) => ReactNode;
  options?: { label: string; value: string | number }[];
  required?: boolean;
}

export type ModalMode = "add" | "edit";

export interface ResourceManagerProps {
  title: string;
  resourceName: string;
  data: ResourceData[];
  fields: FieldDef[];
  create: (values: Partial<ResourceData>) => void;
  update: (id: string | number, values: Partial<ResourceData>) => void;
  delete: (id: string | number) => void;
  defaultValues?: Partial<ResourceData>;
}

export interface ResourceTableProps {
  data: ResourceData[];
  fields: FieldDef[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  renderActionsMenu: (rowIdx: number, onEdit: () => void, onDelete: () => void) => ReactNode;
  resourceName: string;
}
