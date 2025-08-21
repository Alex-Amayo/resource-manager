'use client';

import { ResourceManager } from "@/components/resource-manager/resource-manager";
import type { ResourceData, FieldDef } from "@/lib/types";
import { useState } from "react";

export default function DemoPage() {
  const [books, setBooks] = useState<ResourceData[]>([
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'fiction', description: 'A story of decadence and excess.' },
    { id: '2', title: '1984', author: 'George Orwell', year: 1949, genre: 'fiction', description: 'A dystopian social science fiction novel.' },
  ]);

  const fields: FieldDef[] = [
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
      label: 'Publication Year',
      inputType: 'number',
      fieldType: 'number',
      required: true,
      renderCell: (value) => value,
    },
    {
      key: 'genre',
      label: 'Genre',
      inputType: 'select',
      fieldType: 'string',
      required: true,
      options: [
        { label: 'Fiction', value: 'fiction' },
        { label: 'Non-fiction', value: 'non-fiction' },
        { label: 'Science Fiction', value: 'sci-fi' },
        { label: 'Mystery', value: 'mystery' },
      ],
      renderCell: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    {
      key: 'description',
      label: 'Description',
      inputType: 'textarea',
      fieldType: 'string',
      renderCell: (value) => value,
    },
  ];

  const handleCreate = (values: Partial<ResourceData>) => {
    setBooks((prev) => [...prev, { ...values, id: String(Date.now()) }]);
  };

  const handleUpdate = (id: string, values: Partial<ResourceData>) => {
    setBooks((prev) => prev.map((book) => 
      book.id === id ? { ...book, ...values } : book
    ));
  };

  const handleDelete = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <div className="container mx-auto py-8">
      <ResourceManager
        title="Book Collection"
        resourceName="Book"
        data={books}
        fields={fields}
        create={handleCreate}
        update={handleUpdate}
        delete={handleDelete}
      />
    </div>
  );
}