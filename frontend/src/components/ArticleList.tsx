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
    <div className="bg-white py-8 sm:py-12 w-full">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-black sm:text-5xl">
            {title}
          </h2>
          <p className="mt-2 text-xl leading-8 text-black">
            {subtitle}
          </p>
        </div>
        
        {loading ? (
          <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <ArticleSkeleton key={i} />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-lg text-black">No articles yet. Be the first to publish!</p>
          </div>
        ) : (
          <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-6xl">
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