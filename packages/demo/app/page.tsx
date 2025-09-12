import { BooksDemo } from '../components/demo/books-demo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Resource Manager
          </h1>
          <p className="text-lg leading-8 text-gray-600">
            A powerful and flexible React component for managing collections of resources
            with built-in CRUD operations, form generation, and data visualization.
          </p>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-gray-900">Installation</h2>
            <div className="bg-gray-800 rounded-lg p-4 text-left">
              <code className="text-sm text-white">
                <div>pnpm dlx shadcn@latest add http://localhost:5173/r/resource-manager.json</div>
              </code>
            </div>
          </div>
          <div className="flex justify-center">
            <a
              href="https://github.com/Alex-Amayo/resource-manager"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-gray-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              GitHub Repository
            </a>
          </div>
        </div>
        <div className="mt-16">
          <BooksDemo />
        </div>
      </div>
    </div>
  );
}
