import type { FieldConfig } from "../resource-manager-types.ts";
import type { Item } from "../resource-manager-types.ts";

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
