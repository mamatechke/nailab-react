import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo-blue.original.png"
                alt="Nailab"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              Home
            </Link>

            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
                onMouseEnter={() => setOpenDropdown('network')}
              >
                <span>Our Network</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === 'network' && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <a href="/startups" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                    Startups
                  </a>
                  <a href="/mentors" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                    Mentors
                  </a>
                </div>
              )}
            </div>

            <Link to="/programs" className="text-gray-700 hover:text-purple-600 transition-colors">
              Programs
            </Link>

            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
                onMouseEnter={() => setOpenDropdown('resources')}
              >
                <span>Resources</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === 'resources' && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <a href="/blogs" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                    Blogs
                  </a>
                  <a href="/knowledge-hub" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                    Knowledge Hub
                  </a>
                  <a href="/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                    Opportunities
                  </a>
                  <a href="/events" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                    Events & Webinars
                  </a>
                </div>
              )}
            </div>

            <a href="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors">
              Pricing
            </a>

            <a
              href="/login"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Login
            </a>
          </div>

          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <Link to="/" className="block text-gray-700 hover:text-purple-600 transition-colors">
              Home
            </Link>

            <div>
              <button
                className="flex items-center justify-between w-full text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => toggleDropdown('network')}
              >
                <span>Our Network</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'network' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'network' && (
                <div className="pl-4 mt-2 space-y-2">
                  <a href="/startups" className="block text-gray-600 hover:text-purple-600 transition-colors">
                    Startups
                  </a>
                  <a href="/mentors" className="block text-gray-600 hover:text-purple-600 transition-colors">
                    Mentors
                  </a>
                </div>
              )}
            </div>

            <Link to="/programs" className="block text-gray-700 hover:text-purple-600 transition-colors">
              Programs
            </Link>

            <div>
              <button
                className="flex items-center justify-between w-full text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => toggleDropdown('resources')}
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'resources' && (
                <div className="pl-4 mt-2 space-y-2">
                  <a href="/blogs" className="block text-gray-600 hover:text-purple-600 transition-colors">
                    Blogs
                  </a>
                  <a href="/knowledge-hub" className="block text-gray-600 hover:text-purple-600 transition-colors">
                    Knowledge Hub
                  </a>
                  <a href="/opportunities" className="block text-gray-600 hover:text-purple-600 transition-colors">
                    Opportunities
                  </a>
                  <a href="/events" className="block text-gray-600 hover:text-purple-600 transition-colors">
                    Events & Webinars
                  </a>
                </div>
              )}
            </div>

            <a href="/pricing" className="block text-gray-700 hover:text-purple-600 transition-colors">
              Pricing
            </a>

            <a
              href="/login"
              className="block text-center bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
