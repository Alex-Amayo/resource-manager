import type {ReactNode} from 'react';

// General resource manager types
export interface ResourceData {
  id?: string | number;
  [key: string]: any;
}

export type InputType = 'text' | 'number' | 'tags' | 'select' | 'textarea';

// Only the minimal types for resource manager and table
export interface FieldDef<T extends ResourceData = ResourceData> {
  key: keyof T;
  label: string;
  inputType: InputType;
  fieldType: string;
  renderCell: (value: any, row?: T) => ReactNode;
  options?: { label: string; value: string | number }[];
  required?: boolean;
}

export type ModalMode = "add" | "edit";

export interface ResourceManagerProps<T extends ResourceData = ResourceData> {
  title: string;
  resourceName: string;
  data: T[];
  fields: FieldDef<T>[];
  create: (values: Partial<T>) => void;
  update: (id: string | number, values: Partial<T>) => void;
  delete: (id: string | number) => void;
  defaultValues: Partial<T>;
}

export interface ResourceTableProps<T extends ResourceData = ResourceData> {
  data: T[];
  fields: FieldDef<T>[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  renderActionsMenu: (rowIdx: number, onEdit: () => void, onDelete: () => void) => ReactNode;
  resourceName: string;
}
