import { Button } from "../ui/button.tsx";
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
        <Button size="icon" variant="outline">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-36">
        <DropdownMenuItem 
          onClick={onEdit}
          className="cursor-pointer" 
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onDelete} 
          className="text-destructive cursor-pointer"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
