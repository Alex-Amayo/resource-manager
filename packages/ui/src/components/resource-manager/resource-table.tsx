import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Checkbox } from "../ui/checkbox";
import type { FieldConfig } from './resource-manager-types.ts';
import { useResourceManager } from './resource-manager-context';

export interface ResourceTableProps {
  fields: FieldConfig[];
  minColumnWidth?: number;
  rowHeight?: number; // New prop for row height
}

export function ResourceTable({
  fields,
  minColumnWidth = 10,
  rowHeight = 40, // Default row height
}: ResourceTableProps) {
  const {
    data,
    selectedIds,
    setSelectedIds,
    handleOpenEdit,
    resourceName,
  } = useResourceManager();
  
  const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No {resourceName.toLowerCase()}s found.
      </div>
    );
  }

  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? data.map((row: any) => row.id) : []);
  };

  const handleCheckboxChange = (id: string | number) => {
    setSelectedIds(
      selectedIds.includes(id)
        ? selectedIds.filter((selectedId: string | number) => selectedId !== id)
        : [...selectedIds, id]
    );
  };

  // We don't need the ref anymore as we're using the Checkbox component which handles indeterminate state differently

  return (
    <div className="flex w-full">
      <div className="rounded-md border border-border flex-1">
        <div className="flex min-w-full">
          {/* Checkbox column as fixed cell */}
          <div className="flex flex-col" style={{ width: 48 }}>
            {/* Header */}
            <div className="border-b flex items-center justify-center" style={{ height: `${rowHeight}px`, paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
              <Checkbox
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                onClick={(e) => e.stopPropagation()}
                aria-label="Select all"
              />
            </div>
            {/* Column cells */}
            <div className="flex-1">
              {data.map((row, rowIdx) => (
                <div
                  key={`checkbox-cell-${row.id}`}
                  className={`border-b last:border-b-0 flex items-center justify-center ${hoveredRow === rowIdx || selectedIds.includes(row.id) ? 'bg-muted' : ''}`}
                  style={{ height: `${rowHeight}px` }}
                  onMouseEnter={() => setHoveredRow(rowIdx)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {selectedIds.length > 0 || hoveredRow === rowIdx ? (
                    <Checkbox
                      checked={selectedIds.includes(row.id)}
                      onCheckedChange={() => handleCheckboxChange(row.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground font-medium">
                      {rowIdx + 1}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Main content: resizable columns */}
          <div className="flex-1">
            <PanelGroup 
              direction="horizontal" 
              className="min-w-full"
            >
              {fields.map((field, index) => (
                <React.Fragment key={field.key}>
                  <Panel 
                    defaultSize={100 / fields.length}
                    minSize={minColumnWidth}
                  >
                    <div className="h-full flex flex-col">
                      {/* Header */}
                      <div className="border-b px-4 font-medium text-sm flex items-center" style={{ height: `${rowHeight}px`, paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
                        {field.label}
                      </div>
                      {/* Column cells */}
                      <div className="flex-1">
                        {data.map((row, rowIdx) => (
                          <div
                            key={rowIdx}
                            className={`px-4 text-sm border-b last:border-b-0 flex items-center cursor-pointer ${
                              hoveredRow === rowIdx || selectedIds.includes(row.id) ? 'bg-muted' : ''
                            }`}
                            style={{ height: `${rowHeight}px` }}
                            onClick={() => handleOpenEdit(rowIdx)}
                            onMouseEnter={() => setHoveredRow(rowIdx)}
                            onMouseLeave={() => setHoveredRow(null)}
                          >
                            <div className="truncate w-full">
                              {field.renderCell?.(row[field.key]) || '-'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Panel>
                  {index < fields.length - 1 && (
                    <PanelResizeHandle className="w-0.5 bg-transparent group hover:bg-muted cursor-col-resize transition-all duration-200 ease-in-out flex items-center justify-center">
                      <div className="w-0.5 h-full bg-border group-hover:bg-muted-foreground group-hover:w-1 transition-all duration-200" />
                    </PanelResizeHandle>
                  )}
                </React.Fragment>
              ))}
            </PanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
