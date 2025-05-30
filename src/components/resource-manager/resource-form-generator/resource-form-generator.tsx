import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import type { ResourceData, FieldDef, ModalMode } from '../types';

// Props for the form generator
export interface ResourceFormGeneratorProps<T extends ResourceData> {
  fields: FieldDef<T>[];
  initialValues: Partial<T>;
  onSubmit: (values: Partial<T>) => void;
  onCancel: () => void;
  mode: ModalMode;
}

/**
 * Dynamically generates a form based on field definitions using React Hook Form
 * Currently supports string type fields, but can be extended for other types
 */
export function ResourceFormGenerator<T extends ResourceData>({
  fields, 
  initialValues, 
  onSubmit, 
  onCancel,
  mode 
}: ResourceFormGeneratorProps<T>) {
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
  
  // Set up React Hook Form with zod validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<T>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  // Form submission handler
  const onFormSubmit = (data: Partial<T>) => {
    onSubmit(data);
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
              name={fieldKey as any}
              control={control}
              render={({ field: formField }) => {
                // Render different input types
                switch (field.inputType) {
                  case 'text':
                    return (
                      <Input
                        id={fieldKey}
                        type="text"
                        className="w-full"
                        {...formField}
                      />
                    );
                  case 'textarea':
                    return (
                      <Textarea
                        id={fieldKey}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows={4}
                        {...formField}
                      />
                    );
                  case 'select':
                    return (
                      <Select
                        id={fieldKey}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        {...formField}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    );
                  default:
                    return <Input 
                      id={fieldKey}
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md" 
                      {...formField}
                    />;
                }
              }}
            />
            
            {errors[fieldKey as keyof Partial<T>] && (
              <p className="text-red-500 text-sm">
                {errors[fieldKey as keyof Partial<T>]?.message?.toString()}
              </p>
            )}
          </div>
        );
      })}
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === 'add' ? 'Create' : 'Update'}
        </Button>
      </div>
    </form>
  );
}
