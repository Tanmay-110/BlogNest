import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-6 mb-4 bg-white rounded-lg border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all duration-200 ease-in-out w-full max-w-2xl">
                <div className="flex items-center mb-4">
                    <Avatar name={authorName} />
                    <div className="font-medium pl-2 text-sm flex justify-center flex-col text-gray-800">{authorName}</div>
                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>
                    <div className="pl-2 text-gray-500 text-sm flex justify-center flex-col">
                        {publishedDate}
                    </div>
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-indigo-600 transition-colors">
                    {title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {content.slice(0, 200) + (content.length > 200 ? "..." : "")}
                </p>
                <div className="flex items-center text-gray-500 text-sm font-medium">
                    <FiClock className="mr-1" />
                    {`${Math.ceil(content.length / 100)} minute read`}
                </div>
            </div>
        </Link>
    );
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-gray-400"></div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-indigo-100 text-indigo-600 rounded-full ${size === "small" ? "w-8 h-8" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-medium`}>
                {name ? name[0].toUpperCase() : "U"}
            </span>
        </div>
    )
}