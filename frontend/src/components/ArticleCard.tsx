import { Link } from 'react-router-dom';
import { HiOutlineClock, HiOutlineCalendar } from 'react-icons/hi';

interface ArticleCardProps {
  id: number;
  title: string;
  content: string;
  authorName: string;
  publishedDate?: string;
}

export default function ArticleCard({
  id,
  title,
  content,
  authorName,
  publishedDate = "Recently",
}: ArticleCardProps) {
  // Calculate read time based on content length
  const readTime = Math.ceil(content.length / 1000);
  
  // Truncate content for preview
  const preview = content.length > 150 
    ? content.substring(0, 150).trim() + '...' 
    : content;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <Link to={`/article/${id}`} className="block">
            <h3 className="font-serif text-3xl font-bold text-secondary-900 hover:text-primary-600 transition-colors line-clamp-2 mb-4">
              {title}
            </h3>
            <p className="text-lg text-secondary-600 line-clamp-3">
              {preview}
            </p>
          </Link>
        </div>
        
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
              <span className="text-base font-medium text-primary-700">
                {authorName.charAt(0).toUpperCase()}
              </span>
            </span>
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-secondary-900">{authorName}</p>
            <div className="flex space-x-4 text-sm text-secondary-500">
              <span className="flex items-center">
                <HiOutlineCalendar className="mr-1.5 h-4 w-4" />
                {publishedDate}
              </span>
              <span className="flex items-center">
                <HiOutlineClock className="mr-1.5 h-4 w-4" />
                {`${readTime} min read`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 