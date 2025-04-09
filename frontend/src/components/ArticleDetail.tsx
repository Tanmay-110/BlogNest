import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineClock, HiOutlineCalendar, HiOutlineUser, HiOutlineTrash } from 'react-icons/hi';
import { Blog } from '../hooks';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface ArticleDetailProps {
  blog: Blog;
}

export default function ArticleDetail({ blog }: ArticleDetailProps) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate read time based on content length
  const readTime = Math.ceil(blog.content.length / 1000);
  
  // Check if current user is the author
  const isAuthor = blog.authorId && localStorage.getItem('userId') === blog.authorId.toString();

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this article? This action cannot be undone.');
    
    if (!confirmDelete) return;
    
    try {
      setDeleting(true);
      setError(null);
      
      await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`, {
        headers: {
          Authorization: localStorage.getItem('token') || ''
        }
      });
      
      navigate('/blogs');
    } catch (err: any) {
      console.error('Error deleting blog:', err);
      setError(err.response?.data?.message || 'Failed to delete the article');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden">
      {/* Article Header */}
      <div className="mb-10 text-center">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-black sm:text-3xl md:text-4xl mb-6 break-words">
          {blog.title}
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-gray-600 text-sm sm:text-base">
          <div className="flex items-center">
            <HiOutlineUser className="mr-1 h-4 w-4" />
            <span className="truncate">{blog.authorName || "BlogNest User"}</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center">
            <HiOutlineCalendar className="mr-1 h-4 w-4" />
            <time dateTime="2023-04-19">April 19, 2024</time>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center">
            <HiOutlineClock className="mr-1 h-4 w-4" />
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>
      
      {/* Delete Button (Only for authors) */}
      {isAuthor && (
        <div className="flex justify-end mb-8">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            <HiOutlineTrash className="mr-2 h-5 w-5" />
            {deleting ? 'Deleting...' : 'Delete Article'}
          </button>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-sm sm:prose-base lg:prose-lg mx-auto font-serif max-w-full">
        {blog.content.split('\n').map((paragraph, index) => (
          paragraph.trim() ? (
            <p key={index} className="mb-6 text-black leading-relaxed text-base sm:text-lg break-words">
              {paragraph}
            </p>
          ) : <br key={index} />
        ))}
      </div>

      {/* Author Information */}
      <div className="mt-16 border-t border-gray-100 pt-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
          <div className="flex-shrink-0 mb-4 sm:mb-0">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-200">
              <span className="text-lg font-medium text-black">
                {(blog.authorName || "BlogNest User").charAt(0).toUpperCase()}
              </span>
            </span>
          </div>
          <div className="sm:ml-4">
            <h3 className="text-lg font-bold text-black">
              {blog.authorName || "BlogNest User"}
            </h3>
            <p className="mt-1 text-gray-600">
              A passionate writer who shares valuable insights about various topics.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
} 