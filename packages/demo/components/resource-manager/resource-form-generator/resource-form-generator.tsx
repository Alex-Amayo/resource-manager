import { useForm, Controller } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { InputText } from './inputs/input-text.tsx';
import { InputTextarea } from './inputs/input-textarea.tsx';
import { InputSelect } from './inputs/input-select.tsx';
import { InputFile } from './inputs/input-file.tsx';
import type { ResourceFormGeneratorProps } from './form-types.ts';
import type { Item } from '../types.ts';


/**
 * Dynamically generates a form based on field definitions using React Hook Form
 */
export function ResourceFormGenerator({
  fields, 
  initialValues, 
  onSubmit, 
  onCancel,
  mode 
}: ResourceFormGeneratorProps) {
  // Dynamically build a zod schema based on field definitions
  const generateSchema = () => {
    const schemaMap: Record<string, any> = {};
    
    fields.forEach((field) => {
      const fieldKey = String(field.key);
      // If zodSchema is provided, use it. Otherwise, make the field optional.
      schemaMap[fieldKey] = field.zodSchema ? field.zodSchema : z.any().optional();
    });
    return z.object(schemaMap);
  };
  
  const schema = generateSchema();
  
  // Use FieldValues for react-hook-form generics for compatibility
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues as any,
  });

  // Form submission handler
  const onFormSubmit = (data: FieldValues) => {
    onSubmit(data as Partial<Item>);
  };

  // Input component mapping
  const inputComponents: Record<string, any> = {
    text: InputText,
    textarea: InputTextarea,
    select: InputSelect,
    file: InputFile,
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {fields.map((field) => {
        const fieldKey = String(field.key);
        const InputComponent = inputComponents[field.inputType] || InputText;
        return (
          <div key={fieldKey} className="space-y-2">
            <label 
              htmlFor={fieldKey} 
              className="block text-sm font-medium text-gray-700"
            >
              {field.label} {(field.zodSchema) && <span className="text-red-500">*</span>}
            </label>
            <Controller
              name={fieldKey}
              control={control}
              render={({ field: formField }) => (
                <InputComponent
                  id={fieldKey}
                  field={formField}
                  {...(field.inputType === 'select' ? { label: field.label, options: field.options } : {})}
                  {...(field.inputType === 'file' ? { onFileUpload: field.onFileUpload } : {})}
                />
              )}
            />
            {errors[fieldKey] && (
              <p className="text-red-500 text-sm">
                {errors[fieldKey]?.message?.toString()}
              </p>
            )}
          </div>
        );
      })}
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="default" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="default">
          {mode === 'add' ? 'Create' : 'Update'}
        </Button>
      </div>
    </form>
  );
}
