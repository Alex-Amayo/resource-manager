import { Input } from '../../../ui/input';
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
      className="w-full"
      onChange={e => {
        const file = e.target.files?.[0] || null;
        field.onChange(file);
      }}
    />
  );
}
