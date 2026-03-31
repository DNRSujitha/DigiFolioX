import React, { useState } from 'react';
import { 
  UserPlus, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone,
  Briefcase,
  Check,
  AlertCircle,
  ArrowLeft,
  Palette,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_DIGIFOLIOX_API_BASE_URL || 'https://localprocanvas.onrender.com';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    profession: '',
    acceptTerms: false,
    newsletter: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProfession, setSelectedProfession] = useState('');

  const professions = [
    { id: 'photographer', name: 'Photographer', icon: '📸' },
    { id: 'designer', name: 'Designer', icon: '🎨' },
    { id: 'developer', name: 'Developer', icon: '💻' },
    { id: 'writer', name: 'Writer', icon: '✍️' },
    { id: 'consultant', name: 'Consultant', icon: '💼' },
    { id: 'coach', name: 'Coach', icon: '🏋️' },
    { id: 'artist', name: 'Artist', icon: '🖼️' },
    { id: 'therapist', name: 'Therapist', icon: '🧠' },
    { id: 'chef', name: 'Chef', icon: '👨‍🍳' },
    { id: 'trainer', name: 'Fitness Trainer', icon: '💪' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfessionSelect = (profession) => {
    setSelectedProfession(profession);
    setFormData(prev => ({ ...prev, profession }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    if (!selectedProfession) newErrors.profession = 'Please select your profession';

    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Must contain at least one number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    return newErrors;
  };

  const nextStep = () => {
    const stepErrors = validateStep1();
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(2);
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const step2Errors = validateStep2();
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      setIsLoading(false);
      return;
    }

    try {
      const registerResponse = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.fullName,
          username: formData.fullName.toLowerCase().replace(/\s+/g, "")
        })
      });

      const registerPayload = await registerResponse.json();
      if (!registerResponse.ok) {
        throw new Error(registerPayload?.message || registerPayload?.detail || 'Registration failed');
      }

      const loginResponse = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const loginPayload = await loginResponse.json();
      if (!loginResponse.ok) {
        throw new Error(loginPayload?.message || loginPayload?.detail || 'Login failed after registration');
      }

      localStorage.setItem('digifoliox_token', loginPayload.access_token);
      localStorage.setItem('digifoliox_user_id', loginPayload.user_id);
      localStorage.setItem('digifoliox_user_email', formData.email);
      localStorage.setItem('digifoliox_profession', formData.profession);
      navigate('/portfolios');
    } catch (error) {
      setErrors((prev) => ({ ...prev, submit: error.message || 'Registration failed' }));
    } finally {
      setIsLoading(false);
    }
  };

  const progressSteps = [
    { number: 1, title: 'Personal Info', active: currentStep >= 1 },
    { number: 2, title: 'Security', active: currentStep >= 2 },
    { number: 3, title: 'Complete', active: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Digi<span className="text-blue-600">FolioX</span></h1>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Already have an account?
              </Link>
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex justify-between items-center">
            {progressSteps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold
                    ${step.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
                    ${step.number === currentStep ? 'ring-4 ring-blue-200' : ''}
                  `}>
                    {step.active ? <Check className="h-6 w-6" /> : step.number}
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-600">{step.title}</span>
                </div>
                {index < progressSteps.length - 1 && (
                  <div className={`flex-1 h-1 ${step.active ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <UserPlus className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Create Your Account</h1>
                  <p className="text-blue-100">Start building your professional portfolio in minutes</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              {currentStep === 1 ? (
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                        errors.fullName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.fullName}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4" />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Profession Selection */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                      <Briefcase className="h-4 w-4" />
                      <span>Select Your Profession</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {professions.map((prof) => (
                        <button
                          key={prof.id}
                          type="button"
                          onClick={() => handleProfessionSelect(prof.name)}
                          className={`p-4 border rounded-lg text-center transition-all ${
                            selectedProfession === prof.name
                              ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                          }`}
                        >
                          <div className="text-2xl mb-2">{prof.icon}</div>
                          <div className="text-sm font-medium text-gray-700">{prof.name}</div>
                        </button>
                      ))}
                    </div>
                    {errors.profession && (
                      <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.profession}</span>
                      </div>
                    )}
                  </div>

                  {/* Newsletter */}
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      Yes, I want to receive updates, tips, and exclusive offers from DigiFolioX
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Continue to Security</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Password */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Lock className="h-4 w-4" />
                      <span>Create Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-12 ${
                          errors.password ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.password}</span>
                      </div>
                    )}
                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Check className={`h-4 w-4 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                        <span>At least 8 characters</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Check className={`h-4 w-4 ${/(?=.*[A-Z])/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                        <span>One uppercase letter</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Check className={`h-4 w-4 ${/(?=.*\d)/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                        <span>One number</span>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Lock className="h-4 w-4" />
                      <span>Confirm Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-12 ${
                          errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.confirmPassword}</span>
                      </div>
                    )}
                  </div>

                  {/* Terms & Conditions */}
                  <div>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                    {errors.acceptTerms && (
                      <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.acceptTerms}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 ${
                        isLoading ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5" />
                          <span>Create Account & Continue</span>
                        </>
                      )}
                    </button>
                  </div>

                  {errors.submit && (
                    <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.submit}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Login Link */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
