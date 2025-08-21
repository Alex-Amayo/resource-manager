import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import type { ResourceTableProps } from "./types.ts";

export function ResourceTable({
  data,
  fields,
  onEdit,
  onDelete,
  renderActionsMenu,
  resourceName
}: ResourceTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No {resourceName.toLowerCase()}s found.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {fields.map((field) => (
              <TableHead key={field.key}>{field.label}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIdx) => (
            <TableRow key={rowIdx}>
              {fields.map((field) => {
                const value = row[field.key];
                return (
                  <TableCell key={`${rowIdx}-${field.key}`}>
                    {field.renderCell(value)}
                  </TableCell>
                );
              })}
              <TableCell>
                {renderActionsMenu(
                  rowIdx,
                  () => onEdit(rowIdx),
                  () => onDelete(rowIdx)
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
