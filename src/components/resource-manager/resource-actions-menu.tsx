
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu.tsx";

interface ResourceActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ResourceActionsMenu({ onEdit, onDelete }: ResourceActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <MoreHorizontal className="text-primary w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 shadow-lg rounded-md p-2">
        <DropdownMenuItem onClick={onEdit} className="text-primary">Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-red-600">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
