import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ArticleList from '../components/ArticleList';
import Footer from '../components/Footer';
import { useBlogs, Blog } from '../hooks';
import { HiOutlineArrowRight } from 'react-icons/hi';

const Home = () => {
  const { blogs, loading } = useBlogs();
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (blogs.length > 0) {
      // Get up to 4 random blogs for featured section
      const shuffled = [...blogs].sort(() => 0.5 - Math.random());
      setFeaturedBlogs(shuffled.slice(0, Math.min(4, blogs.length)));
      
      // Get the 6 most recent blogs
      const sorted = [...blogs].sort((a, b) => b.id - a.id);
      setRecentBlogs(sorted.slice(0, Math.min(6, blogs.length)));
    }
  }, [blogs]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <Hero />

        {/* Featured Articles */}
        <section className="py-16 bg-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArticleList 
              title="Featured Articles" 
              subtitle="Explore our most popular articles" 
              blogs={featuredBlogs}
              loading={loading}
            />
            
            <div className="mt-12 text-center">
              <Link 
                to="/blogs" 
                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 transition-colors"
              >
                View all articles
                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArticleList 
              title="Latest Articles" 
              subtitle="Fresh content from our writers" 
              blogs={recentBlogs}
              loading={loading}
            />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest updates and articles directly in your inbox.
            </p>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-primary-400 text-secondary-900"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
