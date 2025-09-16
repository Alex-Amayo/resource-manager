import React from 'react';
import type { ResourceData, ResourceManagerProps, ModalMode } from "./types";

interface ResourceManagerContextType {
  data: ResourceData[];
  selectedIds: Array<string | number>;
  modalOpen: boolean;
  editIdx: number | null;
  mode: ModalMode;
  formValues: Partial<ResourceData>;
  resourceName: string;
  setSelectedIds: (ids: Array<string | number>) => void;
  setModalOpen: (open: boolean) => void;
  handleOpenCreate: () => void;
  handleOpenEdit: (idx: number) => void;
  handleDelete: (ids: Array<string | number>) => void;
  handleCloseModal: () => void;
  handleSubmitForm: (values: Partial<ResourceData>) => void;
}

const ResourceManagerContext = React.createContext<ResourceManagerContextType | undefined>(undefined);

export function ResourceManagerProvider({
  children,
  data,
  onCreate: create,
  onUpdate: update,
  onDelete,
  resourceName = "Resource",
  onSelectionChange,
}: Pick<ResourceManagerProps, 'data' | 'create' | 'update' | 'resourceName' | 'onSelectionChange'> & {
  children: React.ReactNode;
  onDelete?: (ids: Array<string | number>) => void;
}) {
  const [selectedIds, setSelectedIds] = React.useState<Array<string | number>>([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editIdx, setEditIdx] = React.useState<number | null>(null);
  const [mode, setMode] = React.useState<ModalMode>("add");
  const [formValues, setFormValues] = React.useState<Partial<ResourceData>>({});

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

  const handleSubmitForm = React.useCallback((values: Partial<ResourceData>) => {
    if (mode === "add") {
      create(values);
    } else if (mode === "edit" && editIdx !== null) {
      const id = data[editIdx]?.id;
      if (id) {
        update(String(id), values);
      }
    }
    handleCloseModal();
  }, [mode, create, update, editIdx, data, handleCloseModal]);

  React.useEffect(() => {
    onSelectionChange?.(selectedIds);
  }, [selectedIds, onSelectionChange]);

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
