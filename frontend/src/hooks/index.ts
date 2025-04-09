import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string;
    "title": string;
    "id": number;
    "authorId": number;
    "authorName": string;
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`)
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, [])

    return {
        loading,
        blogs
    }
}


export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`)
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blog:", error);
                setLoading(false);
            });
    }, [id])

    return {
        loading,
        blog
    }
}