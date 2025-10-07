import {useContext} from "react";
import {ResourceManagerContext} from "./resource-manager-context";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import {Button} from "../ui/button";
import {AlertTriangle} from "lucide-react";

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
    const ctx = useContext(ResourceManagerContext);
    const items = ctx?.data?.filter(item => selectedIds.includes(item.id)) || [];
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="size-5 text-destructive"/>
                        Delete {resourceName}s
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the following {resourceName.toLowerCase()}s?
                    </DialogDescription>
                    <div className="mt-4 p-2 bg-muted rounded-md max-h-64 overflow-y-auto">
                        {items.map((item) => (
                            <div key={String(item.id)} className="text-sm py-1 border-b last:border-b-0 flex flex-col gap-1">
                                <span><b>ID:</b> {String(item.id)}</span>
                                {typeof item.name === 'string' && <span><b>Name:</b> {item.name}</span>}
                                {typeof item.email === 'string' && <span><b>Email:</b> {item.email}</span>}
                                {typeof item.role === 'string' && <span><b>Role:</b> {item.role}</span>}
                            </div>
                        ))}
                    </div>

                </DialogHeader>
                <div className="flex justify-end gap-2 mt-6">
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
