// input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputText } from './input-text';
import { InputTextarea } from './input-textarea';
import { InputSelect } from './input-select';
import { InputFile } from './input-file';

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
      id="select"
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
          // For Storybook, just log the file name
          if (file) {
            // eslint-disable-next-line no-console
            console.log('Selected file:', file.name);
          }
        },
      }}
    />
  ),
};
