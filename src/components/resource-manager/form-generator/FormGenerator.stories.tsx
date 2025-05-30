import { FormGenerator } from "./form-generator";
import type { ResourceData, FieldDef, ModalMode } from "../types";
import type { Meta, StoryObj } from"@storybook/react-vite";

interface TestResource extends ResourceData {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
}

const meta: Meta<typeof FormGenerator> = {
  title: "Components/FormGenerator",
  component: FormGenerator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormGenerator>;

// Sample field definitions
const formFields: FieldDef<TestResource>[] = [
  {
    key: "title",
    label: "Title",
    fieldType: "string",
    inputType: "text",
    required: true,
    renderCell: (value) => value,
  },
  {
    key: "description",
    label: "Description",
    fieldType: "string",
    inputType: "textarea",
    required: false,
    renderCell: (value) => value,
  },
  {
    key: "category",
    label: "Category",
    fieldType: "string",
    inputType: "select",
    required: true,
    options: [
      { label: "Documentation", value: "documentation" },
      { label: "Tutorial", value: "tutorial" },
      { label: "Reference", value: "reference" },
    ],
    renderCell: (value) => value,
  },
  {
    key: "priority",
    label: "Priority",
    fieldType: "string",
    inputType: "select",
    required: false,
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
    renderCell: (value) => value,
  },
];

// Base story args
const defaultArgs = {
  fields: formFields,
  initialValues: {
    title: "",
    description: "",
    category: "",
    priority: "",
  },
  onSubmit: (values: Partial<TestResource>) => console.log("Form submitted:", values),
  onCancel: () => console.log("Form cancelled"),
};

// Create Form story
export const CreateForm: Story = {
  args: {
    ...defaultArgs,
    mode: "add" as ModalMode,
  },
  name: "Create Form",
};

// Edit Form story
export const EditForm: Story = {
  args: {
    ...defaultArgs,
    initialValues: {
      title: "Existing Resource",
      description: "This is an existing resource for demonstration purposes.",
      category: "documentation",
      priority: "medium",
    },
    mode: "edit" as ModalMode,
  },
  name: "Edit Form",
};

// Required Fields Validation story
export const RequiredFieldsValidation: Story = {
  args: {
    ...defaultArgs,
    mode: "add" as ModalMode,
  },
  name: "Required Fields Validation",
  play: async ({ canvasElement }) => {
    // This shows validation errors when trying to submit an empty form
    // Note: play functions require Storybook interaction addon to be installed
    const submitButton = canvasElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (submitButton) {
      submitButton.click();
    }
  },
};
