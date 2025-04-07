import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

export default function Hero() {
  return (
    <div className="relative bg-white pt-24 pb-16 sm:pt-32 lg:overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-secondary-900 sm:text-6xl">
              Where Ideas <span className="text-primary-600">Flourish</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-secondary-600">
              BlogNest is a platform for writers and readers to connect, share ideas, and explore new perspectives. 
              Join our community today and let your thoughts take flight.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/signup"
                className="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
              >
                Get started
              </Link>
              <Link 
                to="/blogs" 
                className="group flex items-center text-sm font-semibold leading-6 text-primary-600"
              >
                Explore articles
                <HiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full bg-primary-500/10"></div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="A neat workspace with a laptop, coffee and a notebook"
              className="relative mx-auto h-[28rem] w-[28rem] rounded-xl shadow-xl ring-1 ring-secondary-900/10 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 h-64 w-64 rounded-full bg-primary-500/10"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 