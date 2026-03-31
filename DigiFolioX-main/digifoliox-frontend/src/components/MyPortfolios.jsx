import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderOpen, 
  Globe, 
  Lock, 
  Trash2, 
  Copy, 
  Check,
  Eye,
  Share2,
  AlertCircle
} from 'lucide-react';
import AuthenticatedHeader from './AuthenticatedHeader';

const API_BASE_URL = import.meta.env.VITE_DIGIFOLIOX_API_BASE_URL || 'https://localprocanvas.onrender.com';

function MyPortfolios() {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const token = localStorage.getItem('digifoliox_token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/portfolios`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch portfolios');
      }

      const data = await response.json();
      setPortfolios(data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const publishPortfolio = async (uniqueIdentifier) => {
    try {
      const token = localStorage.getItem('digifoliox_token');
      const response = await fetch(`${API_BASE_URL}/portfolios/${uniqueIdentifier}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_published: true })
      });

      if (response.ok) {
        fetchPortfolios(); // Refresh list
        alert('Portfolio published successfully! Share it with others.');
      } else {
        throw new Error('Failed to publish');
      }
    } catch (error) {
      console.error('Error publishing:', error);
      alert('Failed to publish portfolio');
    }
  };

  const unpublishPortfolio = async (uniqueIdentifier) => {
    try {
      const token = localStorage.getItem('digifoliox_token');
      const response = await fetch(`${API_BASE_URL}/portfolios/${uniqueIdentifier}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_published: false })
      });

      if (response.ok) {
        fetchPortfolios(); // Refresh list
        alert('Portfolio is now private.');
      } else {
        throw new Error('Failed to unpublish');
      }
    } catch (error) {
      console.error('Error unpublishing:', error);
      alert('Failed to unpublish portfolio');
    }
  };

  const deletePortfolio = async (uniqueIdentifier) => {
    if (!window.confirm('Are you sure you want to delete this portfolio? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('digifoliox_token');
      const response = await fetch(`${API_BASE_URL}/portfolios/${uniqueIdentifier}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchPortfolios(); // Refresh list
        alert('Portfolio deleted successfully');
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Failed to delete portfolio');
    }
  };

  const copyShareableLink = (uniqueIdentifier) => {
    const url = `${window.location.origin}/p/${uniqueIdentifier}`;
    navigator.clipboard.writeText(url);
    setCopiedId(uniqueIdentifier);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const viewPortfolio = (template, uniqueIdentifier) => {
    navigate(`/${template}/${uniqueIdentifier}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('digifoliox_token');
    localStorage.removeItem('digifoliox_user_id');
    localStorage.removeItem('digifoliox_user_email');
    localStorage.removeItem('digifoliox_profession');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AuthenticatedHeader onLogout={handleLogout} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your portfolios...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthenticatedHeader onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Portfolios</h1>
          <button
            onClick={() => navigate('/portfolio')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <FolderOpen className="h-4 w-4" />
            <span>Create New Portfolio</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        {portfolios.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolios yet</h3>
            <p className="text-gray-500 mb-6">Create your first portfolio to get started!</p>
            <button
              onClick={() => navigate('/portfolio')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Portfolio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolios.map((portfolio) => (
              <div key={portfolio.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {portfolio.data.name}
                    </h3>
                    {portfolio.is_published ? (
                      <span className="flex items-center text-green-600 text-sm bg-green-50 px-3 py-1 rounded-full">
                        <Globe className="h-3 w-3 mr-1" /> Published
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
                        <Lock className="h-3 w-3 mr-1" /> Private
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-3">
                    Template: {portfolio.template} • Created: {new Date(portfolio.created_at).toLocaleDateString()}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {portfolio.data.skills?.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {typeof skill === 'object' ? skill.name : skill}
                      </span>
                    ))}
                    {portfolio.data.skills?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{portfolio.data.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => viewPortfolio(portfolio.template, portfolio.unique_identifier)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    
                    {!portfolio.is_published ? (
                      <button
                        onClick={() => publishPortfolio(portfolio.unique_identifier)}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center justify-center space-x-2"
                      >
                        <Globe className="h-4 w-4" />
                        <span>Publish</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => copyShareableLink(portfolio.unique_identifier)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center space-x-2"
                        >
                          {copiedId === portfolio.unique_identifier ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                          <span>{copiedId === portfolio.unique_identifier ? 'Copied!' : 'Copy Link'}</span>
                        </button>
                        <button
                          onClick={() => unpublishPortfolio(portfolio.unique_identifier)}
                          className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm flex items-center space-x-2"
                        >
                          <Lock className="h-4 w-4" />
                          <span>Make Private</span>
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={() => deletePortfolio(portfolio.unique_identifier)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>

                  {portfolio.is_published && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700 mb-2">Shareable Link:</p>
                      <code className="text-xs text-blue-600 break-all">
                        {window.location.origin}/p/{portfolio.unique_identifier}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPortfolios;