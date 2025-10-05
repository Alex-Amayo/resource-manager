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
import type { ResourceData } from '../types.ts';


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
      // Handle different field types based on fieldType
      switch(field.fieldType) {
        case 'string':
          schemaMap[fieldKey] = field.required 
            ? z.string().min(1, { message: `${field.label} is required` })
            : z.string().optional();
          break;
        case 'file':
          schemaMap[fieldKey] = field.required
            ? z.any().refine(val => val instanceof File, { message: `${field.label} is required` })
            : z.any().optional();
          break;
        // Ready for future expansion with other field types
        default:
          // Default to string for now
          schemaMap[fieldKey] = field.required 
            ? z.string().min(1, { message: `${field.label} is required` })
            : z.string().optional();
      }
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
    onSubmit(data as Partial<ResourceData>);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {fields.map((field) => {
        const fieldKey = String(field.key);
        return (
          <div key={fieldKey} className="space-y-2">
            <label 
              htmlFor={fieldKey} 
              className="block text-sm font-medium text-gray-700"
            >
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            
            <Controller
              name={fieldKey}
              control={control}
              render={({ field: formField }) => {
                // Render different input types
                switch (field.inputType) {
                  case 'text':
                    return (
                      <InputText id={fieldKey} field={formField} />
                    );
                  case 'textarea':
                    return (
                      <InputTextarea id={fieldKey} field={formField} />
                    );
                  case 'select':
                    return (
                      <InputSelect id={fieldKey} label={field.label} field={formField} options={field.options} />
                    );
                  case 'file':
                    return (
                      <InputFile id={fieldKey} field={formField} onFileUpload={field.onFileUpload} />
                    );
                  default:
                    return <InputText id={fieldKey} field={formField} />;
                }
              }}
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
