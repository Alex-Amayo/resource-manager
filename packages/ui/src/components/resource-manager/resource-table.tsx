import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Checkbox } from "../ui/checkbox";
import type { fieldConfigs } from './types';
import { useResourceManager } from './resource-manager-context';

export interface ResourceTableProps {
  fields: fieldConfigs[];
  minColumnWidth?: number;
}

export function ResourceTable({
  fields,
  minColumnWidth = 10,
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

  const handleCheckboxChange = (id: string | number) => {
    setSelectedIds(
      selectedIds.includes(id)
        ? selectedIds.filter((selectedId: string | number) => selectedId !== id)
        : [...selectedIds, id]
    );
  };

  return (
    <div className="flex ">

        <div className="flex w-full">
          {/* Checkbox column */}
          <div className="flex flex-col pt-[47px]"> {/* Offset by header height */}
            {data.map((row) => (
              <div 
                key={`checkbox-${row.id}`}
                className="h-[40px] w-10 flex items-center"
              >
                <Checkbox
                  checked={selectedIds.includes(row.id)}
                  onCheckedChange={() => handleCheckboxChange(row.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ))}
          </div>

          {/* Main table */}
          <div className="rounded-md border border-border flex-1">
            <div className="flex min-w-full">
              {/* Main content */}
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
                          <div className="border-b px-4 py-3 font-medium text-sm">
                            {field.label}
                          </div>
                          {/* Column cells */}
                          <div className="flex-1">
                            {data.map((row, rowIdx) => (
                              <div
                                key={rowIdx}
                                className={`px-4 py-3 text-sm border-b last:border-b-0 min-h-[40px] flex items-center cursor-pointer ${
                                  hoveredRow === rowIdx || selectedIds.includes(row.id) ? 'bg-muted' : ''
                                }`}
                                onClick={() => handleOpenEdit(rowIdx)}
                                onMouseEnter={() => setHoveredRow(rowIdx)}
                                onMouseLeave={() => setHoveredRow(null)}
                              >
                                <div className="truncate w-full">
                                  {field.renderCell(row[field.key]) || '-'}
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
    </div>
  );
}
