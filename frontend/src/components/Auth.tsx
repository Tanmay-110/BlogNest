import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput, SigninInput } from "@tanmay01/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { FiMail, FiLock, FiUser, FiLogIn } from "react-icons/fi";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [postInputs, setPostInputs] = useState<SignupInput>({
        username: "",
        password: "",
        name: ""
    });

    async function sendRequest() {
        try {
            setLoading(true);
            const requestData = type === "signin" 
                ? { username: postInputs.username, password: postInputs.password } as SigninInput
                : postInputs;
                
            console.log(`Sending ${type} request to ${BACKEND_URL}/api/v1/user/${type}`, requestData);
            
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, requestData);
            console.log("Authentication response:", response.data);
            
            const { jwt } = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e: any) {
            console.error("Authentication error:", e);
            console.error("Error details:", e.response?.data || "No response data");
            alert(`Error while authenticating: ${e.response?.data?.message || e.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-bold tracking-tight text-secondary-900">
                    {type === "signin" ? "Sign in to your account" : "Create your account"}
                </h2>
                <p className="mt-2 text-center text-sm text-secondary-600">
                    {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                    <Link to={type === "signin" ? "/signup" : "/signin"} className="ml-1 font-medium text-primary-600 hover:text-primary-700 transition-colors">
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-lg sm:px-10">
                    <div className="space-y-6">
                        {type === "signup" && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-secondary-700">Name</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="h-5 w-5 text-secondary-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        placeholder="Your name"
                                        onChange={(e) => {
                                            setPostInputs({
                                                ...postInputs,
                                                name: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-secondary-700">Email address</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-secondary-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    placeholder="you@example.com"
                                    onChange={(e) => {
                                        setPostInputs({
                                            ...postInputs,
                                            username: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-secondary-700">Password</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-secondary-400" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    placeholder="••••••••"
                                    onChange={(e) => {
                                        setPostInputs({
                                            ...postInputs,
                                            password: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={sendRequest}
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <FiLogIn className="h-5 w-5 text-white" />
                                </span>
                                {loading ? 'Processing...' : (type === "signup" ? "Sign up" : "Sign in")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}