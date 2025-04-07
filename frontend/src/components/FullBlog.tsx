import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import { FiCalendar, FiClock } from "react-icons/fi"

export const FullBlog = ({ blog }: {blog: Blog}) => {
    return (
        <div className="min-h-screen bg-white">
            <Appbar />
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg overflow-hidden">
                    <div className="p-4 md:p-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>
                        
                        <div className="flex items-center mb-8 text-sm">
                            <div className="flex items-center">
                                <FiCalendar className="text-gray-500 mr-1" />
                                <span className="text-gray-500">April 19, 2024</span>
                            </div>
                            <span className="mx-2 text-gray-300">•</span>
                            <div className="flex items-center">
                                <FiClock className="text-gray-500 mr-1" />
                                <span className="text-gray-500">{`${Math.ceil(blog.content.length / 100)} min read`}</span>
                            </div>
                        </div>
                        
                        <div className="prose prose-lg max-w-none">
                            {blog.content.split('\n').map((paragraph, index) => (
                                paragraph ? 
                                <p key={index} className="mb-6 text-gray-800 text-lg md:text-xl leading-relaxed">{paragraph}</p> 
                                : <br key={index} />
                            ))}
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-100 bg-gray-50 p-8 mt-10">
                        <div className="flex items-start">
                            <div className="mr-4">
                                <Avatar size="big" name={blog.authorName || "BlogNest User"} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {blog.authorName || "BlogNest User"}
                                </h3>
                                <p className="mt-2 text-gray-600 text-base">
                                    A passionate writer who shares valuable insights and perspectives on various topics.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}