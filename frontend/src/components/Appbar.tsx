import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { FiEdit, FiLogOut, FiHome, FiBookOpen, FiUser, FiMenu, FiX } from "react-icons/fi"

export const Appbar = () => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    const navbarClasses = `sticky top-0 z-10 bg-white transition-all duration-200 ${
        isScrolled ? 'shadow-md' : 'border-b border-gray-100'
    }`;

    return (
        <div className={navbarClasses}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to={'/'} className="text-2xl font-serif font-bold flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                        BlogNest
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/publish" className="flex items-center space-x-1 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            <FiEdit className="inline" />
                            <span>Write</span>
                        </Link>

                        <div className="relative">
                            <div 
                                onClick={() => setShowLogout(!showLogout)} 
                                className="cursor-pointer rounded-full bg-primary-100 h-10 w-10 flex items-center justify-center hover:bg-primary-200 transition-colors"
                            >
                                <span className="text-primary-700 font-medium">U</span>
                            </div>
                            
                            {showLogout && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100 overflow-hidden">
                                    <button 
                                        onClick={handleLogout}
                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-primary-50 transition-colors"
                                    >
                                        <FiLogOut className="mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-secondary-400 hover:text-secondary-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {showMobileMenu ? (
                                <FiX className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <FiMenu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {showMobileMenu && (
                <div className="md:hidden bg-white border-t border-gray-100 py-3">
                    <div className="space-y-1 px-4 pt-2 pb-3 sm:px-3">
                        <Link 
                            to="/publish" 
                            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-secondary-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            <FiEdit className="mr-3 h-5 w-5" />
                            Write
                        </Link>
                        <button
                            onClick={() => {
                                handleLogout();
                                setShowMobileMenu(false);
                            }}
                            className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-secondary-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                        >
                            <FiLogOut className="mr-3 h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}