import type { ResourceData, ModalMode } from "./types";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "../ui/dialog";
import type { ResourceFormModalProps } from "./types";


/**
 * Modal component for resource forms
 * 
 * Handles the dialog UI wrapper around the form component
 */
export function ResourceFormModal<T extends ResourceData>({
  isOpen,
  onOpenChange,
  initialValues,
  onSubmit,
  onCancel,
  mode,
  FormComponent,
  resourceName
}: ResourceFormModalProps<T>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded shadow-lg p-6 min-w-[350px] max-w-[95vw]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Create New" : "Edit"} {resourceName}
          </DialogTitle>
        </DialogHeader>
        <FormComponent 
          initialValues={initialValues}
          onSubmit={onSubmit}
          onCancel={onCancel}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
}
