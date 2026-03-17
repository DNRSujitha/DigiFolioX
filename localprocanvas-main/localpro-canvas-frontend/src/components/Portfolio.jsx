import React, { useState } from 'react';
import { 
  Palette, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Heart,
  Type,
  Check,
  ArrowRight,
  Plus,
  X,
  Eye,
  Sparkles,
  Save,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localprocanvas.onrender.com';

function Portfolio() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    skills: [],
    hobbies: [],
    about: '',
    contactDetails: {
      email: '',
      mobile: ''
    }
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [newHobby, setNewHobby] = useState('');
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  // Simplified templates
  const templates = [
    {
      id: 'modern',
      name: 'Modern Template',
      category: 'Contemporary',
      description: 'Clean, minimal design with modern aesthetics',
      color: 'bg-gradient-to-br from-blue-500 to-purple-600',
      features: ['Responsive', 'Minimal', 'Fast Loading']
    },
    
    {
      id: 'old-aesthetic',
      name: 'Old Aesthetic Template',
      category: 'Classic',
      description: 'Elegant, timeless design with classic typography',
      color: 'bg-gradient-to-br from-amber-700 to-yellow-800',
      features: ['Elegant', 'Professional', 'Traditional']
    }
  ];

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      contactDetails: {
        ...prev.contactDetails,
        [name]: value
      }
    }));
  };

  // Handle skills and hobbies
  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addHobby = () => {
    if (newHobby.trim() && !formData.hobbies.includes(newHobby.trim())) {
      setFormData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, newHobby.trim()]
      }));
      setNewHobby('');
    }
  };

  const removeHobby = (hobby) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(h => h !== hobby)
    }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.about.trim()) newErrors.about = 'About section is required';
    if (formData.skills.length === 0) newErrors.skills = 'Add at least one skill';
    if (!formData.contactDetails.email.trim()) newErrors.email = 'Email is required';
    if (!formData.contactDetails.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!selectedTemplate) newErrors.template = 'Please select a template';

    return newErrors;
  };

  // Generate portfolio
  const generatePortfolio = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsGenerating(true);

    try {
      const token = localStorage.getItem('localpro_token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/portfolios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          template: selectedTemplate.id,
          data: {
            ...formData,
            template_selected: selectedTemplate.id
          }
        })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || payload?.detail || 'Failed to create portfolio');
      }

      const uniqueIdentifier = payload?.data?.unique_identifier;
      if (!uniqueIdentifier) {
        throw new Error('Portfolio created but identifier is missing');
      }

      navigate(`/${selectedTemplate.id}/${uniqueIdentifier}`);
    } catch (error) {
      console.error('Error generating portfolio:', error);
      setErrors((prev) => ({ ...prev, submit: error.message || 'Failed to generate portfolio. Please try again.' }));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LocalPro<span className="text-blue-600">Canvas</span></h1>
                <p className="text-xs text-gray-500 -mt-1">Create Your Portfolio</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm ${currentStep === 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                  1. Choose Template
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${currentStep === 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                  2. Enter Details
                </div>
              </div>
              
              <button
                onClick={generatePortfolio}
                disabled={isGenerating}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Portfolio</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Step 1: Template Selection */}
          {currentStep === 1 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
                <p className="text-gray-600">Select a template that matches your style</p>
              </div>

              {errors.template && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span>{errors.template}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`border-2 rounded-xl overflow-hidden transition-all cursor-pointer hover:shadow-lg ${
                      selectedTemplate?.id === template.id
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className={`h-48 ${template.color} relative`}>
                      {selectedTemplate?.id === template.id && (
                        <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <h3 className="text-xl font-bold text-white">{template.name}</h3>
                        <p className="text-white/80 text-sm">{template.description}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                          {template.category}
                        </span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => selectedTemplate && setCurrentStep(2)}
                  disabled={!selectedTemplate}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: User Details Form */}
          {currentStep === 2 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Details</h2>
                    <p className="text-gray-600">Fill in your information for the portfolio</p>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                  >
                    <ArrowRight className="h-5 w-5 rotate-180" />
                    <span>Back to Templates</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <div className="text-red-600 text-sm mt-1">{errors.name}</div>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="h-4 w-4" />
                      <span>Skills *</span>
                    </label>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Add a skill (press Enter)"
                      />
                      <button
                        onClick={addSkill}
                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                    {errors.skills && (
                      <div className="text-red-600 text-sm mb-2">{errors.skills}</div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full flex items-center space-x-1"
                        >
                          <span>{skill}</span>
                          <button
                            onClick={() => removeSkill(skill)}
                            className="hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hobbies */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Heart className="h-4 w-4" />
                      <span>Hobbies</span>
                    </label>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={newHobby}
                        onChange={(e) => setNewHobby(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addHobby()}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Add a hobby (press Enter)"
                      />
                      <button
                        onClick={addHobby}
                        className="px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.hobbies.map((hobby, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full flex items-center space-x-1"
                        >
                          <span>{hobby}</span>
                          <button
                            onClick={() => removeHobby(hobby)}
                            className="hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Contact & About */}
                <div className="space-y-6">
                  {/* About */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Type className="h-4 w-4" />
                      <span>About Yourself *</span>
                    </label>
                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      placeholder="Tell us about yourself, your experience, and what you do..."
                    />
                    {errors.about && (
                      <div className="text-red-600 text-sm mt-1">{errors.about}</div>
                    )}
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
                    
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail className="h-4 w-4" />
                        <span>Email *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.contactDetails.email}
                        onChange={handleContactChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="hello@example.com"
                      />
                      {errors.email && (
                        <div className="text-red-600 text-sm mt-1">{errors.email}</div>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone className="h-4 w-4" />
                        <span>Mobile Number *</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.contactDetails.mobile}
                        onChange={handleContactChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.mobile && (
                        <div className="text-red-600 text-sm mt-1">{errors.mobile}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Template Preview */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Template</h3>
                {selectedTemplate ? (
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${selectedTemplate.color} rounded-lg`}></div>
                    <div>
                      <h4 className="font-bold text-gray-900">{selectedTemplate.name}</h4>
                      <p className="text-gray-600 text-sm">{selectedTemplate.description}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No template selected</p>
                )}
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={generatePortfolio}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Portfolio...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Generate Portfolio</span>
                    </>
                  )}
                </button>
              </div>
              {errors.submit && (
                <div className="mt-3 text-red-600 text-sm">{errors.submit}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
