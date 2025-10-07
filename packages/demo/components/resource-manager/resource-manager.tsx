'use client';

import type { ResourceManagerProps } from "./types.ts";
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
  handleDelete,
  rowHeight = 40, // Default row height matching the table's default
}: ResourceManagerProps) {
  return (
    <ResourceManagerProvider
      data={data}
      handleCreate={handleCreate}
      handleUpdate={handleUpdate}
      resourceName={resourceName}
      handleSelectionChange={handleSelectionChange}
      handleDelete={handleDelete}
    >
      <div className="flex flex-col gap-4">
        {/* Header with title */}
        <div className="flex">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        
        {/* Scrollable container with uniform border */}
        <div className="border border-border overflow-hidden">
          <div className="overflow-auto max-w-full">
            <ResourceTable
              fields={fields}
              rowHeight={rowHeight}
            />
            
            {/* Records summary row - with fixed position styling */}
            <div 
              className="sticky left-0 flex items-center px-4 text-xs text-muted-foreground bg-muted/20 min-w-full border-t border-border"
              style={{ height: `${rowHeight}px` }}
            >
              <span>{data?.length || 0} records</span>
            </div>
          </div>
        </div>
        
        <ActionButtons />
        <ResourceFormModalContainer fields={fields} />
      </div>
    </ResourceManagerProvider>
  );
}