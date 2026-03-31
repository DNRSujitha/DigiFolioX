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
  TrendingUp,
  FolderOpen,
  GraduationCap,
  Briefcase,
  Download,
  Sparkles
} from 'lucide-react';

function About({ data }) {
  // Get profession metadata for dynamic section titles
  const professionMeta = data.profession_metadata || {
    label: 'Projects',
    description: 'Showcase your work and contributions'
  };

  const normalizedProfession = (data.profession || '').toLowerCase();

  // Check if education/experience should be shown
  const shouldShowEducation = ['developer', 'designer', 'therapist', 'coach', 'consultant', 'writer']
    .some(role => normalizedProfession.includes(role));

  const shouldShowExperience = ['developer', 'designer', 'consultant', 'coach', 'therapist']
    .some(role => normalizedProfession.includes(role));

  // Resume download function
  const handleDownloadResume = () => {
    const resumeContent = `
========================================
${data.name?.toUpperCase() || 'PORTFOLIO'} - Professional Portfolio
========================================

CONTACT INFORMATION
------------------
Email: ${data.contactDetails?.email || 'Not provided'}
Phone: ${data.contactDetails?.mobile || 'Not provided'}

PROFESSIONAL SUMMARY
-------------------
${data.about || 'No description provided.'}

SKILLS & EXPERTISE
-----------------
${data.skills?.map(skill => `• ${skill.name} (${skill.level})`).join('\n') || 'No skills listed'}

PROJECTS & WORK
--------------
${data.projects?.map(project => `• ${project.title}\n  ${project.description}`).join('\n\n') || 'No projects listed'}

EDUCATION
---------
${data.education?.map(edu => `• ${edu.degree} - ${edu.institution} (${edu.year || 'Year not specified'})`).join('\n') || 'No education listed'}

EXPERIENCE
---------
${data.experience?.map(exp => `• ${exp.role} at ${exp.company}${exp.duration ? ` (${exp.duration})` : ''}`).join('\n') || 'No experience listed'}

CERTIFICATIONS
-------------
${data.certifications?.map(cert => `• ${cert}`).join('\n') || 'No certifications listed'}

HOBBIES & INTERESTS
------------------
${data.hobbies?.map(hobby => `• ${hobby}`).join('\n') || 'No hobbies listed'}

========================================
Generated via DigiFolioX • Modern Template
========================================
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name?.toLowerCase().replace(/\s+/g, '-') || 'portfolio'}-resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Get colorful gradient for first letter
  const getGradientForName = (name) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-indigo-500 to-blue-600',
      'from-purple-500 to-pink-500',
      'from-blue-600 to-cyan-500',
      'from-violet-500 to-purple-600'
    ];
    const index = (name?.charCodeAt(0) || 0) % gradients.length;
    return gradients[index];
  };

  const firstName = data.name?.split(' ')[0] || 'Me';
  const firstLetter = firstName.charAt(0).toUpperCase();
  const gradientClass = getGradientForName(firstName);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Section Header with Download Button */}
          <div className="text-center mb-16">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                <Download className="h-4 w-4" />
                <span className="text-sm">Download Resume</span>
              </button>
            </div>

            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mb-4">
              <User className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">About Me</span>
            </div>


            {/* Double Circle Graphic with First Letter */}
<div className="relative inline-flex items-center justify-center mb-6">
  {/* Outer glow circle */}
  <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 animate-pulse"></div>
  {/* Middle circle */}
  <div className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
  {/* Inner circle with gradient */}
  <div className={`relative w-20 h-20 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center shadow-lg ring-4 ring-white/50`}>
    <span className="text-4xl font-bold text-white drop-shadow-lg">{firstLetter}</span>
  </div>
</div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get to Know{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {firstName}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A passionate professional dedicated to excellence and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

            {/* LEFT COLUMN */}
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

              {/* Values with Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Mission</h4>
                  <p className="text-gray-600 text-sm">Delivering exceptional results through dedication and innovation</p>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Vision</h4>
                  <p className="text-gray-600 text-sm">Creating meaningful impact through creative solutions and expertise</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Skills with Progress Bars */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="h-6 w-6 text-blue-600 mr-2" />
                Expertise & Skills
              </h3>

              <div className="space-y-5">
                {data.skills?.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-800">{skill.name}</span>
                      <span className={`text-sm px-2 py-1 rounded-full
                        ${skill.level === 'Expert' ? 'bg-green-100 text-green-700' :
                          skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'}`}>
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level === 'Expert' ? 100 : skill.level === 'Intermediate' ? 70 : 40}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PROJECTS SECTION */}
          {data.projects && data.projects.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-2 flex items-center justify-center">
                  <FolderOpen className="h-7 w-7 text-emerald-600 mr-3" />
                  {professionMeta.label}
                </h3>
                {professionMeta.description && (
                  <p className="text-gray-600">{professionMeta.description}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.projects.map((p, i) => (
                  <div key={i} className="border border-emerald-200 rounded-xl p-5 bg-emerald-50/30 hover:shadow-lg transition-all hover:-translate-y-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h4>
                    <p className="text-gray-700">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION SECTION */}
          {(shouldShowEducation || data.education?.length > 0) &&
            data.education && data.education.length > 0 && (
              <div className="mb-20">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <GraduationCap className="h-6 w-6 text-blue-600 mr-2" />
                  Education
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.education.map((edu, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{edu.degree}</h4>
                      <p className="text-gray-600">{edu.institution}</p>
                      {edu.year && <p className="text-sm text-gray-500 mt-2">{edu.year}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* EXPERIENCE SECTION */}
          {(shouldShowExperience || data.experience?.length > 0) &&
            data.experience && data.experience.length > 0 && (
              <div className="mb-20">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Briefcase className="h-6 w-6 text-purple-600 mr-2" />
                  Experience
                </h3>
                <div className="space-y-4">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{exp.role}</h4>
                          <p className="text-gray-600">{exp.company}</p>
                        </div>
                        {exp.duration && <span className="text-sm text-gray-500">{exp.duration}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* HOBBIES SECTION - With Commas and Colorful Tags */}
          {data.hobbies && data.hobbies.length > 0 && (
            <div className="mb-20">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Heart className="h-6 w-6 text-pink-600 mr-2" />
                Hobbies & Interests
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.hobbies.map((hobby, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 rounded-full text-sm font-medium hover:shadow-md transition-all hover:scale-105 cursor-default"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATIONS SECTION */}
          {data.certifications && data.certifications.length > 0 && (
            <div className="mb-20">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Award className="h-6 w-6 text-amber-600 mr-2" />
                Certifications
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.certifications.map((cert, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-200"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ACHIEVEMENTS SECTION */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center text-white">
                <Award className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <div className="text-3xl font-bold mb-2">{data.profession || 'Professional'}</div>
                <p className="text-blue-100">Specialization</p>
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
            <div className="mt-8">
              <p className="text-blue-100 text-lg italic">
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