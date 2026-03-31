import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Palette, 
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  Menu,
  X,
  LogOut
} from 'lucide-react';

function Header({ onSignIn, onGetStarted, isLoggedIn, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Features', icon: Sparkles, link: '#features' },
    { label: 'How It Works', icon: Zap, link: '#how-it-works' },
    { label: 'Templates', icon: Palette, link: '#templates' },
    { label: 'Testimonials', icon: Users, link: '#testimonials' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Digi<span className="text-blue-600">FolioX</span></h1>
              <p className="text-xs text-gray-500 -mt-1">Digital Portfolio Generator</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.link.substring(1))}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/my-portfolios"
                  className="px-4 py-2 text-gray-600 font-medium hover:text-blue-600 transition-colors"
                >
                  My Portfolios
                </Link>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-gray-600 font-medium hover:text-red-600 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={onSignIn}
                className="px-4 py-2 text-gray-600 font-medium hover:text-blue-600 transition-colors"
              >
                Sign In
              </button>
            )}
            <button
              onClick={onGetStarted}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.link.substring(1))}
                    className="flex items-center space-x-2 w-full p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 space-y-3">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/my-portfolios"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 w-full p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Users className="h-5 w-5" />
                      <span>My Portfolios</span>
                    </Link>
                    <button
                      onClick={onLogout}
                      className="w-full py-3 text-gray-600 font-medium border border-gray-200 rounded-lg hover:border-red-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onSignIn}
                    className="w-full py-3 text-gray-600 font-medium border border-gray-200 rounded-lg hover:border-blue-600 transition-colors"
                  >
                    Sign In
                  </button>
                )}
                <button
                  onClick={onGetStarted}
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;