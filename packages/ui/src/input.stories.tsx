// input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputText } from './components/resource-manager/resource-form-generator/inputs/input-text.tsx';
import { InputTextarea } from './components/resource-manager/resource-form-generator/inputs/input-textarea.tsx';
import { InputSelect } from './components/resource-manager/resource-form-generator/inputs/input-select.tsx';
import { InputFile } from './components/resource-manager/resource-form-generator/inputs/input-file.tsx';

const meta: Meta = {
  title: 'Forms/Inputs',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

const fakeField = {
  name: 'field',
  value: '',
  onChange: () => {},
  onBlur: () => {},
  ref: () => {},
};

export const Text: Story = {
  render: () => <InputText id="text" field={{ ...fakeField, value: '' }} />,
};

export const Textarea: Story = {
  render: () => <InputTextarea id="textarea" field={{ ...fakeField, value: '' }} />,
};

export const Select: Story = {
  render: () => (
    <InputSelect
      label="Select Option"
      field={{ ...fakeField, value: 'option1' }}
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ]}
    />
  ),
};

export const File: Story = {
  render: () => (
    <InputFile
      id="file"
      field={{
        ...fakeField,
        value: undefined,
        onChange: file => {
          // For Storybook, log the file name
          if (file) {
            console.log('Selected file:', file.name);
          }
        },
      }}
    />
  ),
};
