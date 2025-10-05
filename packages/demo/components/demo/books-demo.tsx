'use client';

import { ResourceManager } from '../resource-manager/resource-manager';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

export function BooksDemo() {
    const code = `
function Demo() {
    const data = [
        { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
        { id: '2', title: 'Clean Code', author: 'Robert C. Martin', year: 2008 }
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
      },
      {
        key: 'year',
        label: 'Year Released',
        inputType: 'number',
        fieldType: 'number',
        required: true,
        renderCell: (value) => value,
      },
      {
        key: 'cover',
        label: 'Book Cover',
        inputType: 'file',
        fieldType: 'file',
        required: false,
        renderCell: (value) => value instanceof File ? value.name : (value ? String(value) : ''),
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
                <div className='flex flex-col gap-10'>
                    <LivePreview />
                    <div>
                        <LiveEditor />
                        <LiveError />
                    </div>
                </div>
            </LiveProvider>
        </div>
    );
}
