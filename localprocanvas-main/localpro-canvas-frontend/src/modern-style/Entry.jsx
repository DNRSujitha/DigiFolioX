// templates/modern/Entry.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import About from './components/About';
import Contactus from './components/Contactus';
import Footer from './components/Footer';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localprocanvas.onrender.com';

function Entry() {
  const { uniqueId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const token = localStorage.getItem('localpro_token');
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
          setPortfolioData(null);
          return;
        }

        const data = await response.json();
        setPortfolioData(data?.data ?? data);
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

  return (
    <div className="min-h-screen bg-white">
      <Header data={portfolioData} />
      <main>
        <HomePage data={portfolioData} />
        <About data={portfolioData} />
        <Contactus data={portfolioData} />
      </main>
      <Footer data={portfolioData} />
    </div>
  );
}

export default Entry;
