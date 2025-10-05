import { ResourceManager } from "./components/resource-manager/resource-manager.tsx";
import type { fieldConfigs } from "./components/resource-manager/types.ts";
import type { StoryFn, Meta } from "@storybook/react-vite";

// No need to extend FieldTypes for this simple example, use FieldDef<Contact>[]
const fields: fieldConfigs[] = [
    {
        key: "id",
        label: "ID",
        inputType: "text",
        renderCell: (value) => value,
        fieldType: "string",
    },
    {
        key: "name",
        label: "Name",
        inputType: "text",
        renderCell: (value) => value,
        fieldType: "string",
    },
    {
        key: "email",
        label: "Email",
        inputType: "text",
        renderCell: (value) => value,
        fieldType: "string",
    },
    {
        key: "file",
        label: "File",
        inputType: "file",
        renderCell: (value) => (value?.url || value || ""),
        fieldType: "file",
        onFileUpload: async (file) => {
            console.log('Uploading file:', file);
            // Simulate upload and return a dummy URL
            return Promise.resolve('https://example.com/files/' + file.name);
        },
    },
    {
        key: "role",
        label: "Role",
        inputType: "select",
        fieldType: "string",
        options: [
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
            { label: "Guest", value: "guest" },
        ],
        renderCell: (value) => value,
    },
];

const data = [
    { id: 1, name: "Alice", email: "alice@example.com", file: "https://example.com/files/alice-doc.pdf", role: "admin" },
    { id: 2, name: "Bob", email: "bob@example.com", file: "https://example.com/files/bob-report.pdf", role: "user" },
];

const meta: Meta<typeof ResourceManager> = {
    title: "Components/ResourceManager",
    component: ResourceManager,
    tags: ["autodocs"],
    args: {},
    parameters: {
        actions: {
            handles: ["create", "update", "delete"],
        },
        controls: {
            // hide defaultValues from both Controls table and Playground
            exclude: ["defaultValues"],
        },
    },
    argTypes: {
        initialValues: {
            control: false,           // no control widget
            table: {disable: true}, // no column in the table
        },
    },
} satisfies Meta<typeof ResourceManager>;

export default meta;

type Story = StoryFn<typeof ResourceManager>;
const Template: Story = (args) => <ResourceManager {...args as any} />;

export const Basic: Story = Template.bind({});
Basic.args = {
    title: "Contact Manager",
    resourceName: "Contact",
    data: data,
    fields: fields,
    handleCreate: (values: any) => {
        console.log("create (from story)", values);
        if (values.file) {
            console.log("create file:", values.file.name || values.file);
        } else {
            console.log("create", values);
        }
    },
    handleUpdate: (id, values) => console.log("update", id, values),
    onDelete: (id) => console.log("delete", id),
    handleSelectionChange: (selectedIds: Array<string | number>) => console.log("Selected IDs:", selectedIds),
};
