import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, 
  Users, 
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Star,
  ChevronRight,
  Eye,
  CheckCircle
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('digifoliox_token'));
  const portfolioRoute = '/portfolio';
  const ctaRoute = isLoggedIn ? portfolioRoute : '/register';

  const goToSignIn = () => {
    navigate(isLoggedIn ? portfolioRoute : '/login');
  };

  const goToPrimaryCta = () => {
    navigate(ctaRoute);
  };

  const handleLogout = () => {
    localStorage.removeItem('digifoliox_token');
    localStorage.removeItem('digifoliox_user_id');
    localStorage.removeItem('digifoliox_user_email');
    localStorage.removeItem('digifoliox_profession');
    navigate('/login');
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Design",
      description: "Smart templates that adapt to your profession and style"
    },
    {
      icon: Shield,
      title: "Professional Templates",
      description: "Industry-specific designs for professionals"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Edit and see changes instantly on your portfolio"
    },
    {
      icon: Users,
      title: "Client Integration",
      description: "Showcase testimonials and completed projects"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      profession: "Interior Designer",
      content: "DigiFolioX transformed how I showcase my work. My client inquiries increased by 300%!",
      rating: 5
    },
    {
      name: "Michael Chen",
      profession: "Photographer",
      content: "The templates are stunning and saved me countless hours of design work.",
      rating: 5
    },
    {
      name: "Emma Wilson",
      profession: "Fitness Coach",
      content: "My portfolio now looks professional and helps me stand out from competitors.",
      rating: 5
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Choose Your Template",
      description: "Select from 4 industry-specific designs"
    },
    {
      number: "2",
      title: "Customize Your Content",
      description: "Add your projects, skills, and contact information"
    },
    {
      number: "3",
      title: "Publish & Share",
      description: "Go live with one click and share your professional portfolio"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header onSignIn={goToSignIn} onGetStarted={goToPrimaryCta} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
   
      {/* Hero Section */}
      <section id="features" className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-blue-50 text-blue-600 rounded-full">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Trusted by Many Professionals</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Showcase Your Work with a
            <span className="text-blue-600"> Stunning Digital Portfolio</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            DigiFolioX helps professionals create beautiful, dynamic portfolios that attract 
            more clients and showcase their expertise effectively.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={goToPrimaryCta}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Create Your Portfolio Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:border-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Eye className="h-5 w-5" />
              <span>View Templates</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-gray-600">Professional Templates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Portfolios</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Packed with features designed specifically for professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-blue-50 rounded-lg inline-block mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Create Your Portfolio in 3 Easy Steps
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get your professional portfolio up and running in minutes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-blue-100 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ChevronRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Template
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional designs tailored for every industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Modern", desc: "Clean, minimal design", color: "from-blue-500 to-purple-600" },
              { name: "Old Aesthetic", desc: "Elegant, timeless style", color: "from-amber-700 to-yellow-800" },
              { name: "Creative", desc: "Bold, artistic layout", color: "from-pink-500 to-orange-500" },
              { name: "Tech", desc: "Modern developer style", color: "from-green-500 to-teal-500" }
            ].map((template, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className={`h-32 bg-gradient-to-r ${template.color}`}></div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm">{template.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Professionals Worldwide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what professionals are saying about DigiFolioX
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-blue-600">{testimonial.profession}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Professional Presence?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are growing their business with stunning digital portfolios
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={goToPrimaryCta}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Create Your Portfolio</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={goToSignIn}
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-colors"
              >
                Sign In
              </button>
            </div>
            <p className="text-blue-100 text-sm mt-6">
              Free to get started • No credit card required
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;