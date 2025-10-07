'use client';

import React from 'react';
import { ResourceManager } from '../resource-manager/resource-manager';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { z } from 'zod';

const initialData = [
	{
		id: '1',
		title: 'The Great Gatsby',
		author: 'F. Scott Fitzgerald',
		year: 1925,
		description: 'A classic novel.',
		genre: 'fiction',
		cover: 'https://example.com/gatsby.png',
	},
	{
		id: '2',
		title: 'Clean Code',
		author: 'Robert C. Martin',
		year: 2008,
		description: 'A book about writing clean code.',
		genre: 'nonfiction',
		cover: 'https://example.com/cleancode.png',
	},
	{
		id: '3',
		title: 'To Kill a Mockingbird',
		author: 'Harper Lee',
		year: 1960,
		description: 'A novel about racial injustice.',
		genre: 'fiction',
		cover: 'https://example.com/mockingbird.png',
	},
	{
		id: '4',
		title: 'The Pragmatic Programmer',
		author: 'Andrew Hunt',
		year: 1999,
		description: 'A book for software developers.',
		genre: 'nonfiction',
		cover: 'https://example.com/pragmatic.png',
	},
	{
		id: '5',
		title: '1984',
		author: 'George Orwell',
		year: 1949,
		description: 'A dystopian novel.',
		genre: 'fiction',
		cover: 'https://example.com/1984.png',
	},
	{
		id: '6',
		title: 'Refactoring',
		author: 'Martin Fowler',
		year: 1999,
		description: 'Improving the design of existing code.',
		genre: 'nonfiction',
		cover: 'https://example.com/refactoring.png',
	},
	{
		id: '7',
		title: 'Brave New World',
		author: 'Aldous Huxley',
		year: 1932,
		description: 'A futuristic society.',
		genre: 'fiction',
		cover: 'https://example.com/bravenewworld.png',
	},
	{
		id: '8',
		title: 'Domain-Driven Design',
		author: 'Eric Evans',
		year: 2003,
		description: 'Tackling complexity in software.',
		genre: 'nonfiction',
		cover: 'https://example.com/ddd.png',
	},
	{
		id: '9',
		title: 'Moby Dick',
		author: 'Herman Melville',
		year: 1851,
		description: 'A story of obsession.',
		genre: 'fiction',
		cover: 'https://example.com/mobydick.png',
	},
	{
		id: '10',
		title: 'Design Patterns',
		author: 'Erich Gamma',
		year: 1994,
		description: 'Elements of reusable object-oriented software.',
		genre: 'nonfiction',
		cover: 'https://example.com/designpatterns.png',
	},
];

export function BooksDemo() {
	const code = `
function Demo() {
  const [data, setData] = React.useState(initialData);
  const fields = [
    {
      key: 'title',
      label: 'Title',
      inputType: 'text',
      fieldType: 'string',
      zodSchema: z.string().min(1, 'Title is required')
    },
    {
      key: 'author',
      label: 'Author',
      inputType: 'text',
      fieldType: 'string',
      zodSchema: z.string().min(1, 'Author is required')
    },
    {
      key: 'year',
      label: 'Year Released',
      inputType: 'number',
      fieldType: 'number',
      zodSchema: z.number()
    },
    {
      key: 'description',
      label: 'Description',
      inputType: 'textarea',
      fieldType: 'string',
      zodSchema: z.string().optional()
    },
    {
      key: 'genre',
      label: 'Genre',
      inputType: 'select',
      fieldType: 'string',
      options: [
        { value: 'fiction', label: 'Fiction' },
        { value: 'nonfiction', label: 'Nonfiction' },
        { value: 'other', label: 'Other' }
      ],
      zodSchema: z.string().min(1, 'Genre is required')
    },
    {
      key: 'cover',
      label: 'Book Cover',
      inputType: 'file',
      fieldType: 'file',
      renderCell: (value: any) => {
        if (typeof value === 'string' && value.startsWith('http')) {
          return value;
        }
        return '-';
      },
      onFileUpload: async (file) => {
        await new Promise(res => setTimeout(res, 500));
        return \`https://dummyimage.com/100x150/cccccc/000000&text=\${encodeURIComponent(file.name)}\`;
      },
      zodSchema: z.string().optional()
    }
  ];
  function handleAdd(resource: any) {
    setData(prev => [
      ...prev,
      {
        ...resource,
        id: String(Date.now()),
        cover: resource.cover instanceof File ? (resource.cover.url || resource.cover.name) : resource.cover || ''
      }
    ]);
  }
  function handleDelete(id: string) {
    setData(prev => prev.filter(item => item.id !== id));
  }
  function handleUpdate(id: string, values: any) {
    setData(prev => prev.map(item =>
      item.id === id
        ? {
          ...item,
          ...values,
          cover: values.cover instanceof File ? (values.cover.url || values.cover.name) : values.cover || item.cover
        }
        : item
    ));
  }
  return (
    <ResourceManager
      data={data}
      fields={fields}
      handleCreate={handleAdd}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />
  );
}
`;

	return (
		<div>
			<LiveProvider code={code} scope={{ ResourceManager, React, initialData, z }}>
				<div className='flex flex-col gap-24 text-left'>
					<LivePreview />
					<div>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">Live Code Editor</h2>
						<LiveEditor />
						<LiveError />
					</div>
				</div>
			</LiveProvider>
		</div>
	);
}
