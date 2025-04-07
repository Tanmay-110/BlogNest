import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiOutlinePencilAlt, HiOutlineLogout, HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');

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
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const navItems = [
    {
      name: 'Articles',
      path: '/blogs',
      icon: <HiOutlinePencilAlt className="w-5 h-5" />,
      requiresAuth: true
    },
    {
      name: 'Write',
      path: '/publish',
      icon: <HiOutlinePencilAlt className="w-5 h-5" />,
      requiresAuth: true
    }
  ];

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link 
            to="/blogs" 
            className="flex-shrink-0 flex items-center"
          >
            <span className="font-serif font-bold text-2xl text-black">
              BlogNest
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {navItems
                  .filter(item => !item.requiresAuth || (item.requiresAuth && isAuthenticated))
                  .map(item => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                <div className="relative ml-3">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <HiOutlineLogout className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-md text-sm font-medium text-primary-600 border border-primary-600 hover:bg-primary-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-secondary-500 hover:text-secondary-900 focus:outline-none"
            >
              {isOpen ? (
                <HiX className="block h-6 w-6" />
              ) : (
                <HiOutlineMenuAlt3 className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                {navItems
                  .filter(item => !item.requiresAuth || (item.requiresAuth && isAuthenticated))
                  .map(item => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                        location.pathname === item.path
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-secondary-600 hover:text-primary-600 hover:bg-primary-50"
                >
                  <HiOutlineLogout className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Link
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-2 text-center rounded-md text-primary-600 border border-primary-600 hover:bg-primary-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-2 text-center rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}