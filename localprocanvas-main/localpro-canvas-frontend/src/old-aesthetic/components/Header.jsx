import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Mail, 
  Briefcase,
  BookOpen,
  Phone
} from 'lucide-react';

function Header({ data }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'expertise', label: 'Expertise', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-gold-light/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name - Classic Typography */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gold-light rounded-full flex items-center justify-center">
              <div className="text-2xl font-serif text-brown-dark">
                {data.name.charAt(0)}
              </div>
            </div>
            <div className="border-l border-gold-light/30 pl-4">
              <h1 className="text-2xl font-serif font-bold text-brown-dark tracking-wider">
                {data.name}
              </h1>
              <p className="text-xs text-brown-medium font-medium tracking-widest uppercase">
                ESTABLISHED PROFESSIONAL
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Classic Style */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center space-x-2 px-5 py-3 text-brown-medium hover:text-brown-dark transition-all duration-300 relative"
                >
                  <div className="absolute inset-0 bg-gold-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"></div>
                  <Icon className="h-4 w-4 relative z-10" />
                  <span className="font-serif tracking-wider relative z-10">{item.label}</span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </button>
              );
            })}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="group px-6 py-3 border border-brown-medium text-brown-medium hover:bg-brown-dark hover:text-cream transition-all duration-300 flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span className="font-serif tracking-wider">CONTACT</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 text-brown-dark hover:bg-gold-light/10 rounded-sm transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-6 animate-fadeIn">
            <div className="bg-cream border border-gold-light/20 shadow-lg p-6">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center space-x-4 w-full p-4 text-brown-medium hover:text-brown-dark hover:bg-gold-light/10 border-b border-gold-light/10 last:border-b-0 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-serif tracking-wider text-lg">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Quick Contact Info */}
              <div className="mt-8 pt-6 border-t border-gold-light/20">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-brown-medium" />
                    <span className="text-brown-medium font-serif">{data.contactDetails.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-4 w-4 text-brown-medium" />
                    <span className="text-brown-medium font-serif">
                      {data.skills.slice(0, 2).join(' & ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;