'use client';

import { ResourceManager } from '../resource-manager/resource-manager';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

export function BooksDemo() {
    const code = `
function Demo() {
    const data = [
        { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
        { id: '2', title: 'Clean Code', author: 'Robert C. Martin' }
    ];
    const fields = [
      {
        key: 'title',
        label: 'Title',
        inputType: 'text',
        fieldType: 'string',
        required: true,
        renderCell: (value) => value,
      },
      {
        key: 'author',
        label: 'Author',
        inputType: 'text',
        fieldType: 'string',
        required: true,
        renderCell: (value) => value,
      }
    ];

    return (
      <ResourceManager
        data={data}
        fields={fields}
        title="Simple Books Demo"
        resourceName="Book"
        onCreate={(data) => console.log('Create:', data)}
        onUpdate={(id, data) => console.log('Update:', id, data)}
        onDelete={(ids) => console.log('Delete:', ids)}
      />
    );
}
  `;

    return (
        <div>
            <LiveProvider code={code} scope={{ ResourceManager }}>
                <div className="grid  gap-4">
                    <div className="p-4">
                        <LivePreview />
                    </div>
                    <div className="p-4 rounded-lg bg-gray-100">
                        <LiveEditor />
                        <LiveError />
                    </div>
                </div>
            </LiveProvider>
        </div>
    );
}
