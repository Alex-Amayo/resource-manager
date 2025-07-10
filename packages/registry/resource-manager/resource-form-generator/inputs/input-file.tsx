import { Input } from '../../../ui/input.tsx';
import { cn } from '../../../../lib/utils.ts';
import type { ControllerRenderProps } from 'react-hook-form';

interface InputFileProps {
  id: string;
  field: ControllerRenderProps<any, string>;
}

export function InputFile({ id, field }: InputFileProps) {
  return (
    <Input
      id={id}
      type="file"
      className={cn("w-full")}
      onChange={e => {
        const file = e.target.files?.[0] || null;
        field.onChange(file);
      }}
    />
  );
}
