import React from 'react';
import { 
  ArrowUp, 
  Feather,
  Shield,
  Copyright,
  Book,
  Coffee,
  Globe
} from 'lucide-react';

function Footer({ data }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brown-dark text-cream">
      {/* Decorative Border */}
      <div className="h-1 bg-gradient-to-r from-gold-light via-gold to-gold-light"></div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand & Legacy */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                  <div className="text-2xl font-serif font-bold text-brown-dark">
                    {data.name.charAt(0)}
                  </div>
                </div>
                <div className="border-l border-gold/30 pl-4">
                  <h2 className="text-2xl font-serif font-bold">{data.name}</h2>
                  <p className="text-gold-light text-sm tracking-widest uppercase">Established Professional</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <p className="text-cream/80 leading-relaxed max-w-lg">
                  Upholding traditional standards of excellence while embracing meaningful innovation. 
                  A legacy built on dedication, expertise, and unwavering commitment to quality.
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gold" />
                    <span className="text-sm text-gold-light">Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Feather className="h-4 w-4 text-gold" />
                    <span className="text-sm text-gold-light">Professional</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-serif text-lg mb-6 border-b border-gold/30 pb-3">Navigation</h3>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="#home" 
                    className="text-cream/70 hover:text-gold-light transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-gold-light rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    className="text-cream/70 hover:text-gold-light transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-gold-light rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>
                    <span>About & Background</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="text-cream/70 hover:text-gold-light transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-gold-light rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>
                    <span>Contact & Consultation</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-serif text-lg mb-6 border-b border-gold/30 pb-3">Direct Contact</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gold-light mb-1 uppercase tracking-widest">Correspondence</div>
                  <a 
                    href={`mailto:${data.contactDetails.email}`}
                    className="text-cream/80 hover:text-gold-light transition-colors"
                  >
                    {data.contactDetails.email}
                  </a>
                </div>
                <div>
                  <div className="text-sm text-gold-light mb-1 uppercase tracking-widest">Direct Line</div>
                  <a 
                    href={`tel:${data.contactDetails.mobile}`}
                    className="text-cream/80 hover:text-gold-light transition-colors"
                  >
                    {data.contactDetails.mobile}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Showcase */}
          <div className="mb-12">
            <h3 className="font-serif text-lg mb-6 text-center">Core Expertise</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-brown-darker text-gold-light border border-gold/20 rounded-sm text-sm hover:border-gold hover:text-gold transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-brown-darker">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-cream/70">
                  <Copyright className="h-4 w-4" />
                  <span className="font-serif">{currentYear} {data.name}</span>
                </div>
                <div className="h-4 w-px bg-gold/30"></div>
                <div className="flex items-center space-x-2 text-cream/70">
                  <Book className="h-4 w-4" />
                  <span className="font-serif">All Rights Reserved</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-8">
                <button
                  onClick={scrollToTop}
                  className="group flex items-center space-x-3 text-cream/70 hover:text-gold-light transition-colors"
                >
                  <div className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center group-hover:border-gold">
                    <ArrowUp className="h-5 w-5" />
                  </div>
                  <span className="font-serif tracking-widest">Return to Top</span>
                </button>
                
                <div className="flex items-center space-x-2 text-cream/70">
                  <Coffee className="h-4 w-4" />
                  <span className="font-serif italic">Established Legacy</span>
                </div>
              </div>
            </div>

            {/* Attribution */}
            <div className="mt-8 pt-6 border-t border-brown-darker text-center">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gold-light" />
                  <span className="text-gold-light text-sm">Portfolio Presentation</span>
                </div>
                <div className="h-4 w-px bg-gold/30 hidden md:block"></div>
                <div className="text-cream/50 text-sm font-serif">
                  Elegantly crafted via{" "}
                  <span className="text-gold-light">LocalPro Canvas</span> • 
                  Old Money Aesthetic Edition
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
