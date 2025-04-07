import { Blog } from '../hooks';
import ArticleCard from './ArticleCard';
import ArticleSkeleton from './ArticleSkeleton';

interface ArticleListProps {
  title?: string;
  subtitle?: string;
  blogs: Blog[];
  loading?: boolean;
}

export default function ArticleList({ 
  title = "Latest Articles", 
  subtitle = "Explore the latest thoughts, ideas, and stories from our community",
  blogs = [], 
  loading = false 
}: ArticleListProps) {
  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-secondary-600">
            {subtitle}
          </p>
        </div>
        
        {loading ? (
          <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ArticleSkeleton key={i} />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-lg text-secondary-600">No articles yet. Be the first to publish!</p>
          </div>
        ) : (
          <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...blogs]
              .sort((a, b) => b.id - a.id)
              .map((blog) => (
                <ArticleCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  content={blog.content}
                  authorName={blog.authorName || "BlogNest User"}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
} 