import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sparkles, Home } from 'lucide-react';
import HomePage from './components/HomePage';

const API_BASE_URL = import.meta.env.VITE_DIGIFOLIOX_API_BASE_URL ;

function Entry() {
  const { uniqueId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Creative Template - uniqueId:', uniqueId);
    
    const fetchPortfolioData = async () => {
      try {
        // Check localStorage first
        const localKey = `portfolio_${uniqueId}`;
        const localData = localStorage.getItem(localKey);
        console.log('Checking localStorage key:', localKey);
        console.log('Local data found:', !!localData);
        
        if (localData) {
          const parsedData = JSON.parse(localData);
          console.log('Creative Template - Loaded from localStorage:', parsedData);
          setPortfolioData(parsedData);
          setLoading(false);
          return;
        }

        const token = localStorage.getItem('digifoliox_token');
        console.log('Has token:', !!token);
        
        let response;
        
        if (token) {
          console.log('Fetching from API with token:', `${API_BASE_URL}/portfolios/${uniqueId}`);
          response = await fetch(`${API_BASE_URL}/portfolios/${uniqueId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        if (!response || !response.ok) {
          console.log('Fetching from public endpoint:', `${API_BASE_URL}/p/${uniqueId}`);
          response = await fetch(`${API_BASE_URL}/p/${uniqueId}`);
        }

        console.log('Response status:', response?.status);
        
        if (!response || !response.ok) {
          throw new Error(`Portfolio not found: ${response?.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        const portfolio = data?.data ?? data;
        
        const enrichedData = {
          ...portfolio,
          skills: portfolio.skills || [],
          projects: portfolio.projects || [],
          hobbies: portfolio.hobbies || [],
          certifications: portfolio.certifications || [],
          education: portfolio.education || [],
          experience: portfolio.experience || [],
          contactDetails: portfolio.contactDetails || { email: '', mobile: '' },
          professionalLinks: portfolio.professionalLinks || { github: '', linkedin: '', portfolio: '' },
          profession_metadata: portfolio.profession_metadata || { label: 'Artworks', description: 'Display your creative pieces and exhibitions' }
        };
        
        console.log('Creative Template - Enriched Data:', enrichedData);
        setPortfolioData(enrichedData);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError(err.message);
        setPortfolioData(null);
      } finally {
        setLoading(false);
      }
    };

    if (uniqueId) {
      fetchPortfolioData();
    } else {
      console.error('No uniqueId provided');
      setError('No portfolio ID provided');
      setLoading(false);
    }
  }, [uniqueId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-pink-400 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
            <Sparkles className="h-8 w-8 text-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading creative portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-xl">
          <Sparkles className="h-16 w-16 text-pink-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The portfolio you\'re looking for doesn\'t exist.'}</p>
          <p className="text-sm text-gray-500">Unique ID: {uniqueId}</p>
          <button 
            onClick={() => window.location.href = '/portfolio'}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            Create New Portfolio
          </button>
        </div>
      </div>
    );
  }

  console.log('Rendering Creative Template with data:', portfolioData);
  
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleGoHome}
          className="bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700 transition-colors"
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