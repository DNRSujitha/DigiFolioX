import React from 'react';
import { 
  Heart, 
  ArrowUp, 
  Palette,
  Mail,
  Phone,
  Globe,
  Copyright
} from 'lucide-react';

function Footer({ data }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{data.name}</h2>
                  <p className="text-gray-400 text-sm">Professional Portfolio</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Creating impactful work through dedication, innovation, and expertise. 
                Passionate about delivering exceptional results and making a positive difference.
              </p>
              <div className="flex space-x-4">
                {['🎯', '✨', '🚀', '💡'].map((emoji, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-lg hover:bg-gray-700 transition-colors"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#home" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <a 
                    href={`mailto:${data.contactDetails.email}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {data.contactDetails.email}
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-green-400" />
                  <a 
                    href={`tel:${data.contactDetails.mobile}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {data.contactDetails.mobile}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Skills Showcase */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4 text-center">Core Expertise</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Copyright className="h-4 w-4" />
                <span>{currentYear} {data.name}. All rights reserved.</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <button
                  onClick={scrollToTop}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowUp className="h-4 w-4" />
                  <span>Back to Top</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Made with passion</span>
                </div>
              </div>
            </div>

            {/* Attribution */}
            <div className="mt-6 text-center text-gray-500 text-sm">
              <p>
                Portfolio powered by{' '}
                <span className="text-blue-400">LocalPro Canvas</span> • 
                Modern Template v1.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;