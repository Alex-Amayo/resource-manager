'use client';

import type { ResourceManagerProps } from "./types";
import { ResourceTable } from "./resource-table";
import { ResourceManagerProvider } from "./resource-manager-context";
import { ResourceFormModalContainer } from "./resource-form-modal-container";
import { ActionButtons } from "./action-buttons";

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
export function ResourceManager({
  data,
  fields,
  onCreate,
  onUpdate,
  resourceName = "Resource",
  title,
  onSelectionChange,
  onDelete,
}: ResourceManagerProps) {
  return (
    <ResourceManagerProvider
      data={data}
      create={onCreate}
      update={onUpdate}
      resourceName={resourceName}
      onSelectionChange={onSelectionChange}
      onDelete={onDelete}
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