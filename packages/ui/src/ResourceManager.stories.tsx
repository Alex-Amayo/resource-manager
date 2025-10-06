import { ResourceManager } from "@/components/resource-manager";
import type { FieldConfig, Item } from "@/components/resource-manager";
import type { StoryFn, Meta } from "@storybook/react-vite";

// Define our custom data type for the story
interface ContactItem extends Record<string, unknown> {
  name: string;
  email: string;
  file: string;
  role: "admin" | "user" | "guest";
}
const fields: Array<FieldConfig> = [
    {
        key: "id",
        label: "ID",
        inputType: "text",
        renderCell: (value) => String(value),
    },
    {
        key: "name",
        label: "Name",
        inputType: "text",
        renderCell: (value) => String(value),
    },
    {
        key: "email",
        label: "Email",
        inputType: "text",
        renderCell: (value) => String(value),
    },
    {
        key: "role",
        label: "Role",
        inputType: "select",
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
        onFileUpload: async (file) => {
            console.log('Uploading file:', file);
            // Simulate upload and return a dummy URL
            return Promise.resolve('https://example.com/files/' + file.name);
        },
    },
];

const data: Array<Item<ContactItem>> = [
    { id: "a1b2c3d4-e5f6-7890-a1b2-c3d4e5f6a7b8", name: "Alice", email: "alice@example.com", file: "https://example.com/files/alice-doc.pdf", role: "admin" },
    { id: "b2c3d4e5-f6a7-8901-b2c3-d4e5f6a7b8c9", name: "Bob", email: "bob@example.com", file: "https://example.com/files/bob-report.pdf", role: "user" },
    { id: "c3d4e5f6-a7b8-9012-c3d4-e5f6a7b8c9d0", name: "Charlie", email: "charlie@example.com", file: "https://example.com/files/charlie-presentation.pdf", role: "guest" },
    { id: "d4e5f6a7-b8c9-0123-d4e5-f6a7b8c9d0e1", name: "Dana", email: "dana@example.com", file: "https://example.com/files/dana-notes.pdf", role: "admin" },
    { id: "e5f6a7b8-c9d0-1234-e5f6-a7b8c9d0e1f2", name: "Eve", email: "eve@example.com", file: "https://example.com/files/eve-summary.pdf", role: "user" },
    { id: "f6a7b8c9-d0e1-2345-f6a7-b8c9d0e1f2a3", name: "Frank", email: "frank@example.com", file: "https://example.com/files/frank-report.pdf", role: "guest" },
    { id: "a7b8c9d0-e1f2-3456-a7b8-c9d0e1f2a3b4", name: "Grace", email: "grace@example.com", file: "https://example.com/files/grace-doc.pdf", role: "admin" },
    { id: "b8c9d0e1-f2a3-4567-b8c9-d0e1f2a3b4c5", name: "Heidi", email: "heidi@example.com", file: "https://example.com/files/heidi-analysis.pdf", role: "user" },
    { id: "c9d0e1f2-a3b4-5678-c9d0-e1f2a3b4c5d6", name: "Ivan", email: "ivan@example.com", file: "https://example.com/files/ivan-data.pdf", role: "guest" },
    { id: "d0e1f2a3-b4c5-6789-d0e1-f2a3b4c5d6e7", name: "Judy", email: "judy@example.com", file: "https://example.com/files/judy-report.pdf", role: "admin" },
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
// Using a cast to properly type with our ContactItem generic
export const Basic: Story = (args) => (
    <ResourceManager {...args} />
);
Basic.args = {
    title: "Contact Manager",
    resourceName: "Contact",
    data: data,
    fields: fields,
    handleCreate: (values: Partial<Item<ContactItem>>) => {
        console.log("create (from story)", values);
        if (values.file) {
            console.log("create file:", (values.file as any).name || values.file);
        } else {
            console.log("create", values);
        }
    },
    handleUpdate: (id: string, values: Partial<Item<ContactItem>>) => console.log("update", id, values),
    handleDelete: (ids: Array<string | number>) => console.log("delete", ids),
    handleSelectionChange: (selectedIds: Array<string | number>) => console.log("Selected IDs:", selectedIds),
};
