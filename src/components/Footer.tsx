import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img
                src="/logo-purple.original.png"
                alt="Nailab"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering Africa's next generation of innovators and entrepreneurs since 2010.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/startups" className="hover:text-teal-400 transition-colors">
                  Startups
                </Link>
              </li>
              <li>
                <Link to="/mentors" className="hover:text-teal-400 transition-colors">
                  Mentors
                </Link>
              </li>
              <li>
                <Link to="/expertise" className="hover:text-teal-400 transition-colors">
                  Our Expertise
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-teal-400 transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-teal-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-teal-400" />
                <a href="mailto:ceo@nailab.co.ke" className="hover:text-teal-400 transition-colors">
                  ceo@nailab.co.ke
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-teal-400" />
                <a href="tel:+254790492467" className="hover:text-teal-400 transition-colors">
                  +254 790 492467
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Nailab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
