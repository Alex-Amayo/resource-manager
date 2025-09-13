import React from 'react';
import { ResourceFormModal } from "./resource-form-generator/resource-form-modal";
import { useResourceManager } from './resource-manager-context';
import type { FieldDef } from './types';

interface ResourceFormModalContainerProps {
  fields: FieldDef[];
}

export function ResourceFormModalContainer({ fields }: ResourceFormModalContainerProps) {
  const {
    modalOpen,
    setModalOpen,
    formValues,
    handleSubmitForm,
    handleCloseModal,
    mode,
    resourceName,
  } = useResourceManager();

  if (!modalOpen) return null;

  return (
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
}
