import React from 'react';
import { 
  BookOpen, 
  Target, 
  Lightbulb, 
  Heart,
  Zap,
  CheckCircle,
  Award,
  Globe,
  Coffee,
  Feather,
  Clock,
  Shield
} from 'lucide-react';

function About({ data }) {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-2 bg-gold-light/20 border border-gold-light/40 rounded-full mb-6">
              <BookOpen className="h-5 w-5 text-brown-dark" />
              <span className="font-serif tracking-widest text-brown-dark">ABOUT & BACKGROUND</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brown-dark mb-6">
              Professional Profile &{" "}
              <span className="text-gold italic">Background</span>
            </h2>
            <div className="w-32 h-1 bg-gold-light mx-auto mb-8"></div>
            <p className="text-xl text-brown-medium italic max-w-3xl mx-auto leading-relaxed">
              A distinguished professional with a legacy of excellence and dedication to craft
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            {/* Left Column - Professional Story */}
            <div className="space-y-12">
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-light to-gold"></div>
                <h3 className="text-3xl font-serif font-bold text-brown-dark mb-8 flex items-center">
                  <Feather className="h-7 w-7 text-gold mr-4" />
                  Professional Narrative
                </h3>
                <div className="bg-cream border border-brown-light/20 p-8 shadow-sm">
                  <p className="text-lg text-brown-medium leading-relaxed mb-6">
                    {data.about}
                  </p>
                  <div className="flex items-center space-x-2 text-gold">
                    <Shield className="h-5 w-5" />
                    <span className="font-serif italic">Verified Professional</span>
                  </div>
                </div>
              </div>

              {/* Values & Principles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white border border-gold-light/30 p-8 hover:border-gold-light transition-all duration-300">
                  <div className="w-12 h-12 bg-gold-light/20 rounded-full flex items-center justify-center mb-6">
                    <Target className="h-6 w-6 text-brown-dark" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-brown-dark mb-3">Mission</h4>
                  <p className="text-brown-medium">
                    Upholding traditional standards of excellence while embracing modern innovation
                  </p>
                </div>

                <div className="bg-white border border-gold-light/30 p-8 hover:border-gold-light transition-all duration-300">
                  <div className="w-12 h-12 bg-gold-light/20 rounded-full flex items-center justify-center mb-6">
                    <Lightbulb className="h-6 w-6 text-brown-dark" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-brown-dark mb-3">Philosophy</h4>
                  <p className="text-brown-medium">
                    Quality over quantity, substance over style, and lasting impact over temporary trends
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Skills & Expertise */}
            <div className="space-y-12">
              <div className="bg-cream border border-brown-light p-8 shadow-sm">
                <h3 className="text-3xl font-serif font-bold text-brown-dark mb-8 flex items-center">
                  <Zap className="h-7 w-7 text-gold mr-4" />
                  Core Competencies
                </h3>
                <div className="space-y-8">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <CheckCircle className="h-5 w-5 text-green-700" />
                          <span className="font-serif text-lg text-brown-dark group-hover:text-gold transition-colors">
                            {skill}
                          </span>
                        </div>
                        <span className="font-serif text-brown-medium text-sm">
                          Expert Level
                        </span>
                      </div>
                      <div className="w-full h-2 bg-brown-light/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-gold-light to-gold rounded-full transition-all duration-1000"
                          style={{ width: `${85 + (index % 4) * 5}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Accolades */}
              <div className="border border-gold-light p-8 bg-white/50">
                <h4 className="text-xl font-serif font-bold text-brown-dark mb-6 flex items-center">
                  <Award className="h-5 w-5 text-gold mr-3" />
                  Professional Accolades
                </h4>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="p-4 border border-gold-light/30">
                    <div className="text-3xl font-serif font-bold text-brown-dark mb-2">
                      {data.skills.length}+
                    </div>
                    <div className="text-sm text-brown-medium uppercase tracking-widest">Skills</div>
                  </div>
                  <div className="p-4 border border-gold-light/30">
                    <Clock className="h-8 w-8 text-brown-dark mx-auto mb-2" />
                    <div className="text-sm text-brown-medium uppercase tracking-widest">Decades</div>
                  </div>
                  <div className="p-4 border border-gold-light/30">
                    <Globe className="h-8 w-8 text-brown-dark mx-auto mb-2" />
                    <div className="text-sm text-brown-medium uppercase tracking-widest">Global</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Interests Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-serif font-bold text-brown-dark mb-6 flex items-center justify-center">
                <Heart className="h-7 w-7 text-rose-700 mr-4" />
                Personal Pursuits & Interests
              </h3>
              <p className="text-brown-medium italic max-w-2xl mx-auto">
                Beyond professional endeavors, these are the passions that enrich my life and perspective
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="group relative bg-white border border-brown-light p-8 text-center hover:border-gold-light transition-all duration-300"
                >
                  <div className="absolute top-4 left-4 text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
                    {['♛', '♔', '♕', '♖', '♗', '♘', '♙', '♚'][index % 8]}
                  </div>
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-b from-gold-light to-gold rounded-full flex items-center justify-center">
                    <div className="text-2xl">
                      {['📜', '🎻', '⚜️', '🏛️', '🎩', '📚', '🎨', '☕'][index % 8]}
                    </div>
                  </div>
                  <h4 className="font-serif font-bold text-brown-dark mb-3 text-lg">{hobby}</h4>
                  <p className="text-sm text-brown-medium italic">
                    {[
                      'Classical Literature', 
                      'Fine Arts & Music', 
                      'Heritage Studies', 
                      'Architecture', 
                      'Tailoring', 
                      'Historical Research', 
                      'Classical Painting', 
                      'Artisanal Brews'
                    ][index % 8]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Legacy Statement */}
          <div className="bg-brown-dark text-cream p-12 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-light via-gold to-gold-light"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-light via-gold to-gold-light"></div>
            
            <div className="max-w-3xl mx-auto text-center">
              <Coffee className="h-12 w-12 text-gold mx-auto mb-6" />
              <p className="text-2xl font-serif italic mb-8 leading-relaxed">
                "True professionalism is measured not by fleeting success, but by lasting impact and unwavering dedication to craft."
              </p>
              <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
              <p className="text-gold-light font-serif tracking-widest">
                — {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;