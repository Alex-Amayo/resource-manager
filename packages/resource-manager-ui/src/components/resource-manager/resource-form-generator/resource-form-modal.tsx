import type { ResourceData } from "../types.ts";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "../../ui/dialog.tsx";
import type { ResourceFormModalProps } from "./form-types.ts";
import { ResourceFormGenerator } from "./resource-form-generator.tsx";


/**
 * Modal component for resource forms
 * 
 * Handles the dialog UI wrapper around the form component
 */
export function ResourceFormModal({
  isOpen,
  onOpenChange,
  initialValues,
  onSubmit,
  onCancel,
  mode,
  resourceName,
  fields
}: ResourceFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded shadow-lg p-6 min-w-[350px] max-w-[95vw]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Create New" : "Edit"} {resourceName}
          </DialogTitle>
        </DialogHeader>
        <ResourceFormGenerator
          fields={fields}
          initialValues={initialValues}
          onSubmit={onSubmit}
          onCancel={onCancel}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
}
