import type {ReactNode} from 'react';
import type { ZodType } from 'zod';

export type Item<T extends Record<string, unknown> = Record<string, unknown>> = {
  id: string;
} & T;

export type InputType = 'text' | 'select' | 'textarea' | 'file';


export interface FieldConfig {
  key: string;
  label: string;
  inputType: InputType;
  renderCell?: <T extends Record<string, unknown> = Record<string, unknown>>(value: unknown, row?: Item<T>) => ReactNode;
  // Optional array of options for select input fields
  options?: Array<{ label: string; value: string }>;
  // Optional file upload handler for file input fields
  onFileUpload?: (file: File) => Promise<string | null>; 
  // Optional Zod schema for field validation
  zodSchema?: ZodType<unknown>;
}

export type ModalMode = "add" | "edit";

export interface ResourceManagerProps<T extends Record<string, unknown> = Record<string, unknown>> {
  title: string;
  resourceName: string;
  data: Array<Item<T>>;
  fields: Array<FieldConfig>;
  handleCreate: (values: Partial<Item<T>>) => void;
  handleUpdate: (id: string, values: Partial<Item<T>>) => void;
  handleDelete: (ids: Array<string | number>) => void;
  initialValues?: Partial<Item<T>>;
  handleSelectionChange?: (selectedIds: Array<string | number>) => void;
  rowHeight?: number; // Added rowHeight prop to control row heights
}