'use client';

import type { ResourceManagerProps } from "./types";
import { ResourceTable } from "./resource-table";
import { ResourceManagerProvider } from "./resource-manager-context";
import { ResourceFormModalContainer } from "./resource-form-modal-container";
import { ActionButtons } from "./action-buttons";


export function ResourceManager({
  data,
  fields,
  handleCreate,
  handleUpdate,
  resourceName = "Resource",
  title,
  handleSelectionChange,
  onDelete,
}: ResourceManagerProps) {
  return (
    <ResourceManagerProvider
      data={data}
      handleCreate={handleCreate}
      handleUpdate={handleUpdate}
      resourceName={resourceName}
      handleSelectionChange={handleSelectionChange}
      handleDelete={onDelete}
    >
      <div className="container flex flex-col gap-4">
        {/* Header with title */}
        <div className="flex justify-between items-center px-10">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <ResourceTable
          fields={fields}
        />
        <ActionButtons />
        <ResourceFormModalContainer fields={fields} />
      </div>
    </ResourceManagerProvider>
  );
}