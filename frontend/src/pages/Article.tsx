import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArticleDetail from '../components/ArticleDetail';
import { useBlog } from '../hooks';

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  // If id is undefined, use a placeholder. We'll redirect in useEffect
  const { loading, blog } = useBlog({ id: id || '0' });

  useEffect(() => {
    if (!id) {
      navigate('/blogs');
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 pt-28 pb-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 pt-28 pb-16 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">
          {error || 'Article not found'}
        </h2>
        <p className="text-gray-600 mb-8">
          We couldn't find the article you're looking for.
        </p>
        <button
          onClick={() => navigate('/blogs')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Articles
        </button>
      </div>
    );
  }

  return <ArticleDetail blog={blog} />;
} 