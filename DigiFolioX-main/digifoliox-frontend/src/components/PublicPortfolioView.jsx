import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Calendar, User, Briefcase, Heart } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_DIGIFOLIOX_API_BASE_URL || 'https://localprocanvas.onrender.com';

// Import all template components for public viewing
import ModernEntry from '../modern-style/Entry';
import OldAestheticEntry from '../old-aesthetic/Entry';
import CreativeEntry from '../creative/Entry';
import TechEntry from '../tech/Entry';

function PublicPortfolioView() {
  const { uniqueId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicPortfolio = async () => {
      try {
        // First check localStorage (for locally generated portfolios)
        const localKey = `portfolio_${uniqueId}`;
        const localData = localStorage.getItem(localKey);
        if (localData) {
          setPortfolioData(JSON.parse(localData));
          setLoading(false);
          return;
        }

        // Fetch from API public endpoint
        const response = await fetch(`${API_BASE_URL}/p/${uniqueId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Portfolio not found or not published');
          }
          throw new Error('Failed to load portfolio');
        }

        const data = await response.json();
        setPortfolioData(data);
      } catch (err) {
        console.error('Error fetching public portfolio:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (uniqueId) {
      fetchPublicPortfolio();
    }
  }, [uniqueId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-4 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-4 text-center">
          <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Available</h2>
          <p className="text-gray-600 mb-6">This portfolio is either private or doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  // Render the appropriate template based on the template field
  const renderTemplate = () => {
    const template = portfolioData.template || portfolioData.template_selected;
    
    switch (template) {
      case 'modern':
        return <ModernEntry portfolioData={portfolioData.data} />;
      case 'old-aesthetic':
        return <OldAestheticEntry portfolioData={portfolioData.data} />;
      case 'creative':
        return <CreativeEntry portfolioData={portfolioData.data} />;
      case 'tech':
        return <TechEntry portfolioData={portfolioData.data} />;
      default:
        return <ModernEntry portfolioData={portfolioData.data} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Public View Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4">
        <div className="container mx-auto text-center text-sm">
          <span>This is a public portfolio view. </span>
          <Link to="/" className="underline hover:text-blue-200">
            Create your own portfolio with DigiFolioX
          </Link>
        </div>
      </div>
      
      {renderTemplate()}
      
      {/* Footer Note */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Powered by <span className="text-blue-600 font-semibold">DigiFolioX</span> — Create your professional portfolio today
          </p>
          <div className="flex items-center justify-center space-x-2 mt-2 text-gray-400 text-xs">
            <Heart className="h-3 w-3 text-red-500" />
            <span>Made for professionals worldwide</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicPortfolioView;