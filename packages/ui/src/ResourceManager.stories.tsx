import { ResourceManager } from "@/components/resource-manager";
import type { fieldConfigs } from "@/components/resource-manager";
import type { StoryFn, Meta } from "@storybook/react-vite";
const fields: fieldConfigs[] = [
    {
        key: "id",
        label: "ID",
        inputType: "text",
        renderCell: (value) => String(value),
        fieldType: "string",
        // zodSchema excluded for story
    },
    {
        key: "name",
        label: "Name",
        inputType: "text",
        renderCell: (value) => String(value),
        fieldType: "string",
    },
    {
        key: "email",
        label: "Email",
        inputType: "text",
        renderCell: (value) => String(value),
        fieldType: "string",
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
        renderCell: (value) => String(value),
    },
    {
        key: "file",
        label: "File",
        inputType: "file",
        renderCell: (value) => {
            if (typeof value === "object" && value !== null && "url" in value) {
                return String((value as { url?: string }).url || "");
            }
            return String(value || "");
        },
        fieldType: "file",
        onFileUpload: async (file) => {
            console.log('Uploading file:', file);
            // Simulate upload and return a dummy URL
            return Promise.resolve('https://example.com/files/' + file.name);
        },
    },
];

const data = [
    { id: 1, name: "Alice", email: "alice@example.com", file: "https://example.com/files/alice-doc.pdf", role: "admin" },
    { id: 2, name: "Bob", email: "bob@example.com", file: "https://example.com/files/bob-report.pdf", role: "user" },
    { id: 3, name: "Charlie", email: "charlie@example.com", file: "https://example.com/files/charlie-presentation.pdf", role: "guest" },
    { id: 4, name: "Dana", email: "dana@example.com", file: "https://example.com/files/dana-notes.pdf", role: "admin" },
    { id: 5, name: "Eve", email: "eve@example.com", file: "https://example.com/files/eve-summary.pdf", role: "user" },
    { id: 6, name: "Frank", email: "frank@example.com", file: "https://example.com/files/frank-report.pdf", role: "guest" },
    { id: 7, name: "Grace", email: "grace@example.com", file: "https://example.com/files/grace-doc.pdf", role: "admin" },
    { id: 8, name: "Heidi", email: "heidi@example.com", file: "https://example.com/files/heidi-analysis.pdf", role: "user" },
    { id: 9, name: "Ivan", email: "ivan@example.com", file: "https://example.com/files/ivan-data.pdf", role: "guest" },
    { id: 10, name: "Judy", email: "judy@example.com", file: "https://example.com/files/judy-report.pdf", role: "admin" },
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
export const Basic: Story = (args) => (
    <ResourceManager {...args} />
);
Basic.args = {
    title: "Contact Manager",
    resourceName: "Contact",
    data: data,
    fields: fields,
    handleCreate: (values: Partial<import("@/components/resource-manager/resource-manager-types").Item>) => {
        console.log("create (from story)", values);
        if (values.file) {
            console.log("create file:", (values.file as any).name || values.file);
        } else {
            console.log("create", values);
        }
    },
    handleUpdate: (id: string | number, values: Partial<import("@/components/resource-manager/resource-manager-types").Item>) => console.log("update", id, values),
    handleDelete: (ids: Array<string | number>) => console.log("delete", ids),
    handleSelectionChange: (selectedIds: Array<string | number>) => console.log("Selected IDs:", selectedIds),
};
