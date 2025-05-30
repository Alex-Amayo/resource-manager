import { useForm, Controller } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from '../../ui/select';
import { Textarea } from '../../ui/textarea';
import type { ResourceFormGeneratorProps } from './form-types';
import type { ResourceData } from '../types';


/**
 * Dynamically generates a form based on field definitions using React Hook Form
 * Currently supports string type fields, but can be extended for other types
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
                const value = formField.value ?? '';
                // Render different input types
                switch (field.inputType) {
                  case 'text':
                    return (
                      <Input
                        id={fieldKey}
                        type="text"
                        className="w-full"
                        {...formField}
                        value={value}
                      />
                    );
                  case 'textarea':
                    return (
                      <Textarea
                        id={fieldKey}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows={4}
                        {...formField}
                        value={value}
                      />
                    );
                  case 'select':
                    return (
                      <Select value={value} onValueChange={formField.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={`Select ${field.label}`} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {field.options && field.options.length > 0 && (
                              <SelectLabel>{field.label}</SelectLabel>
                            )}
                            {(field.options ?? []).map((option: any) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  default:
                    return <Input 
                      id={fieldKey}
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md" 
                      {...formField}
                      value={value}
                    />;
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
