
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table.tsx";
import type { ResourceData, ResourceTableProps } from "./types.ts";

export function ResourceTable<T extends ResourceData>({
  data,
  fields,
  onEdit,
  onDelete,
  renderActionsMenu,
  resourceName
}: ResourceTableProps<T>) {
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
              <TableHead key={field.key as string}>{field.label}</TableHead>
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
                  <TableCell key={`${rowIdx}-${field.key as string}`}>
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
