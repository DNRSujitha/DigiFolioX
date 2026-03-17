import React from 'react';
import { 
  User, 
  Target, 
  Lightbulb, 
  Heart,
  BookOpen,
  Globe,
  Zap,
  CheckCircle,
  Award,
  TrendingUp
} from 'lucide-react';

function About({ data }) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mb-4">
              <User className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">About Me</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get to Know{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {data.name.split(' ')[0]}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A passionate professional dedicated to excellence and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Column - About Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
                  My Story
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {data.about}
                </p>
              </div>

              {/* Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100">
                  <div className="p-3 bg-blue-100 rounded-xl w-fit mb-4">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Mission</h4>
                  <p className="text-gray-600">
                    Delivering exceptional results through dedication and innovation
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100">
                  <div className="p-3 bg-purple-100 rounded-xl w-fit mb-4">
                    <Lightbulb className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Vision</h4>
                  <p className="text-gray-600">
                    Creating meaningful impact through creative solutions and expertise
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Skills & Expertise */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Zap className="h-6 w-6 text-blue-600 mr-2" />
                  Expertise & Skills
                </h3>
                <div className="space-y-6">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-gray-900">{skill}</span>
                      </div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                          style={{ width: `${80 + (index % 3) * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hobbies & Interests */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <Heart className="h-7 w-7 text-pink-600 mr-3" />
                Hobbies & Interests
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                When I'm not working, here's what I love to do
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl">
                      {['🎨', '📚', '🎵', '⚽', '✈️', '🍳', '🎬', '🧘'][index % 8]}
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{hobby}</h4>
                  <p className="text-sm text-gray-500">
                    {['Creative', 'Learning', 'Entertainment', 'Sports', 'Travel', 'Culinary', 'Movies', 'Wellness'][index % 8]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Goals */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center text-white">
                <Award className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <div className="text-3xl font-bold mb-2">Expert</div>
                <p className="text-blue-100">Professional Level</p>
              </div>
              <div className="text-center text-white">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-300" />
                <div className="text-3xl font-bold mb-2">Growth</div>
                <p className="text-blue-100">Continuous Improvement</p>
              </div>
              <div className="text-center text-white">
                <Globe className="h-12 w-12 mx-auto mb-4 text-cyan-300" />
                <div className="text-3xl font-bold mb-2">Global</div>
                <p className="text-blue-100">Worldwide Reach</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-blue-100 text-lg">
                "Passionate about creating meaningful work and making a positive impact"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;