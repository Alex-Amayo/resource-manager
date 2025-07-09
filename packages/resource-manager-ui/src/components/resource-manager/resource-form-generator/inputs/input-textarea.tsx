import { Textarea } from '../../../ui/textarea.tsx';
import { cn } from '../../../../lib/utils.ts';
import type { ControllerRenderProps } from 'react-hook-form';

interface InputTextareaProps {
  id: string;
  field: ControllerRenderProps<any, string>;
}

export function InputTextarea({ id, field }: InputTextareaProps) {
  const value = field.value ?? '';
  return (
    <Textarea
      id={id}
      className={cn("w-full")}
      rows={4}
      {...field}
      value={value}
    />
  );
}
