import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Loader2, 
  Clock,
  Shield,
  Award,
  BookOpen,
  Feather
} from 'lucide-react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import About from './components/About';
import Contactus from './components/Contactus';
import Footer from './components/Footer';

// Add custom CSS for old aesthetic theme
const oldAestheticStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
  
  .old-aesthetic {
    --cream: #faf4e5;
    --gold-light: #e6d5b8;
    --gold: #c4a65a;
    --brown-light: #8b7355;
    --brown-medium: #5d4c3c;
    --brown-dark: #3a2c1e;
    --brown-darker: #2a1f14;
  }
  
  .old-aesthetic * {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  }
  
  .old-aesthetic .font-serif {
    font-family: 'Cormorant Garamond', serif;
  }
  
  .old-aesthetic .font-display {
    font-family: 'Playfair Display', serif;
  }
  
  .old-aesthetic .bg-cream {
    background-color: var(--cream);
  }
  
  .old-aesthetic .text-cream {
    color: var(--cream);
  }
  
  .old-aesthetic .bg-gold-light {
    background-color: var(--gold-light);
  }
  
  .old-aesthetic .text-gold-light {
    color: var(--gold-light);
  }
  
  .old-aesthetic .bg-gold {
    background-color: var(--gold);
  }
  
  .old-aesthetic .text-gold {
    color: var(--gold);
  }
  
  .old-aesthetic .border-gold {
    border-color: var(--gold);
  }
  
  .old-aesthetic .border-gold-light {
    border-color: var(--gold-light);
  }
  
  .old-aesthetic .bg-brown-light {
    background-color: var(--brown-light);
  }
  
  .old-aesthetic .text-brown-light {
    color: var(--brown-light);
  }
  
  .old-aesthetic .bg-brown-medium {
    background-color: var(--brown-medium);
  }
  
  .old-aesthetic .text-brown-medium {
    color: var(--brown-medium);
  }
  
  .old-aesthetic .bg-brown-dark {
    background-color: var(--brown-dark);
  }
  
  .old-aesthetic .text-brown-dark {
    color: var(--brown-dark);
  }
  
  .old-aesthetic .bg-brown-darker {
    background-color: var(--brown-darker);
  }
  
  .old-aesthetic .text-brown-darker {
    color: var(--brown-darker);
  }
  
  .old-aesthetic .border-brown-light {
    border-color: var(--brown-light);
  }
  
  .old-aesthetic .border-brown-dark {
    border-color: var(--brown-dark);
  }
  
  /* Custom animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .old-aesthetic .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
  
  /* Decorative borders */
  .old-aesthetic .border-gold-gradient {
    border-image: linear-gradient(to right, var(--gold-light), var(--gold), var(--gold-light)) 1;
  }
  
  /* Classic shadows */
  .old-aesthetic .shadow-vintage {
    box-shadow: 0 4px 20px rgba(58, 44, 30, 0.1);
  }
  
  .old-aesthetic .shadow-vintage-lg {
    box-shadow: 0 10px 40px rgba(58, 44, 30, 0.15);
  }
`;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localprocanvas.onrender.com';

function Entry() {
  const { uniqueId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Add old aesthetic styles to document
    const styleElement = document.createElement('style');
    styleElement.innerHTML = oldAestheticStyles;
    document.head.appendChild(styleElement);

    // Fetch portfolio data
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        
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
          throw new Error('Portfolio not found');
        }

        const payload = await response.json();
        const data = payload?.data ?? payload;
        
        // Validate data structure
        if (!data.name || !data.skills || !data.hobbies || !data.about || !data.contactDetails) {
          throw new Error('Invalid portfolio data structure');
        }
        
        setPortfolioData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError(err.message || 'Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();

    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [uniqueId]);

  if (loading) {
    return (
      <div className="old-aesthetic min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-brown-light border-t-gold rounded-full animate-spin mx-auto mb-8"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Award className="h-12 w-12 text-gold animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-serif font-bold text-brown-dark mb-4">Loading Portfolio</h2>
          <p className="text-brown-medium font-serif">Preparing your professional presentation...</p>
          <div className="mt-8 flex items-center justify-center space-x-4 text-brown-light">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Please wait</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="old-aesthetic min-h-screen bg-cream flex items-center justify-center">
        <div className="bg-white border border-brown-light p-12 text-center max-w-2xl mx-4 shadow-vintage">
          <div className="w-20 h-20 mx-auto mb-8 bg-rose-50 rounded-full flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-rose-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-brown-dark mb-4">Portfolio Not Found</h2>
          <p className="text-brown-medium text-lg mb-8 leading-relaxed">
            The portfolio you're looking for doesn't exist or has been archived.
          </p>
          <div className="space-y-6">
            <div className="p-6 bg-cream border border-gold-light">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Shield className="h-5 w-5 text-gold" />
                <span className="font-serif text-brown-medium">Possible Reasons</span>
              </div>
              <ul className="text-brown-light space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>The portfolio URL may be incorrect</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>The portfolio may have been moved</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Access permissions may have changed</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-8 border-t border-gold-light">
              <a 
                href="/portfolio"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-brown-dark text-cream font-serif tracking-wider hover:bg-brown-darker transition-colors"
              >
                <Feather className="h-5 w-5" />
                <span>Create New Portfolio</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="old-aesthetic min-h-screen bg-cream">
      {/* Portfolio Metadata */}
      <div className="hidden">
        <title>{portfolioData.name} | Professional Portfolio</title>
        <meta name="description" content={portfolioData.about.substring(0, 160)} />
        <meta name="keywords" content={portfolioData.skills.join(', ')} />
        <meta name="author" content={portfolioData.name} />
      </div>

      {/* Main Content */}
      <Header data={portfolioData} />
      <main>
        <HomePage data={portfolioData} />
        <About data={portfolioData} />
        <Contactus data={portfolioData} />
      </main>
      <Footer data={portfolioData} />

      {/* Portfolio Info Toast */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-brown-dark/95 text-cream p-4 rounded-sm border border-gold/30 shadow-vintage-lg animate-fadeIn">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gold/20 rounded-sm">
              <Award className="h-4 w-4 text-gold" />
            </div>
            <div className="text-sm">
              <div className="font-serif">{portfolioData.name}</div>
              <div className="text-cream/70 text-xs">Classic Portfolio • LocalPro Canvas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Entry;
