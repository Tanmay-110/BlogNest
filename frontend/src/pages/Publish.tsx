import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { createBlogInput } from "@tanmay01/medium-common";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Check if user is logged in, redirect to login if not
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/signin');
        }
    }, [navigate]);

    const handlePublish = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/signin');
                return;
            }
            
            // Validate input using Zod schema
            const validation = createBlogInput.safeParse({
                title,
                content: description
            });
            
            if (!validation.success) {
                setError(validation.error.issues.map(issue => issue.message).join(', '));
                return;
            }
            
            setError("");
            
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: token
                }
            });
            navigate('/blogs');
        } catch (error) {
            console.error("Error publishing post:", error);
            if (axios.isAxiosError(error) && error.response?.status === 403) {
                navigate('/signin');
            }
        }
    };

    return <div className="min-h-screen bg-white">
        <Appbar />
        <div className="flex justify-center w-full pt-24 sm:pt-28 px-4 sm:px-6"> 
            <div className="w-full max-w-screen-lg">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-black mb-6 text-center">Write your article</h1>
                
                <input 
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" 
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 sm:p-3 mb-4" 
                    placeholder="Title" 
                />

                <TextEditor onChange={(e) => setDescription(e.target.value)} />
                
                {error && (
                    <div className="mt-2 text-red-500 text-sm sm:text-base">
                        {error}
                    </div>
                )}
                
                <div className="flex justify-center sm:justify-end mt-6 mb-10">
                    <button 
                        onClick={handlePublish} 
                        type="submit" 
                        className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 transition-colors w-full sm:w-auto"
                    >
                        Publish article
                    </button>
                </div>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4">
            <div className="border rounded-lg overflow-hidden">
                <div className="bg-white w-full">
                    <label className="sr-only">Write your article</label>
                    <textarea 
                        onChange={onChange} 
                        id="editor" 
                        rows={12} 
                        className="focus:outline-none block w-full p-3 sm:p-4 text-sm sm:text-base text-gray-800 bg-white border-0 resize-y" 
                        placeholder="Write your article here..." 
                        required 
                    />
                </div>
            </div>
        </div>
    </div>
}