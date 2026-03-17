import React from 'react';
import { 
  ArrowDown, 
  Sparkles, 
  Award, 
  TrendingUp,
  ExternalLink,
  Download,
  Mail
} from 'lucide-react';

function HomePage({ data }) {
  const handleDownloadResume = () => {
    // In real app, generate and download resume
    const resumeData = `
      ${data.name}
      ${data.contactDetails.email}
      ${data.contactDetails.mobile}
      
      Skills: ${data.skills.join(', ')}
      Hobbies: ${data.hobbies.join(', ')}
      
      About:
      ${data.about}
    `;
    
    const blob = new Blob([resumeData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, '-').toLowerCase()}-resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Professional Portfolio</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {data.name}
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-6">
                  {data.about.split('.')[0]}.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {data.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {data.skills.length}+
                  </div>
                  <div className="text-gray-600 text-sm">Skills</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {data.hobbies.length}+
                  </div>
                  <div className="text-gray-600 text-sm">Hobbies</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-gray-600 text-sm">Expert</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Get In Touch</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDownloadResume}
                  className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                {/* Profile Card */}
                <div className="text-center mb-8">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <div className="w-full h-full bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {data.name.charAt(0)}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.name}</h3>
                  <p className="text-gray-600 mb-4">Professional Portfolio</p>
                </div>

                {/* Contact Info Card */}
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium text-gray-900">{data.contactDetails.email}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium text-gray-900">{data.contactDetails.mobile}</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Skills Preview */}
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                    <div className="text-sm mb-2">Top Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 text-center">
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex flex-col items-center text-gray-400 hover:text-blue-600 transition-colors"
            >
              <span className="text-sm mb-2">Explore More</span>
              <ArrowDown className="h-6 w-6 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
