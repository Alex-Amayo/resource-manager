// ResourceFormGenerator.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResourceFormGenerator } from './resource-form-generator.tsx';
import type { ResourceData, FieldDef } from '../types';

// Example interface for our resource
interface ExampleResource extends ResourceData {
    name: string;
    description: string;
    category: string;
    notes: string;
}

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

// Sample fields configuration
const sampleFields: FieldDef<ExampleResource>[] = [
    {
        key: 'name',
        label: 'Name',
        fieldType: 'string',
        inputType: 'text',
        required: true,
    },
    {
        key: 'description',
        label: 'Description',
        fieldType: 'string',
        inputType: 'textarea',
        required: true,
    },
    {
        key: 'category',
        label: 'Category',
        fieldType: 'string',
        inputType: 'select',
        required: true,
        options: [
            { value: 'technology', label: 'Technology' },
            { value: 'business', label: 'Business' },
            { value: 'education', label: 'Education' },
        ],
    },
    {
        key: 'notes',
        label: 'Additional Notes',
        fieldType: 'string',
        inputType: 'textarea',
        required: false,
    },
];

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

// Story with required fields only
export const RequiredFieldsOnly: Story = {
    args: {
        ...Default.args,
        fields: sampleFields.filter(field => field.required),
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
    play: async ({ canvasElement }) => {
        // You could add interactions here to demonstrate validation
        // using the @storybook/testing-library
    },
};