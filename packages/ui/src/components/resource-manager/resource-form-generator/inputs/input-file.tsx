import { Input } from '@/components/ui/input';
import type { ControllerRenderProps } from 'react-hook-form';
import type { Item } from '../../resource-manager-types.ts';

interface InputFileProps {
  id: string;
  field: ControllerRenderProps<Item, string>;
  onFileUpload?: (file: File) => Promise<string>;
}

export function InputFile({ id, field, onFileUpload }: InputFileProps) {
  return (
    <Input
      id={id}
      type="file"
      className="w-full"
      onChange={async e => {
        const file = e.target.files?.[0] || null;
        if (file && onFileUpload) {
          const url = await onFileUpload(file);
          field.onChange(url);
        } else {
          field.onChange(file);
        }
      }}
    />
  );
}
