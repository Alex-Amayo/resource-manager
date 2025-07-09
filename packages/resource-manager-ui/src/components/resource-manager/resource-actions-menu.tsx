import { Button } from "../ui/button.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu.tsx";
import { MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils.ts";

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
      <DropdownMenuContent align="start" className={cn("w-36")}>
        <DropdownMenuItem 
          onClick={onEdit}
          className={cn("cursor-pointer")}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onDelete} 
          className={cn("text-destructive cursor-pointer")}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
