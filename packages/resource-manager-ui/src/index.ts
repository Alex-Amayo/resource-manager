// Main components
export { ResourceManager } from './components/resource-manager';
export { ResourceFormGenerator } from './components/resource-manager/resource-form-generator/resource-form-generator';

// UI components
export { Button } from './components/ui/button';
export { Dialog, DialogContent, DialogHeader } from './components/ui/dialog';
export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu';
export { Input } from './components/ui/input';
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from './components/ui/select';
export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
export { Textarea } from './components/ui/textarea';

// Types
export type { 
  ResourceData, 
  FieldDef, 
  InputType, 
  ModalMode, 
  ResourceManagerProps, 
  ResourceTableProps 
} from './components/resource-manager/types';

// Utilities
export { cn } from './lib/utils';