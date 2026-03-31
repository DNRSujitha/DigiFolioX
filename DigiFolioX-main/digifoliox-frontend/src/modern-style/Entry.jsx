import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Home } from 'lucide-react';
import HomePage from './components/HomePage';

const API_BASE_URL = import.meta.env.VITE_DIGIFOLIOX_API_BASE_URL || 'https://localprocanvas.onrender.com';

function Entry() {
  const { uniqueId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // Check localStorage first (for locally generated portfolios)
        const localKey = `portfolio_${uniqueId}`;
        const localData = localStorage.getItem(localKey);
        if (localData) {
          setPortfolioData(JSON.parse(localData));
          setLoading(false);
          return;
        }

        // Try API with token
        const token = localStorage.getItem('digifoliox_token');
        let response;
        
        if (token) {
          response = await fetch(`${API_BASE_URL}/portfolios/${uniqueId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        // Try public endpoint if needed
        if (!response || !response.ok) {
          response = await fetch(`${API_BASE_URL}/p/${uniqueId}`);
        }

        if (!response.ok) {
          console.warn('Portfolio not found');
          setPortfolioData(null);
          return;
        }

        const data = await response.json();
        const portfolio = data?.data ?? data;
        setPortfolioData(portfolio);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setPortfolioData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [uniqueId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h2>
          <p className="text-gray-600">The portfolio you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Ensure all required fields have defaults
  const enrichedData = {
    ...portfolioData,
    skills: portfolioData.skills || [],
    projects: portfolioData.projects || [],
    hobbies: portfolioData.hobbies || [],
    certifications: portfolioData.certifications || [],
    education: portfolioData.education || [],
    experience: portfolioData.experience || [],
    contactDetails: portfolioData.contactDetails || { email: '', mobile: '' },
    professionalLinks: portfolioData.professionalLinks || { github: '', linkedin: '', portfolio: '' },
    profession_metadata: portfolioData.profession_metadata || { label: 'Projects', description: 'Showcase your work and contributions' }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleGoHome}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          title="Go to Home"
        >
          <Home className="h-5 w-5" />
        </button>
      </div>
      <HomePage data={enrichedData} />
    </>
  );
}

export default Entry;