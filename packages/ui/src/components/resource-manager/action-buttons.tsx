import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResourceManager } from './resource-manager-context';
import { DeleteConfirmationDialog } from './delete-confirmation-dialog';

export function ActionButtons() {
  const { 
    resourceName, 
    handleOpenCreate, 
    handleDelete,
    selectedIds 
  } = useResourceManager();
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const handleLocalDelete = () => {
    if (selectedIds.length > 0) {
      handleDelete(selectedIds);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedIds={selectedIds}
        onConfirm={handleLocalDelete}
        resourceName={resourceName}
      />
      
      <div className="flex gap-2 justify-end">
        {selectedIds.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
            size="sm"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected ({selectedIds.length})
          </Button>
        )}
        <Button onClick={handleOpenCreate}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add {resourceName}
        </Button>
      </div>
    </>
  );
}
