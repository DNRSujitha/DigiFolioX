import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Palette, 
  LogOut, 
  FolderOpen,
  User,
  Menu,
  X
} from 'lucide-react';

function AuthenticatedHeader({ onLogout }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('digifoliox_token');
    localStorage.removeItem('digifoliox_user_id');
    localStorage.removeItem('digifoliox_user_email');
    localStorage.removeItem('digifoliox_profession');
    if (onLogout) onLogout();
    navigate('/login');
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
              <h1 className="text-xl font-bold text-gray-900">Digi<span className="text-blue-600">FolioX</span></h1>
              <p className="text-xs text-gray-500 -mt-1">Digital Portfolio Generator</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/portfolio" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <FolderOpen className="h-4 w-4" />
              <span>Create Portfolio</span>
            </Link>
            <Link to="/my-portfolios" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>My Portfolios</span>
            </Link>
          </nav>

          {/* Logout Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
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
            <div className="space-y-3">
              <Link
                to="/portfolio"
                className="flex items-center space-x-2 w-full p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <FolderOpen className="h-5 w-5" />
                <span>Create Portfolio</span>
              </Link>
              <Link
                to="/my-portfolios"
                className="flex items-center space-x-2 w-full p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>My Portfolios</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default AuthenticatedHeader;