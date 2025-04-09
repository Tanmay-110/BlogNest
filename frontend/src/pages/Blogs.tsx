import ArticleList from "../components/ArticleList"
import Footer from "../components/Footer"
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <main className="flex-grow pt-16">
                <div className="bg-white py-12">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ArticleList 
                            title="All Articles" 
                            subtitle="Discover the latest thoughts, ideas, and stories from our community" 
                            blogs={blogs}
                            loading={loading}
                        />
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

