import { useState } from 'react';
import { ResourceManager, type ResourceData, type FieldDef } from 'resource-manager-ui';
import './App.css';

// Sample data for demonstration
const initialProjects: ResourceData[] = [
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'A modern e-commerce solution with React and Node.js',
    category: 'web',
    status: 'active',
    budget: 50000,
    startDate: '2024-01-15',
    tags: 'react,nodejs,ecommerce'
  },
  {
    id: 2,
    name: 'Mobile Banking App',
    description: 'Secure mobile banking application for iOS and Android',
    category: 'mobile',
    status: 'planning',
    budget: 75000,
    startDate: '2024-03-01',
    tags: 'mobile,banking,security'
  },
  {
    id: 3,
    name: 'Data Analytics Dashboard',
    description: 'Real-time analytics dashboard for business intelligence',
    category: 'analytics',
    status: 'completed',
    budget: 30000,
    startDate: '2023-06-01',
    tags: 'analytics,dashboard,bi'
  }
];

// Field definitions for the resource manager
const projectFields: FieldDef[] = [
  {
    key: 'name',
    label: 'Project Name',
    fieldType: 'string',
    inputType: 'text',
    required: true,
    renderCell: (value) => <span className="font-medium">{value}</span>,
  },
  {
    key: 'description',
    label: 'Description',
    fieldType: 'string',
    inputType: 'textarea',
    required: true,
    renderCell: (value) => (
      <span className="text-sm text-muted-foreground line-clamp-2">
        {value}
      </span>
    ),
  },
  {
    key: 'category',
    label: 'Category',
    fieldType: 'string',
    inputType: 'select',
    required: true,
    options: [
      { value: 'web', label: 'Web Development' },
      { value: 'mobile', label: 'Mobile Development' },
      { value: 'analytics', label: 'Data Analytics' },
      { value: 'ai', label: 'AI/Machine Learning' },
      { value: 'design', label: 'Design & UX' },
    ],
    renderCell: (value) => {
      const categoryColors = {
        web: 'bg-blue-100 text-blue-800',
        mobile: 'bg-green-100 text-green-800',
        analytics: 'bg-purple-100 text-purple-800',
        ai: 'bg-orange-100 text-orange-800',
        design: 'bg-pink-100 text-pink-800',
      };
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          categoryColors[value as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      );
    },
  },
  {
    key: 'status',
    label: 'Status',
    fieldType: 'string',
    inputType: 'select',
    required: true,
    options: [
      { value: 'planning', label: 'Planning' },
      { value: 'active', label: 'Active' },
      { value: 'on-hold', label: 'On Hold' },
      { value: 'completed', label: 'Completed' },
    ],
    renderCell: (value) => {
      const statusColors = {
        planning: 'bg-yellow-100 text-yellow-800',
        active: 'bg-green-100 text-green-800',
        'on-hold': 'bg-red-100 text-red-800',
        completed: 'bg-gray-100 text-gray-800',
      };
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusColors[value as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      );
    },
  },
  {
    key: 'budget',
    label: 'Budget',
    fieldType: 'number',
    inputType: 'number',
    required: true,
    renderCell: (value) => (
      <span className="font-mono text-sm">
        ${Number(value).toLocaleString()}
      </span>
    ),
  },
  {
    key: 'startDate',
    label: 'Start Date',
    fieldType: 'date',
    inputType: 'text',
    required: true,
    renderCell: (value) => (
      <span className="text-sm">
        {new Date(value).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: 'tags',
    label: 'Tags',
    fieldType: 'string',
    inputType: 'text',
    required: false,
    renderCell: (value) => (
      <div className="flex flex-wrap gap-1">
        {value?.split(',').map((tag: string, index: number) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
          >
            {tag.trim()}
          </span>
        ))}
      </div>
    ),
  },
];

function App() {
  const [projects, setProjects] = useState<ResourceData[]>(initialProjects);

  const handleCreate = (values: Partial<ResourceData>) => {
    const newProject = {
      ...values,
      id: Math.max(...projects.map(p => Number(p.id))) + 1,
    };
    setProjects([...projects, newProject]);
    console.log('Creating project:', newProject);
  };

  const handleUpdate = (id: string | number, values: Partial<ResourceData>) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, ...values } : project
    ));
    console.log('Updating project:', id, values);
  };

  const handleDelete = (id: string | number) => {
    setProjects(projects.filter(project => project.id !== id));
    console.log('Deleting project:', id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Resource Manager Demo
          </h1>
          <p className="text-muted-foreground">
            A comprehensive example of the ResourceManager component with project management data.
          </p>
        </div>
        
        <ResourceManager
          title="Project Management"
          resourceName="Project"
          data={projects}
          fields={projectFields}
          create={handleCreate}
          update={handleUpdate}
          delete={handleDelete}
          defaultValues={{
            category: 'web',
            status: 'planning',
            budget: 10000,
            startDate: new Date().toISOString().split('T')[0],
          }}
        />
      </div>
    </div>
  );
}

export default App
