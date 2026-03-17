import React from 'react';
import { 
  Palette,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart
} from 'lucide-react';

function Footer() {
  const footerLinks = {
    Product: ['Features', 'Templates', 'Pricing', 'API', 'Documentation'],
    Company: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
    Support: ['Help Center', 'Community', 'Contact', 'Status', 'Security'],
    Legal: ['Privacy', 'Terms', 'Cookie Policy', 'GDPR', 'Compliance']
  };

  const professions = [
    'Photographers', 'Designers', 'Coaches', 'Consultants', 'Artists',
    'Developers', 'Writers', 'Therapists', 'Trainers', 'Chefs'
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">LocalPro<span className="text-blue-400">Canvas</span></h2>
                <p className="text-sm text-gray-400">Digital Portfolio Generator</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering local professionals to showcase their work with beautiful, dynamic digital portfolios.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Professions List */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-white font-semibold mb-4 text-center">Trusted by Professionals Across Industries</h3>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {professions.map((profession) => (
              <span
                key={profession}
                className="px-4 py-2 bg-gray-800 rounded-full text-sm hover:bg-blue-600 transition-colors cursor-pointer"
              >
                {profession}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-blue-400" />
            <span>support@localprocanvas.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-blue-400" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-blue-400" />
            <span>San Francisco, CA</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} LocalPro Canvas. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-4">
            Made with <Heart className="h-3 w-3 inline text-red-500" /> for local professionals worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;