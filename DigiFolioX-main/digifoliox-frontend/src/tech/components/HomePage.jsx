import React from 'react';
import {
    Mail, Phone, Github, Linkedin, Globe,
    Heart, Award, FolderOpen, GraduationCap, Briefcase,
    Code, Terminal, Download, ArrowDown, GitBranch, Database
} from 'lucide-react';

function HomePage({ data }) {
    const { name, profession, about, skills, hobbies, projects, certifications, contactDetails, professionalLinks, education, experience, profession_metadata } = data;
    const professionMeta = profession_metadata || { label: 'Repositories', description: 'List your software and open-source contributions' };
    const normalizedProfession = (profession || '').toLowerCase();
    const shouldShowEducation = ['developer', 'designer', 'therapist', 'coach', 'consultant', 'writer', 'developer'].includes(normalizedProfession);
    const shouldShowExperience = ['developer', 'designer', 'consultant', 'coach', 'therapist', 'developer'].includes(normalizedProfession);

    const handleDownloadResume = () => {
        const resumeContent = `
========================================
${name?.toUpperCase() || 'PORTFOLIO'} - Tech Portfolio
========================================

CONTACT INFORMATION
------------------
Email: ${contactDetails?.email || 'Not provided'}
Phone: ${contactDetails?.mobile || 'Not provided'}

TECHNICAL SUMMARY
----------------
${about || 'No description provided.'}

TECH STACK
---------
${skills.map(skill => `• ${skill.name} (${skill.level})`).join('\n')}

PROJECTS & REPOSITORIES
----------------------
${projects.map(project => `• ${project.title}\n  ${project.description}`).join('\n\n')}

========================================
Generated via DigiFolioX • Tech Template
========================================
    `;

        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name?.toLowerCase().replace(/\s+/g, '-') || 'portfolio'}-tech-portfolio.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const getTechIcon = (skillName, index) => {
        const lowerName = skillName.toLowerCase();
        if (lowerName.includes('react')) return <div className="text-2xl">⚛️</div>;
        if (lowerName.includes('node')) return <div className="text-2xl">🟢</div>;
        if (lowerName.includes('python')) return <div className="text-2xl">🐍</div>;
        if (lowerName.includes('javascript')) return <div className="text-2xl">📜</div>;
        if (lowerName.includes('git')) return <GitBranch className="h-6 w-6" />;
        if (lowerName.includes('database')) return <Database className="h-6 w-6" />;
        return <Code className="h-6 w-6" />;
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
                <div className="container mx-auto px-4 py-20 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg mb-6 shadow-lg">
                            <Terminal className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent break-words overflow-visible">
                            {name || 'Tech Developer'}
                        </h1>
                        <p className="text-xl text-gray-400 mb-8">{profession || 'Software Developer'}</p>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
                            {about || 'Passionate developer building innovative solutions with modern technologies.'}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button onClick={handleDownloadResume} className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center space-x-2">
                                <Download className="h-5 w-5" />
                                <span>Download Resume</span>
                            </button>
                            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors flex items-center space-x-2">
                                <span>View Code</span>
                                <ArrowDown className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack Section */}
            {skills && skills.length > 0 && (
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Tech Stack</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {skills.map((skill, idx) => (
                            <div key={idx} className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-all transform hover:-translate-y-1 hover:shadow-lg">
                                <div className="h-12 w-12 mx-auto mb-4 text-cyan-400 flex items-center justify-center">
                                    {getTechIcon(skill.name, idx)}
                                </div>
                                <h3 className="font-semibold text-white mb-2">{skill.name}</h3>
                                <p className="text-sm text-gray-400">{skill.level}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects Section */}
            {projects && projects.length > 0 && (
                <div id="projects" className="container mx-auto px-4 py-16 bg-gray-800/50">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">{professionMeta.label}</h2>
                        <p className="text-gray-400">{professionMeta.description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, idx) => (
                            <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:-translate-y-2 transition-all hover:shadow-xl">
                                <div className="h-48 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                    <GitBranch className="h-16 w-16 text-white opacity-50" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-400">
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

            {/* Education Section */}
            {shouldShowEducation && education && education.length > 0 && (
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center">
                        <GraduationCap className="h-8 w-8 mr-3 text-cyan-400" />
                        Education
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {education.map((edu, idx) => (
                            <div key={idx} className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                                <p className="text-gray-400">{edu.institution}</p>
                                {edu.year && <p className="text-sm text-gray-500 mt-2">{edu.year}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Experience Section */}
            {shouldShowExperience && experience && experience.length > 0 && (
                <div className="container mx-auto px-4 py-16 bg-gray-800/50">
                    <h2 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center">
                        <Briefcase className="h-8 w-8 mr-3 text-cyan-400" />
                        Experience
                    </h2>
                    <div className="space-y-6">
                        {experience.map((exp, idx) => (
                            <div key={idx} className="bg-gray-800 rounded-lg p-6">
                                <div className="flex flex-wrap justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                        <p className="text-gray-400">{exp.company}</p>
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
                    <h2 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center">
                        <Heart className="h-8 w-8 mr-3 text-red-500" />
                        Interests
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {hobbies.map((hobby, idx) => (
                            <span key={idx} className="px-6 py-3 bg-gray-800 rounded-full text-gray-300 hover:bg-gray-750 transition-all transform hover:-translate-y-1">
                                {hobby}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
                <div className="container mx-auto px-4 py-16 bg-gray-800/50">
                    <h2 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center">
                        <Award className="h-8 w-8 mr-3 text-yellow-500" />
                        Certifications
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {certifications.map((cert, idx) => (
                            <span key={idx} className="px-6 py-3 bg-yellow-500/10 border border-yellow-500 rounded-full text-yellow-400">
                                {cert}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gray-950 text-gray-400 py-12 mt-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white">{name || 'Tech Developer'}</h3>
                            <p className="text-gray-500">{profession || 'Software Developer'}</p>
                        </div>
                        <div className="flex space-x-4">
                            {contactDetails?.email && (
                                <a href={`mailto:${contactDetails.email}`} className="hover:text-cyan-400 transition-colors">
                                    <Mail className="h-5 w-5" />
                                </a>
                            )}
                            {contactDetails?.mobile && (
                                <a href={`tel:${contactDetails.mobile}`} className="hover:text-cyan-400 transition-colors">
                                    <Phone className="h-5 w-5" />
                                </a>
                            )}
                            {professionalLinks?.github && (
                                <a href={professionalLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                                    <Github className="h-5 w-5" />
                                </a>
                            )}
                            {professionalLinks?.linkedin && (
                                <a href={professionalLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            )}
                            {professionalLinks?.portfolio && (
                                <a href={professionalLinks.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                                    <Globe className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="text-center mt-8 pt-8 border-t border-gray-800 text-gray-600 text-sm">
                        <p>© 2024 {name?.split(' ')[0] || 'Tech'}. Tech Portfolio powered by DigiFolioX</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;