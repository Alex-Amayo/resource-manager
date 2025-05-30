'use client';

import React from "react";
import type { ResourceData, ResourceManagerProps, ModalMode } from "./types.ts";
import { ResourceTable } from "./resource-table.tsx";
import { ResourceActionsMenu } from "./resource-actions-menu.tsx";
import { Button } from "../ui/button.tsx";
import { ResourceFormModal } from "./resource-form-modal.tsx";

/**
 * Generic ResourceManager component for displaying and managing resources.
 *
 * - Handles modal state management 
 * - Provides actions for creating, editing, and deleting resources
 * - Includes internal rendering of forms and action menus
 *
 * @template T Resource type
 * @param props ResourceManagerProps<T>
 */
export function ResourceManager<T extends ResourceData>({
  data,
  fields,
  create,
  update,
  delete: deleteResource,
  resourceName = "Resource",
  defaultValues,
  title,
}: ResourceManagerProps<T>) {
  // Modal/form state
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editIdx, setEditIdx] = React.useState<number | null>(null);
  const [mode, setMode] = React.useState<ModalMode>("add");
  const [formValues, setFormValues] = React.useState<Partial<T>>({});

  // Handlers for modal actions
  const handleOpenCreate = () => {
    setEditIdx(null);
    setFormValues(defaultValues);
    setMode("add");
    setModalOpen(true);
  };

  const handleOpenEdit = (idx: number) => {
    setEditIdx(idx);
    setFormValues(data[idx] ?? {});
    setMode("edit");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditIdx(null);
    setFormValues(defaultValues);
  };

  const handleSubmitForm = (values: Partial<T>) => {
    if (mode === "add") {
      create(values);
    } else if (mode === "edit" && editIdx !== null) {
      const id = data[editIdx]?.id;
      if (id) {
        update(id, values);
      }
    }
    handleCloseModal();
  };

  const handleDelete = (idx: number) => {
    const id = data[idx]?.id;
    if (id) {
      deleteResource(id);
    }
  };

  // Internal renderActionsMenu function
  const renderActionsMenu = (_rowIdx: number, onEdit: () => void, onDelete: () => void) => (
    <ResourceActionsMenu onEdit={onEdit} onDelete={onDelete} />
  );

  // Form modal component
  const formComponent = modalOpen && (
    <ResourceFormModal
      isOpen={modalOpen}
      onOpenChange={setModalOpen}
      initialValues={formValues}
      onSubmit={handleSubmitForm}
      onCancel={handleCloseModal}
      mode={mode}
      resourceName={resourceName}
      fields={fields}
    />
  );

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button
          onClick={handleOpenCreate}
        >
          Add {resourceName}
        </Button>
      </div>
      <ResourceTable<T>
        data={data}
        fields={fields}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        renderActionsMenu={renderActionsMenu}
        resourceName={resourceName}
      />
      {formComponent}
    </div>
  );
}
