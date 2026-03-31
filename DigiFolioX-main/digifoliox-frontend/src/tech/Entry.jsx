import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Code, Cpu, Home } from 'lucide-react';
import HomePage from './components/HomePage';

const API_BASE_URL = import.meta.env.VITE_DIGIFOLIOX_API_BASE_URL || 'https://localprocanvas.onrender.com';

function Entry() {
  const { uniqueId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // Check localStorage first
        const localKey = `portfolio_${uniqueId}`;
        const localData = localStorage.getItem(localKey);
        if (localData) {
          setPortfolioData(JSON.parse(localData));
          setLoading(false);
          return;
        }

        const token = localStorage.getItem('digifoliox_token');
        let response;
        
        if (token) {
          response = await fetch(`${API_BASE_URL}/portfolios/${uniqueId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        if (!response || !response.ok) {
          response = await fetch(`${API_BASE_URL}/p/${uniqueId}`);
        }

        if (!response.ok) {
          throw new Error('Portfolio not found');
        }

        const data = await response.json();
        const portfolio = data?.data ?? data;
        
        setPortfolioData({
          ...portfolio,
          skills: portfolio.skills || [],
          projects: portfolio.projects || [],
          hobbies: portfolio.hobbies || [],
          certifications: portfolio.certifications || [],
          education: portfolio.education || [],
          experience: portfolio.experience || [],
          contactDetails: portfolio.contactDetails || { email: '', mobile: '' },
          professionalLinks: portfolio.professionalLinks || { github: '', linkedin: '', portfolio: '' },
          profession_metadata: portfolio.profession_metadata || { label: 'Repositories', description: 'List your software and open-source contributions' }
        });
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <Code className="h-8 w-8 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-4 text-gray-400">Loading tech portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Cpu className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Portfolio Not Found</h2>
          <p className="text-gray-400">The portfolio you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleGoHome}
          className="bg-cyan-600 text-white p-3 rounded-full shadow-lg hover:bg-cyan-700 transition-colors"
          title="Go to Home"
        >
          <Home className="h-5 w-5" />
        </button>
      </div>
      <HomePage data={portfolioData} />
    </>
  );
}

export default Entry;