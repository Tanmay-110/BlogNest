import { Link } from 'react-router-dom';
import { FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blogs' },
      { name: 'Write', href: '/publish' },
      { name: 'Sign In', href: '/signin' },
      { name: 'Sign Up', href: '/signup' },
    ],
    social: [
      {
        name: 'Twitter',
        href: '#',
        icon: FiTwitter,
      },
      {
        name: 'GitHub',
        href: '#',
        icon: FiGithub,
      },
      {
        name: 'LinkedIn',
        href: '#',
        icon: FiLinkedin,
      },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link to={item.href} className="text-sm leading-6 text-secondary-600 hover:text-primary-600 transition-colors">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-secondary-500 hover:text-primary-600 transition-colors">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-secondary-500">
          &copy; {currentYear} BlogNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 