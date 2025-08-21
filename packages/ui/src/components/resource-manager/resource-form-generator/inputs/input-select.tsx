import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import type { ControllerRenderProps } from 'react-hook-form';

interface Option {
  label: string;
  value: string;
}

interface InputSelectProps {
  id: string;
  label: string;
  field: ControllerRenderProps<any, string>;
  options?: Option[];
}

export function InputSelect({ id, label, field, options }: InputSelectProps) {
  const value = field.value ?? '';
  return (
    <Select value={value} onValueChange={field.onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options && options.length > 0 && <SelectLabel>{label}</SelectLabel>}
          {(options ?? []).map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
