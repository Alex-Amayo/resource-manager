// Main package exports - import everything from here
// Usage: import { ResourceManager, ResourceTable, FieldDef } from '@/index'

// Re-export all resource-manager components and types
export * from './components/resource-manager';

// Re-export commonly used UI components
export { Button } from './components/ui/button';
export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu';
export { Input } from './components/ui/input';
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
export { Textarea } from './components/ui/textarea';

// Re-export utilities
export { cn } from './lib/utils';
