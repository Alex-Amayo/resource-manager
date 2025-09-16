import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useResourceManager } from './resource-manager-context';

export function CreateResourceButton() {
  const { resourceName, handleOpenCreate } = useResourceManager();
  
  return (
    <div className="flex justify-end">
      <Button onClick={handleOpenCreate}>
        Add {resourceName}
        <PlusCircle className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
