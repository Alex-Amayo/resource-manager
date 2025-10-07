import type { FieldConfig } from "../types.ts";
import type { Item } from "../types.ts";

export type ModalMode = "add" | "edit";

export interface ResourceFormGeneratorProps {
  fields: FieldConfig[];
  initialValues: Partial<Item>;
  onSubmit: (values: Partial<Item>) => void;
  onCancel: () => void;
  mode: ModalMode;
}

export interface ResourceFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: Partial<Item>;
  onSubmit: (values: Partial<Item>) => void;
  onCancel: () => void;
  mode: ModalMode;
  resourceName: string;
  fields: FieldConfig[];
}
