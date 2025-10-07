import { BooksDemo } from '@/components/demo/books-demo';
import { FaGithub } from "react-icons/fa";

export default function Home() {
    // Page content variables
    const pageContent = {
        header: {
            title: "Resource Manager",
            logoAlt: "Resource Manager Logo",
        },
        hero: {
            title: "Resource Manager",
            subtitle: "A customizable frontend for any data source",
            description: "An add-on for Shadcn/UI offering a highly extensible table and form generator with built-in Zod validation.",
        },
        installation: {
            title: "Installation",
            command: "pnpm shadcn add resource-manager && pnpm dlx shadcn@latest add http://localhost:5173/r/resource-manager.json --overwrite",
        },
        demo: {
            title: "Demo",
            description:
                "Example Next.js demo showcasing integration with Shadcn UI for rapid UI component development.",
        },
        links: {
            github: "https://github.com/Alex-Amayo/resource-manager",
        },
    };



    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
            <nav className="fixed w-full top-0 left-0 backdrop-blur-sm bg-white/30 z-10 h-20 border-b">
                <div className="container mx-auto h-full">
                    <div className="flex justify-between items-center px-4 h-full">
                        <a href={process.env.NEXT_PUBLIC_BASE_PATH || "/"} className="flex items-center gap-2 text-2xl font-bold text-black hover:text-gray-700 transition-colors">
                            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/table.png`} alt={pageContent.header.logoAlt} className="w-10 h-10" />
                            {pageContent.header.title}
                        </a>
                        <a href={pageContent.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-600 transition-colors">
                            <FaGithub className="w-10 h-10 p-1" />
                        </a>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto pt-32 pb-16 px-4 flex flex-col gap-16 max-w-6xl">
                <section className="text-center flex flex-col gap-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">{pageContent.hero.title}</h1>
                    <h2 className="text-xl sm:text-2xl font-medium text-gray-700">{pageContent.hero.subtitle}</h2>
                    <p className="text-base sm:text-lg text-gray-600">{pageContent.hero.description}</p>
                </section>
                <section className="flex flex-col gap-4 items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">{pageContent.installation.title}</h2>
                    <div className="bg-gray-800 rounded-lg p-4 w-full">
                        <code className="text-sm text-white block">{pageContent.installation.command}</code>
                    </div>
                </section>
                <section className="flex flex-col gap-4 items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">{pageContent.demo.title}</h2>
                    <div className="w-full">
                        <BooksDemo />
                    </div>
                </section>
            </main>
        </div>
    );
}
