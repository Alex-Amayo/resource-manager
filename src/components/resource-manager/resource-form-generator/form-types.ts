import type { FieldDef } from "../types";
import type { ResourceData } from "../types";

export type ModalMode = "add" | "edit";

export interface ResourceFormGeneratorProps<T extends ResourceData = ResourceData> {
  fields: FieldDef<T>[];
  initialValues: Partial<T>;
  onSubmit: (values: Partial<T>) => void;
  onCancel: () => void;
  mode: ModalMode;
}

export interface ResourceFormModalProps<T extends ResourceData = ResourceData> {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: Partial<T>;
  onSubmit: (values: Partial<T>) => void;
  onCancel: () => void;
  mode: ModalMode;
  resourceName: string;
  fields: FieldDef<T>[];
}
