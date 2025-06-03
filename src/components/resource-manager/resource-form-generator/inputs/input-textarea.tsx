import { Textarea } from '../../../ui/textarea';
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
      className="w-full p-2 border border-gray-300 rounded-md"
      rows={4}
      {...field}
      value={value}
    />
  );
}
