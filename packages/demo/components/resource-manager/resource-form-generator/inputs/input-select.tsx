import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import type { FieldValues, FieldPath, ControllerRenderProps } from 'react-hook-form';

interface Option {
  label: string;
  value: string;
}

interface InputSelectProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
  label: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  options?: Option[];
}

export function InputSelect<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ label, field, options }: InputSelectProps<TFieldValues, TName>) {
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
