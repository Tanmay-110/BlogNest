import { HiOutlineClock, HiOutlineCalendar, HiOutlineUser } from 'react-icons/hi';
import { Blog } from '../hooks';

interface ArticleDetailProps {
  blog: Blog;
}

export default function ArticleDetail({ blog }: ArticleDetailProps) {
  // Calculate read time based on content length
  const readTime = Math.ceil(blog.content.length / 1000);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Article Header */}
      <div className="mb-12 text-center">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-secondary-900 md:text-4xl lg:text-5xl mb-6">
          {blog.title}
        </h1>
        
        <div className="flex items-center justify-center space-x-4 text-secondary-500">
          <div className="flex items-center">
            <HiOutlineUser className="mr-1 h-4 w-4" />
            <span>{blog.authorName || "BlogNest User"}</span>
          </div>
          <span>•</span>
          <div className="flex items-center">
            <HiOutlineCalendar className="mr-1 h-4 w-4" />
            <time dateTime="2023-04-19">April 19, 2024</time>
          </div>
          <span>•</span>
          <div className="flex items-center">
            <HiOutlineClock className="mr-1 h-4 w-4" />
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-12">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt={blog.title}
          className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg mx-auto">
        {blog.content.split('\n').map((paragraph, index) => (
          paragraph.trim() ? (
            <p key={index} className="mb-6 text-secondary-700 leading-relaxed">
              {paragraph}
            </p>
          ) : <br key={index} />
        ))}
      </div>

      {/* Author Information */}
      <div className="mt-16 border-t border-gray-100 pt-8">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
              <span className="text-lg font-medium text-primary-700">
                {(blog.authorName || "BlogNest User").charAt(0).toUpperCase()}
              </span>
            </span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-bold text-secondary-900">
              {blog.authorName || "BlogNest User"}
            </h3>
            <p className="mt-1 text-secondary-600">
              A passionate writer who shares valuable insights about various topics.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
} 