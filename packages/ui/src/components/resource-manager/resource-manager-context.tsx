import React from 'react';
import type {Item, ResourceManagerProps, ModalMode} from "./resource-manager-types.ts";

interface ResourceManagerContextType {
    data: Item[];
    selectedIds: Array<string | number>;
    modalOpen: boolean;
    editIdx: number | null;
    mode: ModalMode;
    formValues: Partial<Item>;
    resourceName: string;
    setSelectedIds: (ids: Array<string | number>) => void;
    setModalOpen: (open: boolean) => void;
    handleOpenCreate: () => void;
    handleOpenEdit: (idx: number) => void;
    handleDelete: (ids: Array<string | number>) => void;
    handleCloseModal: () => void;
    handleSubmitForm: (values: Partial<Item>) => void;
}

const ResourceManagerContext = React.createContext<ResourceManagerContextType | undefined>(undefined);

export function ResourceManagerProvider({
                                            children,
                                            data,
                                            handleCreate,
                                            handleUpdate,
                                            handleDelete: onDelete,
                                            resourceName = "Resource",
                                            handleSelectionChange,
                                        }: Pick<ResourceManagerProps, 'data' | 'handleCreate' | 'handleUpdate' | 'resourceName' | 'handleSelectionChange'> & {
    children: React.ReactNode;
    handleDelete?: (ids: Array<string | number>) => void;
}) {
    const [selectedIds, setSelectedIds] = React.useState<Array<string | number>>([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [editIdx, setEditIdx] = React.useState<number | null>(null);
    const [mode, setMode] = React.useState<ModalMode>("add");
    const [formValues, setFormValues] = React.useState<Partial<Item>>({});

    const handleOpenCreate = React.useCallback(() => {
        setEditIdx(null);
        setFormValues({});
        setMode("add");
        setModalOpen(true);
    }, []);

    const handleOpenEdit = React.useCallback((idx: number) => {
        setEditIdx(idx);
        setFormValues(data[idx] ?? {});
        setMode("edit");
        setModalOpen(true);
    }, [data]);

    const handleCloseModal = React.useCallback(() => {
        setModalOpen(false);
        setEditIdx(null);
        setFormValues({});
    }, []);

    const handleDelete = React.useCallback((ids: Array<string | number>) => {
        if (onDelete) {
            onDelete(ids);
            setSelectedIds([]);
        }
    }, [onDelete]);

    const handleSubmitForm = React.useCallback((values: Partial<Item>) => {
        if (mode === "add") {
            handleCreate(values);
        } else if (mode === "edit" && editIdx !== null) {
            const id = data[editIdx]?.id;
            if (id) {
                handleUpdate(String(id), values);
            }
        }
        handleCloseModal();
    }, [mode, handleCreate, handleUpdate, editIdx, data, handleCloseModal]);

    React.useEffect(() => {
        handleSelectionChange?.(selectedIds);
    }, [selectedIds, handleSelectionChange]);

    const value = React.useMemo(() => ({
        data,
        selectedIds,
        modalOpen,
        editIdx,
        mode,
        formValues,
        resourceName,
        setSelectedIds,
        setModalOpen,
        handleOpenCreate,
        handleOpenEdit,
        handleDelete,
        handleCloseModal,
        handleSubmitForm,
    }), [
        data,
        selectedIds,
        modalOpen,
        editIdx,
        mode,
        formValues,
        resourceName,
        handleOpenCreate,
        handleOpenEdit,
        handleDelete,
        handleCloseModal,
        handleSubmitForm,
    ]);

    return (
        <ResourceManagerContext.Provider value={value}>
            {children}
        </ResourceManagerContext.Provider>
    );
}

export function useResourceManager() {
    const context = React.useContext(ResourceManagerContext);
    if (context === undefined) {
        throw new Error('useResourceManager must be used within a ResourceManagerProvider');
    }
    return context;
}
