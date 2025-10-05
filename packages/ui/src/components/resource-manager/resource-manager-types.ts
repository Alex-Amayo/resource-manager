import type {ReactNode} from 'react';
import type { ZodType } from 'zod';

export interface Item {
  id: string | number;
  [key: string]: unknown;
}

export type InputType = 'text' | 'number' | 'tags' | 'select' | 'textarea' | 'file';


export interface fieldConfigs {
  key: string;
  label: string;
  inputType: InputType;
  fieldType: string;
  renderCell?: (value: unknown, row?: Item) => ReactNode;
  options?: { label: string; value: string }[];
  // Optional file upload handler for file input fields
  onFileUpload?: (file: File) => Promise<string>;
  // Optional Zod schema for field validation
  zodSchema?: ZodType<unknown>;
  // Optional required property for validation
}

export type ModalMode = "add" | "edit";

export interface ResourceManagerProps {
  title: string;
  resourceName: string;
  data: Item[];
  fields: fieldConfigs[];
  handleCreate: (values: Partial<Item>) => void;
  handleUpdate: (id: string , values: Partial<Item>) => void;
  handleDelete: (ids: Array<string | number>) => void;
  initialValues?: Partial<Item>;
  handleSelectionChange?: (selectedIds: Array<string | number>) => void;
}