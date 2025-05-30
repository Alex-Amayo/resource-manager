import { ResourceManager } from "./resource-manager";
import type { ResourceData, FieldDef } from "./types";
import type { StoryFn } from "@storybook/react-vite";

interface Contact extends ResourceData {
    id: number;
    name: string;
    email: string;
}

// Example of extending FieldTypes for demonstration
interface ContactFieldTypes extends FieldTypes {
  // Add custom types here if needed, e.g.:
  // date: Date;
}

const fields: FieldDef<Contact, ContactFieldTypes>[] = [
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
];

const data: Contact[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
];

export default {
    title: "Components/ResourceManager",
    component: ResourceManager,
};

type Story = StoryFn<typeof ResourceManager>;
const Template: Story = (args) => <ResourceManager<Contact, ContactFieldTypes> {...(args as any)} />;

export const Basic: Story = Template.bind({});
Basic.args = {
    title: "Contact Manager",
    resourceName: "Contact",
    data,
    fields,
    defaultValues: { name: "", email: "" },
    create: (values) => console.log("create", values),
    update: (id, values) => console.log("update", id, values),
    delete: (id) => console.log("delete", id),
};
