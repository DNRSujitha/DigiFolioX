import React from 'react';
import {
    Mail, Phone, Github, Linkedin, Globe,
    Heart, Award, FolderOpen, GraduationCap, Briefcase,
    Sparkles, ArrowDown, Download, Palette, Camera, Music
} from 'lucide-react';

function HomePage({ data }) {
    console.log('Creative HomePage received data:', data);
    console.log('Skills:', data?.skills);
    console.log('Projects:', data?.projects);
    console.log('Hobbies:', data?.hobbies);

    // If no data, show error
    if (!data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">Error: No data received</h2>
                    <p className="text-gray-600 mt-2">Please check the console for details</p>
                </div>
            </div>
        );
    }

    const {
        name,
        profession,
        about,
        skills = [],
        hobbies = [],
        projects = [],
        certifications = [],
        contactDetails = { email: '', mobile: '' },
        professionalLinks = {},
        education = [],
        experience = [],
        profession_metadata
    } = data;

    const professionMeta = profession_metadata || { label: 'Artworks', description: 'Display your creative pieces and exhibitions' };
    const normalizedProfession = (profession || '').toLowerCase();
    const shouldShowEducation = ['developer', 'designer', 'therapist', 'coach', 'consultant', 'writer', 'artist'].includes(normalizedProfession);
    const shouldShowExperience = ['developer', 'designer', 'consultant', 'coach', 'therapist', 'artist'].includes(normalizedProfession);

    const handleDownloadResume = () => {
        const resumeContent = `
========================================
${name?.toUpperCase() || 'PORTFOLIO'} - Creative Portfolio
========================================

CONTACT INFORMATION
------------------
Email: ${contactDetails?.email || 'Not provided'}
Phone: ${contactDetails?.mobile || 'Not provided'}

ABOUT THE ARTIST
---------------
${about || 'No description provided.'}

CREATIVE SKILLS
--------------
${skills.map(skill => `• ${skill.name} (${skill.level})`).join('\n')}

ARTISTIC WORKS
-------------
${projects.map(project => `• ${project.title}\n  ${project.description}`).join('\n\n')}

CREATIVE PURSUITS
----------------
${hobbies.map(hobby => `• ${hobby}`).join('\n')}

========================================
Generated via DigiFolioX • Creative Template
========================================
    `;

        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name?.toLowerCase().replace(/\s+/g, '-') || 'portfolio'}-creative-portfolio.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getSkillIcon = (skillName) => {
        // Return a single consistent icon for all skills
        return <Sparkles className="h-8 w-8 text-white" />;
    };

    // Show at least something if no data
    if (!name && !profession && skills.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">No Portfolio Data</h2>
                    <p className="text-gray-600 mt-2">Please generate a portfolio first</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10"></div>
                <div className="container mx-auto px-4 py-20 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 shadow-lg animate-bounce">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent break-words overflow-visible">
                            {name || 'Creative Artist'}
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">{profession || 'Creative Professional'}</p>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
                            {about || 'Passionate about creating meaningful art and inspiring others through creative expression.'}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button onClick={handleDownloadResume} className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-shadow flex items-center space-x-2">
                                <Download className="h-5 w-5" />
                                <span>Download Resume</span>
                            </button>
                            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 border-2 border-purple-500 text-purple-600 rounded-full hover:bg-purple-50 transition-colors flex items-center space-x-2">
                                <span>View Artwork</span>
                                <ArrowDown className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Creative Skills Section */}
            {skills && skills.length > 0 && (
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Creative Skills</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {skills.map((skill, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                                    {getSkillIcon(skill.name)}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{skill.name}</h3>
                                <p className="text-sm text-gray-500">{skill.level}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects/Artworks Section */}
            {projects && projects.length > 0 && (
                <div id="projects" className="container mx-auto px-4 py-16 bg-white/50">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">{professionMeta.label}</h2>
                        <p className="text-gray-600">{professionMeta.description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, idx) => (
                            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                                <div className="h-48 bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <FolderOpen className="h-16 w-16 text-white relative z-10" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-gray-600">
                                        {project.description && project.description !== 'No description provided'
                                            ? project.description
                                            : 'No description provided yet.'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* If no projects, show a message */}
            {(!projects || projects.length === 0) && (
                <div className="container mx-auto px-4 py-16 text-center">
                    <p className="text-gray-500">No projects added yet. Add some in the portfolio form!</p>
                </div>
            )}

            {/* Education Section */}
            {shouldShowEducation && education && education.length > 0 && (
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
                        <GraduationCap className="h-8 w-8 mr-3 text-purple-600" />
                        Education
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {education.map((edu, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                                <p className="text-gray-600">{edu.institution}</p>
                                {edu.year && <p className="text-sm text-gray-500 mt-2">{edu.year}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Experience Section */}
            {shouldShowExperience && experience && experience.length > 0 && (
                <div className="container mx-auto px-4 py-16 bg-white/50">
                    <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
                        <Briefcase className="h-8 w-8 mr-3 text-pink-600" />
                        Experience
                    </h2>
                    <div className="space-y-6">
                        {experience.map((exp, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex flex-wrap justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold">{exp.role}</h3>
                                        <p className="text-gray-600">{exp.company}</p>
                                    </div>
                                    {exp.duration && <span className="text-sm text-gray-500">{exp.duration}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Hobbies Section */}
            {hobbies && hobbies.length > 0 && (
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
                        <Heart className="h-8 w-8 mr-3 text-red-500" />
                        Creative Pursuits
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {hobbies.map((hobby, idx) => (
                            <span key={idx} className="px-6 py-3 bg-white rounded-full shadow-md text-gray-700 hover:shadow-lg transition-all transform hover:-translate-y-1">
                                {hobby}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
                <div className="container mx-auto px-4 py-16 bg-white/50">
                    <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
                        <Award className="h-8 w-8 mr-3 text-yellow-500" />
                        Certifications
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {certifications.map((cert, idx) => (
                            <span key={idx} className="px-6 py-3 bg-yellow-50 rounded-full text-yellow-700">
                                {cert}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-12 mt-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold">{name || 'Creative Portfolio'}</h3>
                            <p className="text-white/80">{profession || 'Creative Professional'}</p>
                        </div>
                        <div className="flex space-x-4">
                            {contactDetails?.email && (
                                <a href={`mailto:${contactDetails.email}`} className="hover:text-pink-200 transition-colors">
                                    <Mail className="h-5 w-5" />
                                </a>
                            )}
                            {contactDetails?.mobile && (
                                <a href={`tel:${contactDetails.mobile}`} className="hover:text-pink-200 transition-colors">
                                    <Phone className="h-5 w-5" />
                                </a>
                            )}
                            {professionalLinks?.github && (
                                <a href={professionalLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-pink-200 transition-colors">
                                    <Github className="h-5 w-5" />
                                </a>
                            )}
                            {professionalLinks?.linkedin && (
                                <a href={professionalLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-pink-200 transition-colors">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            )}
                            {professionalLinks?.portfolio && (
                                <a href={professionalLinks.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-pink-200 transition-colors">
                                    <Globe className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="text-center mt-8 pt-8 border-t border-white/20 text-white/60 text-sm">
                        <p>© 2024 {name?.split(' ')[0] || 'Creative'}. Artistic Portfolio powered by DigiFolioX</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;