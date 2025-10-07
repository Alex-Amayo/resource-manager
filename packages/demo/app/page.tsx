import {BooksDemo} from '@/components/demo/books-demo';
import {FaGithub} from "react-icons/fa";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
            <nav className="fixed w-full top-0 left-0 backdrop-blur-sm bg-white/30 z-10 h-20 border-b">
                <div className="container mx-auto h-full">
                    <div className="flex justify-between items-center px-4 h-full">
                        <a href="/" className="flex items-center gap-2 text-2xl font-bold text-black hover:text-gray-700 transition-colors">
                            <img src="/table.png" alt="Table" className="w-10 h-10" />
                            Resource Manager
                        </a>
                        <a href="https://github.com/Alex-Amayo/resource-manager" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-600 transition-colors">
                            <FaGithub className="w-10 h-10 p-1" />
                        </a>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto pt-32 pb-16 px-4 flex flex-col gap-16">
                <section className="text-center flex flex-col gap-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Resource Manager</h1>
                    <h2 className="text-xl sm:text-2xl font-medium text-gray-700">Effortlessly manage and visualize your resources</h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">A Shadcn/ui Block for managing resources in your database. Automatically generates forms based on your specifications using shadcn components. Retains any existing styling and configuration from your shadcn/ui setup.</p>
                </section>
                <section className="flex flex-col gap-4 items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Installation</h2>
                    <div className="bg-gray-800 rounded-lg p-4 w-full max-w-xl">
                        <code className="text-sm text-white block">pnpm dlx shadcn@latest add http://localhost:5173/r/resource-manager.json</code>
                    </div>
                </section>
                <section className="flex flex-col gap-4 items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Demo</h2>
                    <div className="w-full max-w-4xl">
                        <BooksDemo />
                    </div>
                </section>
            </main>
        </div>
    );
}
