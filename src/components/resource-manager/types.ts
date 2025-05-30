import type {ReactNode} from 'react';

// General resource manager types
export interface ResourceData {
  id?: string | number;
  [key: string]: any;
}

export type InputType = 'text' | 'number' | 'tags' | 'select' | 'textarea';

export interface FieldDef<T extends ResourceData> {
  key: keyof T;
  label: string;
  inputType: InputType;
  renderCell: (value: any) => ReactNode;
  options?: { label: string; value: string | number }[];  // For select inputs
  required?: boolean;
}

export type ModalMode = "add" | "edit";

export interface ResourceManagerProps<T extends ResourceData> {
  title: string;
  resourceName: string;
  data: T[];
  fields: FieldDef<T>[];
  create: (values: any) => void;
  update: (id: string | number, values: any) => void;
  delete: (id: string | number) => void;
  defaultValues: Partial<T>;
  FormComponent: React.ComponentType<{
    initialValues: Partial<T>;
    onSubmit: (values: any) => void;
    onCancel: () => void;
    mode: ModalMode;
  }>;
}

//Form modal specific types
export interface ResourceFormModalProps<T extends ResourceData> {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: Partial<T>;
  onSubmit: (values: Partial<T>) => void;
  onCancel: () => void;
  mode: ModalMode;
  resourceName: string;
  FormComponent: React.ComponentType<{
    initialValues: Partial<T>;
    onSubmit: (values: any) => void;
    onCancel: () => void;
    mode: ModalMode;
  }>;
}

// Table specific types
export interface ResourceTableProps<T extends ResourceData> {
  data: T[];
  fields: FieldDef<T>[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  renderActionsMenu: (rowIdx: number, onEdit: () => void, onDelete: () => void) => ReactNode;
  resourceName: string;
}
