// ResourceFormGenerator.stories.tsx
import type {Meta, StoryObj} from '@storybook/react-vite';
import {ResourceFormGenerator} from './components/resource-manager/resource-form-generator/resource-form-generator.tsx';
import type {FieldConfig} from '@/components/resource-manager';
import {z} from 'zod';

// Zod schema for the 'name' field
const nameFieldSchema = z.string().min(3, 'Name must be at least 3 characters');

// Sample fields configuration
const sampleFields: FieldConfig[] = [
    {
        key: 'name',
        label: 'Name',
        inputType: 'text',
        zodSchema: nameFieldSchema,
    },
    {
        key: 'category',
        label: 'Category',
        inputType: 'select',
        options: [
            {value: 'business', label: 'Business'},
        ],
    },
    {
        key: 'notes',
        label: 'Additional Notes',
        inputType: 'textarea',
    },
    {
        key: 'attachment',
        label: 'Attachment',
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