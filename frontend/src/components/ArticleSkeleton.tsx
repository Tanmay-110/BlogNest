export default function ArticleSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-sm border border-gray-100 animate-pulse">
      <div className="flex-shrink-0">
        <div className="h-48 w-full bg-gray-200" />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 bg-gray-200 rounded-full" />
          </div>
          <div className="ml-3">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
            <div className="flex space-x-4">
              <div className="h-3 bg-gray-200 rounded w-20" />
              <div className="h-3 bg-gray-200 rounded w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 