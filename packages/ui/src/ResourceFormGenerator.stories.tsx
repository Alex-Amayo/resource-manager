// ResourceFormGenerator.stories.tsx
import type {Meta, StoryObj} from '@storybook/react-vite';
import {ResourceFormGenerator} from './components/resource-manager/resource-form-generator/resource-form-generator.tsx';
import type {fieldConfigs} from '@/components/resource-manager';
import {z} from 'zod';

// Zod schema for the 'name' field
const nameFieldSchema = z.string().min(3, 'Name must be at least 3 characters');

// Sample fields configuration
const sampleFields: fieldConfigs[] = [
    {
        key: 'name',
        label: 'Name',
        fieldType: 'string',
        inputType: 'text',
        zodSchema: nameFieldSchema,
    },
    {
        key: 'description',
        label: 'Description',
        fieldType: 'string',
        inputType: 'textarea',
    },
    {
        key: 'category',
        label: 'Category',
        fieldType: 'string',
        inputType: 'select',
        options: [
            {value: 'technology', label: 'Technology'},
            {value: 'business', label: 'Business'},
            {value: 'education', label: 'Education'},
        ],
    },
    {
        key: 'notes',
        label: 'Additional Notes',
        fieldType: 'string',
        inputType: 'textarea',
    },
    {
        key: 'attachment',
        label: 'Attachment',
        fieldType: 'file',
        inputType: 'file',
        renderCell: (value) => value instanceof File ? value.name : (value ? String(value) : ''),
    },
];

const meta: Meta<typeof ResourceFormGenerator> = {
    title: 'Forms/ResourceFormGenerator',
    component: ResourceFormGenerator,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ResourceFormGenerator>;

// Base story
export const Default: Story = {
    args: {
        fields: sampleFields,
        initialValues: {},
        mode: 'add',
        onSubmit: (values) => console.log('Form submitted:', values),
        onCancel: () => console.log('Form cancelled'),
    },
};

// Story with pre-filled values
export const WithInitialValues: Story = {
    args: {
        ...Default.args,
        initialValues: {
            name: 'Sample Resource',
            description: 'This is a sample resource description',
            category: 'technology',
            notes: 'Some additional notes',
        },
        mode: 'edit',
    },
};

// Story showing validation errors
export const WithValidationErrors: Story = {
    args: {
        ...Default.args,
        initialValues: {
            name: '', // This will trigger validation error
            description: '', // This will trigger validation error
            category: '', // This will trigger validation error
        },
    },
    play: async () => {
        // You could add interactions here to demonstrate validation
        // using the @storybook/testing-library
    },
};