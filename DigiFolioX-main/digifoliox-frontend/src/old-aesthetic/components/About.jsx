import React from 'react';
import { User, Heart, BookOpen, Award, FolderOpen, GraduationCap, Briefcase } from 'lucide-react';

function About({ data }) {
  const professionMeta = data.profession_metadata || { label: 'Projects', description: 'Showcase your work and contributions' };
  const normalizedProfession = (data.profession || '').toLowerCase();

  const shouldShowEducation = ['developer', 'designer', 'therapist', 'coach', 'consultant', 'writer'].includes(normalizedProfession);
  const shouldShowExperience = ['developer', 'designer', 'consultant', 'coach', 'therapist'].includes(normalizedProfession);

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* About */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <User className="h-8 w-8 text-amber-700" />
            <h2 className="text-3xl font-serif font-bold text-amber-900">About Me</h2>
          </div>
          <p className="text-amber-800 leading-relaxed text-lg">{data.about}</p>
        </div>

        {/* Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6">Skills & Expertise</h3>
          <div className="space-y-4">
            {data.skills.map((skill, idx) => (
              <div key={idx} className="border-b border-amber-200 pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-amber-800">{skill.name}</span>
                  <span className="text-sm text-amber-600 italic">{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-bold text-amber-900 mb-2">{professionMeta.label}</h3>
            {professionMeta.description && <p className="text-amber-600 italic mb-6">{professionMeta.description}</p>}
            <div className="space-y-4">
              {data.projects.map((project, idx) => (
                <div key={idx} className="border-l-4 border-amber-600 pl-4">
                  <h4 className="text-xl font-serif font-semibold text-amber-900">{project.title}</h4>
                  <p className="text-amber-800">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {shouldShowEducation && data.education && data.education.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6">Education</h3>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx} className="border-b border-amber-200 pb-3">
                  <h4 className="font-serif font-semibold text-amber-900">{edu.degree}</h4>
                  <p className="text-amber-700">{edu.institution}</p>
                  {edu.year && <p className="text-sm text-amber-500">{edu.year}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {shouldShowExperience && data.experience && data.experience.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6">Experience</h3>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="border-b border-amber-200 pb-3">
                  <h4 className="font-serif font-semibold text-amber-900">{exp.role}</h4>
                  <p className="text-amber-700">{exp.company}</p>
                  {exp.duration && <p className="text-sm text-amber-500">{exp.duration}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6 flex items-center">
            <Heart className="h-6 w-6 mr-2 text-amber-600" />
            Hobbies & Interests
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.hobbies.map((hobby, idx) => (
              <span key={idx} className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full">{hobby}</span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6 flex items-center">
              <Award className="h-6 w-6 mr-2 text-amber-600" />
              Certifications
            </h3>
            <div className="flex flex-wrap gap-3">
              {data.certifications.map((cert, idx) => (
                <span key={idx} className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full">{cert}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default About;