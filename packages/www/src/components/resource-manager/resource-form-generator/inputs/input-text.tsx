import { Input } from '../../../ui/input.tsx';
import type { ControllerRenderProps } from 'react-hook-form';

interface InputTextProps {
  id: string;
  field: ControllerRenderProps<any, string>;
}

export function InputText({ id, field }: InputTextProps) {
  const value = field.value ?? '';
  return (
    <Input
      id={id}
      type="text"
      className="w-full"
      {...field}
      value={value}
    />
  );
}
