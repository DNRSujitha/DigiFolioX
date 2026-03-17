import React from 'react';
import { 
  ArrowDown, 
  Award, 
  BookOpen,
  Clock,
  Coffee,
  Download,
  Feather,
  Globe,
  Medal,
  Mail
} from 'lucide-react';

function HomePage({ data }) {
  const handleDownloadResume = () => {
    const resumeData = `
      ${"=".repeat(60)}
      ${data.name.toUpperCase()}
      ${"=".repeat(60)}
      
      Contact Information:
      Email: ${data.contactDetails.email}
      Phone: ${data.contactDetails.mobile}
      
      Professional Summary:
      ${data.about}
      
      Skills:
      ${data.skills.map(skill => `  • ${skill}`).join('\n')}
      
      Personal Interests:
      ${data.hobbies.map(hobby => `  • ${hobby}`).join('\n')}
      
      ${"=".repeat(60)}
      Generated via LocalPro Canvas • Classic Portfolio
      ${"=".repeat(60)}
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
    <section id="home" className="min-h-screen bg-cream">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-12">
              {/* Introduction */}
              <div className="relative pl-8 border-l-2 border-gold-light">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-gold-light rounded-full"></div>
                <div className="absolute -left-2 bottom-0 w-4 h-4 bg-gold-light rounded-full"></div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-serif text-brown-medium uppercase tracking-widest mb-4">
                    ESTABLISHED PROFESSIONAL
                  </h2>
                  <h1 className="text-5xl md:text-6xl font-serif font-bold text-brown-dark leading-tight mb-6">
                    {data.name}
                  </h1>
                  <p className="text-xl text-brown-medium leading-relaxed italic">
                    "{data.about.split('.')[0]}."
                  </p>
                </div>
              </div>

              {/* Key Skills */}
              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-brown-dark border-b border-gold-light/30 pb-2">
                  Areas of Expertise
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.skills.slice(0, 4).map((skill, index) => (
                    <div key={index} className="flex items-center space-x-3 group">
                      <div className="w-2 h-2 bg-gold-light rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="font-serif text-brown-medium group-hover:text-brown-dark transition-colors">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Classic Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/50 border border-gold-light/20 rounded-sm">
                  <div className="text-3xl font-serif font-bold text-brown-dark mb-2">
                    {data.skills.length}
                  </div>
                  <div className="text-sm text-brown-medium uppercase tracking-widest">Skills</div>
                </div>
                <div className="text-center p-6 bg-white/50 border border-gold-light/20 rounded-sm">
                  <div className="text-3xl font-serif font-bold text-brown-dark mb-2">
                    {data.hobbies.length}
                  </div>
                  <div className="text-sm text-brown-medium uppercase tracking-widest">Interests</div>
                </div>
                <div className="text-center p-6 bg-white/50 border border-gold-light/20 rounded-sm">
                  <Award className="h-8 w-8 text-gold mx-auto mb-2" />
                  <div className="text-sm text-brown-medium uppercase tracking-widest">Expert</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-brown-dark text-cream font-serif tracking-wider hover:bg-brown-darker transition-colors duration-300 border border-brown-dark flex items-center justify-center space-x-3"
                >
                  <span>INITIATE CONTACT</span>
                  <Feather className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDownloadResume}
                  className="px-8 py-4 bg-transparent text-brown-dark font-serif tracking-wider border border-brown-dark hover:bg-brown-dark hover:text-cream transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <Download className="h-4 w-4" />
                  <span>CURRICULUM VITAE</span>
                </button>
              </div>
            </div>

            {/* Right Column - Portrait & Details */}
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-light/20 to-gold/10 border-2 border-gold-light transform rotate-3"></div>
              
              <div className="relative bg-white border-2 border-brown-light shadow-2xl p-10">
                {/* Portrait Area */}
                <div className="mb-10">
                  <div className="w-64 h-64 mx-auto relative">
                    {/* Decorative Border */}
                    <div className="absolute inset-0 border-4 border-gold rounded-full"></div>
                    <div className="absolute inset-4 border-2 border-brown-light rounded-full"></div>
                    
                    {/* Initial Portrait */}
                    <div className="absolute inset-8 bg-gradient-to-b from-gold-light to-gold rounded-full flex items-center justify-center">
                      <div className="text-6xl font-serif font-bold text-brown-dark">
                        {data.name.charAt(0)}
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 bg-brown-dark text-gold p-3 rounded-full">
                      <Medal className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Contact Details Card */}
                <div className="space-y-8">
                  {/* Title Card */}
                  <div className="text-center border-b border-gold-light/30 pb-6">
                    <h3 className="text-2xl font-serif font-bold text-brown-dark mb-2">
                      {data.name}
                    </h3>
                    <p className="text-brown-medium italic">Professional Portfolio</p>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gold-light/20 rounded-sm">
                        <Mail className="h-5 w-5 text-brown-dark" />
                      </div>
                      <div>
                        <div className="text-sm text-brown-medium uppercase tracking-widest">Correspondence</div>
                        <div className="font-serif text-brown-dark">{data.contactDetails.email}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gold-light/20 rounded-sm">
                        <BookOpen className="h-5 w-5 text-brown-dark" />
                      </div>
                      <div>
                        <div className="text-sm text-brown-medium uppercase tracking-widest">Direct Line</div>
                        <div className="font-serif text-brown-dark">{data.contactDetails.mobile}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gold-light/20 rounded-sm">
                        <Clock className="h-5 w-5 text-brown-dark" />
                      </div>
                      <div>
                        <div className="text-sm text-brown-medium uppercase tracking-widest">Availability</div>
                        <div className="font-serif text-brown-dark">By Appointment</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Expertise */}
                  <div className="bg-brown-dark/95 text-cream p-6">
                    <div className="text-sm uppercase tracking-widest mb-3">Primary Expertise</div>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-gold/20 text-cream border border-gold/30 rounded-sm text-sm">
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
          <div className="mt-20 text-center">
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex flex-col items-center text-brown-medium hover:text-brown-dark transition-colors"
            >
              <span className="font-serif tracking-widest text-sm mb-3">CONTINUE EXPLORATION</span>
              <div className="w-10 h-10 border border-brown-light rounded-full flex items-center justify-center group-hover:border-brown-dark transition-colors">
                <ArrowDown className="h-5 w-5 animate-bounce" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
