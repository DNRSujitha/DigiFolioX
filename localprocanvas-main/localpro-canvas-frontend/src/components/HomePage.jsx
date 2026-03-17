import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, 
  Briefcase, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Star,
  ChevronRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Download,
  Eye
} from 'lucide-react';
import Footer from './Footer';

function Header({ onSignIn, onGetStarted }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Features', icon: Sparkles },
    { label: 'How It Works', icon: Zap },
    { label: 'Templates', icon: Palette },
    { label: 'Pricing', icon: Briefcase },
    { label: 'Testimonials', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LocalPro<span className="text-blue-600">Canvas</span></h1>
              <p className="text-xs text-gray-500 -mt-1">Digital Portfolio Generator</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onSignIn}
              className="px-4 py-2 text-gray-600 font-medium hover:text-blue-600 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className="flex items-center space-x-2 w-full p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 space-y-3">
                <button
                  onClick={onSignIn}
                  className="w-full py-3 text-gray-600 font-medium border border-gray-200 rounded-lg hover:border-blue-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onGetStarted}
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('localpro_token'));
  const portfolioRoute = '/portfolios';
  const ctaRoute = isLoggedIn ? portfolioRoute : '/register';

  const goToSignIn = () => {
    navigate(isLoggedIn ? portfolioRoute : '/login');
  };

  const goToPrimaryCta = () => {
    navigate(ctaRoute);
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
      description: "Industry-specific designs for local professionals"
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
      content: "LocalPro Canvas transformed how I showcase my work. My client inquiries increased by 300%!",
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
      description: "Select from 50+ industry-specific designs"
    },
    {
      number: "2",
      title: "Customize Your Content",
      description: "Add your projects, services, and contact information"
    },
    {
      number: "3",
      title: "Publish & Share",
      description: "Go live with one click and share your professional portfolio"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header onSignIn={goToSignIn} onGetStarted={goToPrimaryCta} />
   
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-blue-50 text-blue-600 rounded-full">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Trusted by 10,000+ Local Professionals</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Showcase Your Work with a
            <span className="text-blue-600"> Stunning Digital Portfolio</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            LocalPro Canvas helps local professionals create beautiful, dynamic portfolios that attract 
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
              onClick={goToPrimaryCta}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:border-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Eye className="h-5 w-5" />
              <span>View Demo Portfolios</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
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
              Packed with features designed specifically for local professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
      <section className="py-16">
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
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
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

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Professionals Worldwide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what local professionals are saying about LocalPro Canvas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
              Join thousands of local professionals who are growing their business with stunning digital portfolios
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={goToPrimaryCta}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={goToSignIn}
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-colors"
              >
                Schedule a Demo
              </button>
            </div>
            <p className="text-blue-100 text-sm mt-6">
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
