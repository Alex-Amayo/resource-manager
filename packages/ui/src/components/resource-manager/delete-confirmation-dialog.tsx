import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import {Button} from "../ui/button";

interface DeleteConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedIds: Array<string | number>;
    onConfirm: () => void;
    resourceName: string;
}

export function DeleteConfirmationDialog({
                                             open,
                                             onOpenChange,
                                             selectedIds,
                                             onConfirm,
                                             resourceName,
                                         }: DeleteConfirmationDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {resourceName}s</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the following {resourceName.toLowerCase()}s?
                    </DialogDescription>
                    <div className="mt-4 p-2 bg-muted rounded-md">
                        {selectedIds.map((id) => (
                            <div key={id} className="text-sm">
                                ID: {id}
                            </div>
                        ))}
                    </div>
                    <div className="text-destructive mt-4">
                        This action cannot be undone.
                    </div>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
