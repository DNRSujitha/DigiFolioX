import React, { useState, useEffect } from 'react';
import {
  Palette, User, Mail, Phone, Briefcase, Heart, FolderOpen, Award, Type,
  Check, ArrowRight, Plus, X, Eye, Sparkles, AlertCircle, LogOut,
  GraduationCap, Trash2, Lightbulb, Zap, Link
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import aiService from '../services/aiService'; // We'll create this next

const API_BASE_URL = import.meta.env.VITE_DIGIFOLIOX_API_BASE_URL || 'https://localprocanvas.onrender.com';

// ========== 1. Profession Metadata ==========
const professionMetaData = {
  photographer: { label: 'Galleries', description: 'Showcase your best visual work' },
  designer: { label: 'Case Studies', description: 'Display your UI/UX or brand projects' },
  developer: { label: 'Repositories', description: 'List your software and open-source contributions' },
  writer: { label: 'Published Works', description: 'Share your articles, blogs, or books' },
  consultant: { label: 'Engagements', description: 'Highlight your consulting projects and case studies' },
  coach: { label: 'Success Stories', description: 'Showcase client transformations and testimonials' },
  artist: { label: 'Artworks', description: 'Display your creative pieces and exhibitions' },
  therapist: { label: 'Specializations', description: 'List your therapy areas and expertise' },
  chef: { label: 'Signature Dishes', description: 'Highlight your culinary creations' },
  'fitness trainer': { label: 'Client Transformations', description: 'Showcase fitness results and programs' },
  default: { label: 'Projects', description: 'Showcase your work and contributions' }
};

// ========== 2. Skill Suggestions ==========
const skillSuggestions = {
  chef: ["Cooking", "Menu Design", "Food Presentation", "Kitchen Management", "Plating"],
  photographer: ["Photo Editing", "Lighting", "Composition", "Adobe Lightroom", "Photoshop"],
  writer: ["Creative Writing", "SEO Writing", "Editing", "Storytelling", "Copywriting"],
  designer: ["UI/UX Design", "Figma", "Adobe XD", "Typography", "User Research"],
  developer: ["JavaScript", "React", "Node.js", "MongoDB", "Python", "Git"],
  artist: ["Sketching", "Painting", "Digital Art", "Illustration", "Mixed Media"],
  therapist: ["Counseling", "Emotional Intelligence", "Active Listening", "CBT", "Mindfulness"],
  'fitness trainer': ["Workout Planning", "Nutrition", "Strength Training", "Cardio", "Motivation"],
  coach: ["Mentoring", "Communication", "Leadership", "Goal Setting", "Accountability"],
  consultant: ["Problem Solving", "Business Strategy", "Analytics", "Change Management"],
  default: ["Communication", "Teamwork", "Problem Solving", "Adaptability", "Leadership"]
};

// Add hobby suggestions based on profession
const hobbySuggestionsMap = {
  chef: ["Cooking Experiments", "Food Blogging", "Wine Tasting", "Farmers Market Visits"],
  photographer: ["Travel Photography", "Street Photography", "Nature Walks", "Photo Exhibitions"],
  writer: ["Reading Classics", "Poetry Writing", "Book Club", "Journaling"],
  designer: ["Sketching", "Art Galleries", "Typography", "Minimalist Design"],
  developer: ["Open Source", "Tech Blogging", "Gaming", "Hackathons"],
  artist: ["Gallery Visits", "Art Workshops", "Digital Painting", "Sculpture"],
  therapist: ["Meditation", "Yoga", "Mindfulness", "Nature Walks"],
  'fitness trainer': ["Marathon Running", "Hiking", "Nutrition Research", "Outdoor Activities"],
  coach: ["Public Speaking", "Networking Events", "Mentoring", "Leadership Books"],
  consultant: ["Business Reading", "Strategy Games", "Industry Conferences", "Market Research"],
  default: ["Reading", "Travel", "Photography", "Music", "Sports", "Cooking"]
};

// ========== 3. Conditional Education/Experience ==========
const showEducationFor = ['developer', 'designer', 'therapist', 'coach', 'consultant', 'writer'];
const showExperienceFor = ['developer', 'designer', 'consultant', 'coach', 'therapist'];

function Portfolio() {
  const navigate = useNavigate();
  const professionFromStorage = localStorage.getItem('digifoliox_profession') || '';
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    profession: professionFromStorage,
    skills: [],        // { name, level }
    hobbies: [],
    projects: [],      // { title, description }
    certifications: [],
    about: '',
    education: [],     // { degree, institution, year }
    experience: [],    // { role, company, duration }
    contactDetails: { email: '', mobile: '' }
  });

  // Form input states
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Beginner');
  const [newHobby, setNewHobby] = useState('');
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [newCertification, setNewCertification] = useState('');
  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', year: '' });
  const [newExperience, setNewExperience] = useState({ role: '', company: '', duration: '' });
  const [professionalLinks, setProfessionalLinks] = useState({ github: '', linkedin: '', portfolio: '' });
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(true);
  const [hobbySuggestions, setHobbySuggestions] = useState([]);
  const [showHobbySuggestions, setShowHobbySuggestions] = useState(true);

  // AI States
  const [validating, setValidating] = useState(false);
  const [skillSuggestionsList, setSkillSuggestionsList] = useState([]);

  const professionOptions = [
    'Photographer', 'Designer', 'Developer', 'Writer', 'Consultant',
    'Coach', 'Artist', 'Therapist', 'Chef', 'Fitness Trainer'
  ];
  const skillLevels = ['Beginner', 'Intermediate', 'Expert'];

  // Templates (easy to extend)
  const templates = [
    {
      id: 'modern',
      name: 'Modern Template',
      category: 'Contemporary',
      description: 'Clean, minimal design with modern aesthetics',
      color: 'bg-gradient-to-br from-blue-500 to-purple-600',
      features: ['Responsive', 'Minimal', 'Fast Loading']
    },
    {
      id: 'old-aesthetic',
      name: 'Old Aesthetic Template',
      category: 'Classic',
      description: 'Elegant, timeless design with classic typography',
      color: 'bg-gradient-to-br from-amber-700 to-yellow-800',
      features: ['Elegant', 'Professional', 'Traditional']
    },
    {
      id: 'creative',
      name: 'Creative Portfolio',
      category: 'Artistic',
      description: 'Bold colors and creative layouts for artists',
      color: 'bg-gradient-to-br from-pink-500 to-orange-500',
      features: ['Artistic', 'Visual', 'Creative']
    },
    {
      id: 'tech',
      name: 'Tech Portfolio',
      category: 'Technical',
      description: 'Modern layout for developers and tech professionals',
      color: 'bg-gradient-to-br from-green-500 to-teal-500',
      features: ['Code-friendly', 'Technical', 'Modern']
    }
  ];

  const getProfessionMeta = (profession) => {
    const normalized = (profession || '').trim().toLowerCase();
    return professionMetaData[normalized] || professionMetaData.default;
  };

  const getSkillSuggestions = (profession) => {
    const normalized = (profession || '').trim().toLowerCase();
    return skillSuggestions[normalized] || skillSuggestions.default;
  };

  const getHobbySuggestions = (profession) => {
    const normalized = (profession || '').trim().toLowerCase();
    return hobbySuggestionsMap[normalized] || hobbySuggestionsMap.default;
  };

  const shouldShowEducation = () => showEducationFor.includes(formData.profession.toLowerCase());
  const shouldShowExperience = () => showExperienceFor.includes(formData.profession.toLowerCase());

  const handleTemplateSelect = (template) => setSelectedTemplate(template);
  const handleLogout = () => {
    localStorage.removeItem('digifoliox_token');
    localStorage.removeItem('digifoliox_user_id');
    localStorage.removeItem('digifoliox_user_email');
    localStorage.removeItem('digifoliox_profession');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'profession' && errors.profession) setErrors(prev => ({ ...prev, profession: null }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, contactDetails: { ...prev.contactDetails, [name]: value } }));
  };

  // ========== AI VALIDATION FUNCTIONS ==========

  // Validate and add skill with AI
  const validateAndAddSkill = async () => {
    const skillName = newSkill.trim();
    if (!skillName) return;

    // Check for duplicates
    if (formData.skills.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
      setErrors(prev => ({ ...prev, skillValidation: 'Skill already added' }));
      return;
    }

    setValidating(true);
    try {
      const validation = await aiService.validateSkill(skillName);

      if (validation.isValid) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, { name: skillName, level: newSkillLevel }]
        }));
        setNewSkill('');
        setErrors(prev => ({ ...prev, skillValidation: null, skillSuggestionsList: [] }));
      } else {
        // Get suggestions for invalid skill
        const suggestions = await aiService.suggestValidSkill(skillName);
        setErrors(prev => ({
          ...prev,
          skillValidation: validation.suggestion || 'Please enter a valid professional skill',
          skillSuggestionsList: suggestions
        }));
      }
    } catch (error) {
      console.error('Validation error:', error);
      // Fallback: add anyway
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, { name: skillName, level: newSkillLevel }]
      }));
      setNewSkill('');
    } finally {
      setValidating(false);
    }
  };

  // Validate and add hobby with AI
  const validateAndAddHobby = async () => {
    const hobbyName = newHobby.trim();
    if (!hobbyName) return;

    if (formData.hobbies.includes(hobbyName)) {
      setErrors(prev => ({ ...prev, hobbyValidation: 'Hobby already added' }));
      return;
    }

    setValidating(true);
    try {
      const validation = await aiService.validateHobby(hobbyName);

      if (validation.isValid) {
        setFormData(prev => ({ ...prev, hobbies: [...prev.hobbies, hobbyName] }));
        setNewHobby('');
        setErrors(prev => ({ ...prev, hobbyValidation: null }));
      } else {
        setErrors(prev => ({
          ...prev,
          hobbyValidation: validation.suggestion || 'Please enter a valid hobby'
        }));
      }
    } catch (error) {
      console.error('Validation error:', error);
      // Fallback: add anyway
      setFormData(prev => ({ ...prev, hobbies: [...prev.hobbies, hobbyName] }));
      setNewHobby('');
    } finally {
      setValidating(false);
    }
  };

  // Validate and add certification with AI
  const validateAndAddCertification = async () => {
    const certName = newCertification.trim();
    if (!certName) return;

    if (formData.certifications.includes(certName)) {
      setErrors(prev => ({ ...prev, certValidation: 'Certification already added' }));
      return;
    }

    setValidating(true);
    try {
      const validation = await aiService.validateCertification(certName);

      if (validation.isValid) {
        setFormData(prev => ({ ...prev, certifications: [...prev.certifications, certName] }));
        setNewCertification('');
        setErrors(prev => ({ ...prev, certValidation: null }));
      } else {
        setErrors(prev => ({
          ...prev,
          certValidation: validation.suggestion || 'Please enter a valid certification'
        }));
      }
    } catch (error) {
      console.error('Validation error:', error);
      // Fallback: add anyway
      setFormData(prev => ({ ...prev, certifications: [...prev.certifications, certName] }));
      setNewCertification('');
    } finally {
      setValidating(false);
    }
  };

  // Validate year input
  // Validate year input (must be 4 digits)
  const validateYear = (year) => {
    if (!year || year.trim() === '') return { isValid: true, suggestion: null };

    const trimmed = year.trim();

    // Check for gibberish - if it's random letters, reject
    const isGibberish = /([bcdfghjklmnpqrstvwxyz]{4,})/i.test(trimmed) || /([a-z])\1{3,}/i.test(trimmed);
    if (isGibberish && !/^\d{4}$/.test(trimmed)) {
      return { isValid: false, suggestion: "Please enter a valid 4-digit year (e.g., 2020, 2024)" };
    }

    // Check if it's exactly 4 digits
    if (!/^\d{4}$/.test(trimmed)) {
      return { isValid: false, suggestion: "Year must be a 4-digit number (e.g., 2020, 2024)" };
    }

    const yearNum = parseInt(trimmed);
    const currentYear = new Date().getFullYear();

    if (yearNum < 1900) {
      return { isValid: false, suggestion: "Year should be 1900 or later" };
    }

    if (yearNum > currentYear + 5) {
      return { isValid: false, suggestion: `Year cannot be later than ${currentYear + 5}` };
    }

    return { isValid: true, suggestion: null };
  };

  // Validate duration format
  // Validate duration format (supports months, years, and various formats)
  const validateDuration = (duration) => {
    if (!duration || duration.trim() === '') return { isValid: true, suggestion: null };

    const trimmed = duration.trim();

    // Check for gibberish - detect random consonant patterns
    const hasRandomConsonants = /([bcdfghjklmnpqrstvwxyz]{5,})/i.test(trimmed);
    if (hasRandomConsonants) {
      return { isValid: false, suggestion: "Duration contains random letters. Please use format like '2022-Present', '6 months', or 'Jan 2020 - Dec 2022'" };
    }

    // Check for repeated letters (like "yyyy" or "uuuu")
    const hasRepeatedLetters = /([a-z])\1{3,}/i.test(trimmed);
    if (hasRepeatedLetters) {
      return { isValid: false, suggestion: "Duration contains repeated letters. Please use format like '2022-Present', '6 months', or 'Jan 2020 - Dec 2022'" };
    }

    // Pattern 1: Year range (2020-2024 or 2020-Present)
    if (/^\d{4}-(?:Present|present|\d{4})$/.test(trimmed)) {
      return { isValid: true, suggestion: null };
    }

    // Pattern 2: Month/Year format (Jan 2020 - Present or Jan 2020 - Dec 2022)
    if (/^[A-Za-z]{3}\s\d{4}\s-\s(?:Present|present|[A-Za-z]{3}\s\d{4})$/.test(trimmed)) {
      return { isValid: true, suggestion: null };
    }

    // Pattern 3: Duration in months (6 months, 12 months)
    if (/^\d+\s+months?$/i.test(trimmed)) {
      return { isValid: true, suggestion: null };
    }

    // Pattern 4: Duration in years (3 years, 2.5 years)
    if (/^\d+(?:\.\d+)?\s+years?$/i.test(trimmed)) {
      return { isValid: true, suggestion: null };
    }

    // Pattern 5: Short format (6m, 12m, 2y) - accept with suggestion
    if (/^\d+[my]$/i.test(trimmed)) {
      return { isValid: true, suggestion: "Consider using full format like '6 months' or '2 years' for clarity" };
    }

    // Pattern 6: Single year (2022) - accept with suggestion
    if (/^\d{4}$/.test(trimmed)) {
      return { isValid: true, suggestion: "Consider using range format like '2022-Present' or '2022-2023'" };
    }

    // Pattern 7: Month range (6-12 months)
    if (/^\d+\s*-\s*\d+\s+months?$/i.test(trimmed)) {
      return { isValid: true, suggestion: null };
    }

    return {
      isValid: false,
      suggestion: "Use format: '2022-Present', '2020-2024', '6 months', '3 years', '6-12 months', or 'Jan 2020 - Present'"
    };
  };
  // Validate and add education with year validation
  const addEducationWithValidation = () => {
    if (!newEducation.degree.trim() || !newEducation.institution.trim()) {
      setErrors(prev => ({ ...prev, educationValidation: 'Degree and Institution are required' }));
      return;
    }

    const yearValidation = validateYear(newEducation.year);
    if (newEducation.year && !yearValidation.isValid) {
      setErrors(prev => ({ ...prev, educationValidation: yearValidation.suggestion }));
      return;
    }

    setFormData(prev => ({ ...prev, education: [...prev.education, { ...newEducation }] }));
    setNewEducation({ degree: '', institution: '', year: '' });
    setErrors(prev => ({ ...prev, educationValidation: null }));
  };

  // Validate and add experience with duration validation
  const addExperienceWithValidation = () => {
    if (!newExperience.role.trim() || !newExperience.company.trim()) {
      setErrors(prev => ({ ...prev, experienceValidation: 'Role and Company are required' }));
      return;
    }

    const durationValidation = validateDuration(newExperience.duration);
    if (newExperience.duration && !durationValidation.isValid) {
      setErrors(prev => ({ ...prev, experienceValidation: durationValidation.suggestion }));
      return;
    }

    setFormData(prev => ({ ...prev, experience: [...prev.experience, { ...newExperience }] }));
    setNewExperience({ role: '', company: '', duration: '' });
    setErrors(prev => ({ ...prev, experienceValidation: null }));
  };

  // Validate about content
  const validateAboutContent = async () => {
    if (!formData.about.trim()) return true;

    const validation = await aiService.validateContent(formData.about);
    if (!validation.isValid) {
      setErrors(prev => ({
        ...prev,
        aboutValidation: validation.suggestion || 'Please write meaningful content'
      }));
      return false;
    }
    setErrors(prev => ({ ...prev, aboutValidation: null }));
    return true;
  };

  // ========== ORIGINAL FUNCTIONS (Modified with validation) ==========

  // Skill management - modified to use validation
  const addSkill = () => {
    validateAndAddSkill();
  };

  const removeSkill = (skillName) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s.name !== skillName) }));
  };

  const addSuggestedSkill = (suggestedSkill) => {
    if (!formData.skills.some(s => s.name.toLowerCase() === suggestedSkill.toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, {
          name: suggestedSkill,
          level: newSkillLevel
        }]
      }));
      // Clear validation error if skill was invalid
      setErrors(prev => ({ ...prev, skillValidation: null, skillSuggestionsList: [] }));
    }
  };

  // Hobby management - modified to use validation
  const addHobby = () => {
    validateAndAddHobby();
  };

  const removeHobby = (hobby) => setFormData(prev => ({ ...prev, hobbies: prev.hobbies.filter(h => h !== hobby) }));

  useEffect(() => {
    if (formData.profession) {
      const suggestions = getHobbySuggestions(formData.profession);
      setHobbySuggestions(suggestions);
    }
  }, [formData.profession]);

  const addSuggestedHobby = (suggestedHobby) => {
    if (!formData.hobbies.includes(suggestedHobby)) {
      setFormData(prev => ({ ...prev, hobbies: [...prev.hobbies, suggestedHobby] }));
      setErrors(prev => ({ ...prev, hobbyValidation: null }));
    }
  };

  // Project management (object)
  const addProject = () => {
    if (newProject.title.trim()) {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, {
          title: newProject.title.trim(),
          description: newProject.description.trim()
        }]
      }));
      setNewProject({ title: '', description: '' });
    }
  };

  const removeProject = (projectTitle) => {
    setFormData(prev => ({ ...prev, projects: prev.projects.filter(p => p.title !== projectTitle) }));
  };

  // Certification management - modified to use validation
  const addCertification = () => {
    validateAndAddCertification();
  };

  const removeCertification = (cert) => setFormData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c !== cert) }));

  // Education management - modified with validation
  const addEducation = () => {
    addEducationWithValidation();
  };

  const removeEducation = (index) => {
    setFormData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
  };

  // Experience management - modified with validation
  const addExperience = () => {
    addExperienceWithValidation();
  };

  const removeExperience = (index) => {
    setFormData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  };

  const handleProfessionalLinkChange = (e) => {
    const { name, value } = e.target;
    setProfessionalLinks(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.profession) newErrors.profession = 'Please select a profession';
    if (!formData.about.trim()) newErrors.about = 'About section is required';
    if (formData.skills.length === 0) newErrors.skills = 'Add at least one skill';
    if (!formData.contactDetails.email.trim()) newErrors.email = 'Email is required';
    if (!formData.contactDetails.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!selectedTemplate) newErrors.template = 'Please select a template';
    return newErrors;
  };

  // AI Features - Enhanced with actual AI
  const generateAboutWithAI = async () => {
    if (!formData.profession || !formData.name) {
      setErrors(prev => ({ ...prev, ai: 'Please fill in name and profession first' }));
      return;
    }

    setValidating(true);
    try {
      const generatedAbout = await aiService.generateAbout(formData.name, formData.profession);
      setFormData(prev => ({ ...prev, about: generatedAbout }));
      setErrors(prev => ({ ...prev, ai: null }));
    } catch (error) {
      console.error('AI generation error:', error);
      // Fallback
      const fallbackAbout = `I am ${formData.name}, a passionate ${formData.profession} with a strong dedication to excellence. With years of experience in my field, I've developed a unique approach that combines creativity with technical expertise. I believe in continuous learning and pushing boundaries to deliver exceptional results. My work is driven by a desire to solve complex problems and create meaningful impact. I'm excited about opportunities to collaborate and bring innovative ideas to life.`;
      setFormData(prev => ({ ...prev, about: fallbackAbout }));
    } finally {
      setValidating(false);
    }
  };

  const improveProjectDescription = async (projectIndex) => {
    const project = formData.projects[projectIndex];

    // Check if description already has AI enhancement
    const hasAIEnhancement = project.description?.includes('✨') ||
      project.description?.includes('This project demonstrates');

    const mockImprovement = async (title, description) => {
      // Clean up existing AI enhancements
      let cleanDescription = description || '';

      // Remove existing AI prefixes and duplicates
      cleanDescription = cleanDescription.replace(/^✨\s*/, '');
      cleanDescription = cleanDescription.replace(/\s*This project demonstrates.*$/i, '');
      cleanDescription = cleanDescription.trim();

      // Generate new improvement without duplication
      const improvements = [
        `✨ ${cleanDescription ? cleanDescription + ' ' : ''}A comprehensive ${title} project that showcases expertise in delivering innovative solutions with measurable results.`,
        `✨ ${cleanDescription ? cleanDescription + ' ' : ''}Successfully executed ${title} with focus on quality and user experience, resulting in outstanding outcomes.`,
        `✨ ${cleanDescription ? cleanDescription + ' ' : ''}Led the development of ${title}, implementing best practices and achieving significant improvements in performance.`,
        `✨ ${cleanDescription ? cleanDescription + ' ' : ''}Created and deployed ${title} with modern technologies, ensuring scalability and maintainability.`
      ];

      return improvements[Math.floor(Math.random() * improvements.length)];
    };

    const improvedDescription = await mockImprovement(project.title, project.description);

    const updatedProjects = [...formData.projects];
    updatedProjects[projectIndex] = { ...project, description: improvedDescription };
    setFormData(prev => ({ ...prev, projects: updatedProjects }));
  };

  const generatePortfolio = async () => {
    // Validate about content before submission
    const isAboutValid = await validateAboutContent();
    if (!isAboutValid) {
      setErrors(prev => ({ ...prev, submit: 'Please fix the about section content' }));
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsGenerating(true);
    try {
      const token = localStorage.getItem('digifoliox_token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(`${API_BASE_URL}/portfolios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          template: selectedTemplate.id,
          data: {
            ...formData,
            template_selected: selectedTemplate.id,
            professionalLinks,
            profession_metadata: getProfessionMeta(formData.profession)
          }
        })
      });
      const payload = await response.json();
      if (!response.ok) {
        // Fallback to local preview
        const tempId = Date.now().toString();
        localStorage.setItem(
          `portfolio_${tempId}`,
          JSON.stringify({
            ...formData,
            template_selected: selectedTemplate.id,
            professionalLinks,
            profession_metadata: getProfessionMeta(formData.profession)
          })
        );
        navigate(`/${selectedTemplate.id}/${tempId}`);
        return;
      }
      const uniqueIdentifier = payload?.data?.unique_identifier;
      if (!uniqueIdentifier) throw new Error('Portfolio created but identifier is missing');
      navigate(`/${selectedTemplate.id}/${uniqueIdentifier}`);
    } catch (error) {
      console.error('Error generating portfolio:', error);
      setErrors(prev => ({ ...prev, submit: error.message || 'Failed to generate portfolio. Please try again.' }));
    } finally {
      setIsGenerating(false);
    }
  };

  console.log(formData.skills);
  const professionMeta = getProfessionMeta(formData.profession);
  const currentSkillSuggestions = getSkillSuggestions(formData.profession);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg"><Palette className="h-6 w-6 text-white" /></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Digi<span className="text-blue-600">FolioX</span></h1>
                <p className="text-xs text-gray-500 -mt-1">Create Your Portfolio</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm ${currentStep === 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>1. Choose Template</div>
                <div className={`px-3 py-1 rounded-full text-sm ${currentStep === 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>2. Enter Details</div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={generatePortfolio} disabled={isGenerating} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2">
                  {isGenerating ? (<><div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Generating...</span></>) : (<><Sparkles className="h-4 w-4" /><span>Generate Portfolio</span></>)}
                </button>
                <button onClick={handleLogout} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center space-x-2"><LogOut className="h-4 w-4" /><span>Logout</span></button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {currentStep === 1 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
                <p className="text-gray-600">Select a template that matches your style</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map(template => (
                  <div key={template.id} className={`border-2 rounded-xl overflow-hidden transition-all cursor-pointer hover:shadow-lg ${selectedTemplate?.id === template.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`} onClick={() => handleTemplateSelect(template)}>
                    <div className={`h-48 ${template.color} relative`}>
                      {selectedTemplate?.id === template.id && (<div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full"><Check className="h-5 w-5" /></div>)}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <h3 className="text-xl font-bold text-white">{template.name}</h3>
                        <p className="text-white/80 text-sm">{template.description}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">{template.category}</span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"></button>
                      </div>
                      <div className="flex flex-wrap gap-2">{template.features.map((f, idx) => (<span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">{f}</span>))}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button onClick={() => selectedTemplate && setCurrentStep(2)} disabled={!selectedTemplate} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"><span>Continue to Details</span><ArrowRight className="h-5 w-5" /></button>
              </div>
              {errors.template && (<div className="mt-3 text-red-600 text-sm flex items-center space-x-1"><AlertCircle className="h-4 w-4" /><span>{errors.template}</span></div>)}
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Details</h2>
                  <p className="text-gray-600">Fill in your information for the portfolio</p>
                </div>
                <button onClick={() => setCurrentStep(1)} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"><ArrowRight className="h-5 w-5 rotate-180" /><span>Back to Templates</span></button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"><User className="h-4 w-4" /><span>Full Name *</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="John Doe" />
                    {errors.name && (<div className="text-red-600 text-sm mt-1">{errors.name}</div>)}
                  </div>

                  {/* Profession with validation */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"><Briefcase className="h-4 w-4" /><span>Profession *</span></label>
                    <select name="profession" value={formData.profession} onChange={handleInputChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white ${errors.profession ? 'border-red-500' : 'border-gray-300'}`}>
                      <option value="">Select your profession</option>
                      {professionOptions.map(p => (<option key={p} value={p}>{p}</option>))}
                    </select>
                    {errors.profession && (<div className="text-red-600 text-sm mt-1 flex items-center space-x-1"><AlertCircle className="h-3 w-3" /><span>{errors.profession}</span></div>)}
                  </div>

                  {/* Skills with suggestions and validation */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"><Zap className="h-4 w-4" /><span>Skills *</span></label>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={e => setNewSkill(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && validateAndAddSkill()}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Add a skill (press Enter)"
                        disabled={validating}
                      />
                      <select value={newSkillLevel} onChange={e => setNewSkillLevel(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg bg-white">
                        {skillLevels.map(level => (<option key={level}>{level}</option>))}
                      </select>
                      <button onClick={validateAndAddSkill} disabled={validating} className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 disabled:opacity-50">
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Skill Validation Error with Suggestions */}
                    {errors.skillValidation && (
                      <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.skillValidation}
                        </p>
                        {errors.skillSuggestionsList && errors.skillSuggestionsList.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 mb-1">Did you mean?</p>
                            <div className="flex flex-wrap gap-2">
                              {errors.skillSuggestionsList.map((suggestion, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setNewSkill(suggestion)}
                                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Skill Suggestions */}
                    {formData.profession && showSkillSuggestions && currentSkillSuggestions.length > 0 && (
                      <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-700 flex items-center"><Lightbulb className="h-4 w-4 mr-1" /> Suggested Skills</span>
                          <button onClick={() => setShowSkillSuggestions(false)} className="text-blue-500 hover:text-blue-700"><X className="h-3 w-3" /></button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentSkillSuggestions.map((suggestion, idx) => (
                            <button key={idx} onClick={() => addSuggestedSkill(suggestion)} className="px-3 py-1 bg-white text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors">+ {suggestion}</button>
                          ))}
                        </div>
                      </div>
                    )}

                    {errors.skills && (<div className="text-red-600 text-sm mb-2">{errors.skills}</div>)}
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((s, i) => (
                        <div key={i} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full flex items-center space-x-2">
                          <span className="font-medium">{s.name}</span>
                          <span className="text-xs px-2 py-0.5 bg-white text-blue-700 rounded-full">{s.level}</span>
                          <button onClick={() => removeSkill(s.name)} className="hover:text-red-600"><X className="h-4 w-4" /></button>
                        </div>
                      ))}
                    </div>

                    {/* Professional Links */}
                    <div className="mt-4">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"><Link className="h-4 w-4" /><span>Professional Links</span></label>
                      <div className="grid grid-cols-1 gap-2">
                        <input type="url" name="github" value={professionalLinks.github} onChange={handleProfessionalLinkChange} placeholder="GitHub URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        <input type="url" name="linkedin" value={professionalLinks.linkedin} onChange={handleProfessionalLinkChange} placeholder="LinkedIn URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        <input type="url" name="portfolio" value={professionalLinks.portfolio} onChange={handleProfessionalLinkChange} placeholder="Portfolio / Gallery URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                  </div>

                  {/* Certifications with validation */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"><Award className="h-4 w-4" /><span>Certifications</span></label>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={newCertification}
                        onChange={e => setNewCertification(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && validateAndAddCertification()}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Add a certification (press Enter)"
                        disabled={validating}
                      />
                      <button onClick={validateAndAddCertification} disabled={validating} className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 disabled:opacity-50"><Plus className="h-5 w-5" /></button>
                    </div>
                    {errors.certValidation && (
                      <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.certValidation}
                        </p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {formData.certifications.map((c, idx) => (
                        <div key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full flex items-center space-x-1">
                          <span>{c}</span>
                          <button onClick={() => removeCertification(c)} className="hover:text-red-600"><X className="h-4 w-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hobbies with validation */}
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Heart className="h-4 w-4" /><span>Hobbies & Interests</span>
                    </label>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={newHobby}
                        onChange={e => setNewHobby(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && validateAndAddHobby()}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Add a hobby (press Enter)"
                        disabled={validating}
                      />
                      <button onClick={validateAndAddHobby} disabled={validating} className="px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 disabled:opacity-50">
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Hobby Validation Error */}
                    {errors.hobbyValidation && (
                      <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.hobbyValidation}
                        </p>
                      </div>
                    )}

                    {/* Hobby Suggestions */}
                    {formData.profession && showHobbySuggestions && hobbySuggestions.length > 0 && (
                      <div className="mb-3 p-3 bg-pink-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-pink-700 flex items-center">
                            <Lightbulb className="h-4 w-4 mr-1" /> Suggested Hobbies
                          </span>
                          <button onClick={() => setShowHobbySuggestions(false)} className="text-pink-500 hover:text-pink-700">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {hobbySuggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => addSuggestedHobby(suggestion)}
                              className="px-3 py-1 bg-white text-pink-600 rounded-full text-sm hover:bg-pink-100 transition-colors"
                            >
                              + {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {formData.hobbies.map((h, idx) => (
                        <div key={idx} className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full flex items-center space-x-1">
                          <span>{h}</span>
                          <button onClick={() => removeHobby(h)} className="hover:text-red-600">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* About with AI generation and validation */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700"><Type className="h-4 w-4" /><span>About Yourself *</span></label>
                      <button onClick={generateAboutWithAI} disabled={validating} className="px-3 py-1 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 flex items-center space-x-1 disabled:opacity-50">
                        <Sparkles className="h-3 w-3" /><span>{validating ? 'Generating...' : 'Generate with AI'}</span>
                      </button>
                    </div>
                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleInputChange}
                      onBlur={validateAboutContent}
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      placeholder="Tell us about yourself, your experience, and what you do..."
                    />
                    {errors.about && (<div className="text-red-600 text-sm mt-1">{errors.about}</div>)}
                    {errors.aboutValidation && (<div className="text-red-600 text-sm mt-1">{errors.aboutValidation}</div>)}
                  </div>

                  {/* Projects Section - Dynamic title */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700"><FolderOpen className="h-4 w-4" /><span>{professionMeta.label} *</span></label>
                      {formData.projects.length > 0 && <span className="text-xs text-gray-500">{professionMeta.description}</span>}
                    </div>
                    <div className="space-y-3 mb-3">
                      <div className="flex space-x-2">
                        <input type="text" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder={`${professionMeta.label} title`} />
                        <button onClick={addProject} className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"><Plus className="h-5 w-5" /></button>
                      </div>
                      <textarea value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none" placeholder="Project description" rows="2" />
                    </div>
                    <div className="space-y-3">
                      {formData.projects.map((project, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{project.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button onClick={() => improveProjectDescription(idx)} disabled={validating} className="text-purple-600 hover:text-purple-700 disabled:opacity-50" title="Improve with AI"><Sparkles className="h-4 w-4" /></button>
                              <button onClick={() => removeProject(project.title)} className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education - Conditional with validation */}
                  {shouldShowEducation() && (
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"><GraduationCap className="h-4 w-4" /><span>Education</span></label>
                      <div className="space-y-3 mb-3">
                        <div className="grid grid-cols-3 gap-2">
                          <input type="text" value={newEducation.degree} onChange={e => setNewEducation({ ...newEducation, degree: e.target.value })} placeholder="Degree" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                          <input type="text" value={newEducation.institution} onChange={e => setNewEducation({ ...newEducation, institution: e.target.value })} placeholder="Institution" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                          <input
                            type="text"
                            value={newEducation.year}
                            onChange={e => setNewEducation({ ...newEducation, year: e.target.value })}
                            placeholder="Year (e.g., 2020)"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                        </div>
                        {errors.educationValidation && (
                          <p className="text-red-600 text-xs mt-1">{errors.educationValidation}</p>
                        )}
                        <button onClick={addEducation} className="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Plus className="h-5 w-5 inline mr-1" /> Add Education</button>
                      </div>
                      <div className="space-y-2">
                        {formData.education.map((edu, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                            <div><p className="font-semibold text-gray-900">{edu.degree}</p><p className="text-sm text-gray-600">{edu.institution}</p>{edu.year && <p className="text-xs text-gray-500">{edu.year}</p>}</div>
                            <button onClick={() => removeEducation(idx)} className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Experience - Conditional with validation */}
                  {shouldShowExperience() && (
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"><Briefcase className="h-4 w-4" /><span>Experience</span></label>
                      <div className="space-y-3 mb-3">
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" value={newExperience.role} onChange={e => setNewExperience({ ...newExperience, role: e.target.value })} placeholder="Role" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                          <input type="text" value={newExperience.company} onChange={e => setNewExperience({ ...newExperience, company: e.target.value })} placeholder="Company" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                          <input
                            type="text"
                            value={newExperience.duration}
                            onChange={e => setNewExperience({ ...newExperience, duration: e.target.value })}
                            placeholder="Duration (e.g., 2022-Present, 3 years)"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none col-span-2"
                          />
                        </div>
                        {errors.experienceValidation && (
                          <p className="text-red-600 text-xs mt-1">{errors.experienceValidation}</p>
                        )}
                        <button onClick={addExperience} className="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Plus className="h-5 w-5 inline mr-1" /> Add Experience</button>
                      </div>
                      <div className="space-y-2">
                        {formData.experience.map((exp, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                            <div><p className="font-semibold text-gray-900">{exp.role}</p><p className="text-sm text-gray-600">{exp.company}</p>{exp.duration && <p className="text-xs text-gray-500">{exp.duration}</p>}</div>
                            <button onClick={() => removeExperience(idx)} className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"><Mail className="h-4 w-4" /><span>Email *</span></label>
                      <input type="email" name="email" value={formData.contactDetails.email} onChange={handleContactChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="hello@example.com" />
                      {errors.email && (<div className="text-red-600 text-sm mt-1">{errors.email}</div>)}
                    </div>
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2"><Phone className="h-4 w-4" /><span>Mobile Number *</span></label>
                      <input type="tel" name="mobile" value={formData.contactDetails.mobile} onChange={handleContactChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="+1 (555) 123-4567" />
                      {errors.mobile && (<div className="text-red-600 text-sm mt-1">{errors.mobile}</div>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Template Preview */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Template</h3>
                {selectedTemplate ? (
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${selectedTemplate.color} rounded-lg`} />
                    <div><h4 className="font-bold text-gray-900">{selectedTemplate.name}</h4><p className="text-gray-600 text-sm">{selectedTemplate.description}</p></div>
                  </div>
                ) : (<p className="text-gray-500">No template selected</p>)}
              </div>

              {/* Buttons */}
              <div className="mt-8 flex justify-end space-x-4">
                <button onClick={() => setCurrentStep(1)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={generatePortfolio} disabled={isGenerating} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2">
                  {isGenerating ? (<><div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" /></>) : (<Sparkles className="h-5 w-5" />)}<span>Generate Portfolio</span>
                </button>
              </div>
              {errors.submit && (<div className="mt-3 text-red-600 text-sm flex items-center space-x-1"><AlertCircle className="h-4 w-4" /><span>{errors.submit}</span></div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;