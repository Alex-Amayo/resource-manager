import type { FieldDef } from "../resource-manager-types.ts";
import type { ResourceData } from "../resource-manager-types.ts";

export type ModalMode = "add" | "edit";

export interface ResourceFormGeneratorProps {
  fields: FieldDef[];
  initialValues: Partial<ResourceData>;
  onSubmit: (values: Partial<ResourceData>) => void;
  onCancel: () => void;
  mode: ModalMode;
}

export interface ResourceFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: Partial<ResourceData>;
  onSubmit: (values: Partial<ResourceData>) => void;
  onCancel: () => void;
  mode: ModalMode;
  resourceName: string;
  fields: FieldDef[];
}
