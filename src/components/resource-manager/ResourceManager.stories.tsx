import { ResourceManager } from "./resource-manager";
import type { ResourceData, FieldDef } from "./types";
import type { StoryFn } from "@storybook/react-vite";

interface Contact extends ResourceData {
    id: number;
    name: string;
    email: string;
}

const fields: FieldDef<Contact>[] = [
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

function DummyForm({ initialValues, onSubmit, onCancel }: any) {
    const [formData, setFormData] = React.useState(initialValues);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData);
            }}
        >
            <input
                value={formData.name || ""}
                placeholder="Name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                value={formData.email || ""}
                placeholder="Email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}

export default {
    title: "Components/ResourceManager",
    component: ResourceManager,
};

type Story = StoryFn<typeof ResourceManager>;
const Template: Story = (args) => <ResourceManager {...args} />;

export const Basic: Story = Template.bind({});
Basic.args = {
    title: "Contact Manager",
    resourceName: "Contact",
    data,
    fields,
    defaultValues: { name: "", email: "" },
    create: (values: any) => console.log("create", values),
    update: (id: number, values: any) => console.log("update", id, values),
    delete: (id: number) => console.log("delete", id),
    FormComponent: DummyForm,
};
