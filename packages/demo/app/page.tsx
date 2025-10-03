import { BooksDemo } from '../components/demo/books-demo';
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <nav className='fixed w-full inset-0 backdrop-blur-sm bg-white/30 z-10 h-20 border-b-1'>
        <div className="container mx-auto h-full">
          <div className="w-full flex justify-between items-center px-4 h-full">
            <a href="/" className="text-xl font-semibold text-black hover:text-gray-700 transition-colors flex items-center gap-2">
              <img src="/table.png" alt="Table" className="w-10 h-10" />
              Resource Manager
            </a>
            <a 
              href="https://github.com/Alex-Amayo/resource-manager"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-gray-600 transition-colors"
            >
              <FaGithub className="w-10 h-10 p-1" />
            </a>
          </div>
        </div>
      </nav>


      <div className="container mx-auto px-4 pt-20">
        <div className="py-12">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Resource Manager
            </h1>
            <p className="text-lg leading-8 text-gray-600">
              A Shadcn/ui Block for managing resources in your database. 
              Automatically generates forms based on your specifications using shadcn components.
              Retains any existing styling and configuration from your shadcn/ui setup.
            </p>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-gray-900">Installation</h2>
              <div className="bg-gray-800 rounded-lg p-4 text-left">
                <code className="text-sm text-white">
                  <div>pnpm dlx shadcn@latest add http://localhost:5173/r/resource-manager.json</div>
                </code>
              </div>
            </div>
            <div className="text-left">
              <BooksDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
