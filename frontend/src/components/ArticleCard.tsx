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
  const preview = content.length > 200 
    ? content.substring(0, 200).trim() + '...' 
    : content;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 bg-white h-full">
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-6 md:p-8">
        <div className="flex-1">
          <Link to={`/article/${id}`} className="block">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-black hover:text-gray-700 transition-colors line-clamp-2 mb-3 sm:mb-5 break-words">
              {title}
            </h3>
            <p className="text-base sm:text-lg text-black line-clamp-3 sm:line-clamp-4 font-serif mb-4 sm:mb-6 break-words">
              {preview}
            </p>
          </Link>
        </div>
        
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
          <div className="flex-shrink-0">
            <span className="inline-flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gray-200">
              <span className="text-base sm:text-lg font-medium text-black">
                {authorName.charAt(0).toUpperCase()}
              </span>
            </span>
          </div>
          <div className="sm:ml-4">
            <p className="text-base sm:text-lg font-medium text-black truncate">{authorName}</p>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base text-gray-600">
              <span className="flex items-center">
                <HiOutlineCalendar className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />
                {publishedDate}
              </span>
              <span className="flex items-center">
                <HiOutlineClock className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />
                {`${readTime} min read`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 