import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
    return (
        <div className="p-6 mb-4 bg-white rounded-lg border border-gray-100 w-full max-w-2xl animate-pulse">
            <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded ml-2 w-24"></div>
                <div className="h-1 w-1 rounded-full bg-gray-200 mx-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            
            <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
            
            <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            
            <div className="h-4 bg-gray-200 rounded w-28"></div>
        </div>
    );
};