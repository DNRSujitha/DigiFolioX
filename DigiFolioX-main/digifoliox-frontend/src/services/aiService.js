// src/services/aiService.js

class AIService {
  constructor() {
    // Try to get API keys from environment variables
    this.openAIKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.geminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    
    // Choose which API to use (prefer Gemini as it has free tier)
    this.apiType = this.geminiKey ? 'gemini' : (this.openAIKey ? 'openai' : 'none');
    
    console.log(`AI Service initialized with: ${this.apiType === 'none' ? 'Fallback Mode (No API Key)' : `${this.apiType.toUpperCase()} API Mode`}`);
  }

  // ========== API CALL METHODS ==========
  
  async callGemini(prompt) {
  try {
    // Use the correct endpoint and model
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${this.geminiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return null;
    }
    
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error('Gemini API error:', error);
    return null;
  }
}

  async callOpenAI(prompt) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.openAIKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      if (!response.ok) throw new Error('OpenAI API failed');
      const data = await response.json();
      return data.choices[0]?.message?.content || null;
    } catch (error) {
      console.error('OpenAI API error:', error);
      return null;
    }
  }

  async callAI(prompt) {
    if (this.apiType === 'gemini') {
      return await this.callGemini(prompt);
    } else if (this.apiType === 'openai') {
      return await this.callOpenAI(prompt);
    }
    return null;
  }

  // ========== HELPER FUNCTIONS ==========
  
  // Check if text contains gibberish (random letters)
  isGibberish(text) {
    if (!text) return true;
    
    const lowerText = text.toLowerCase();
    
    // Check for random consonant-vowel patterns
    const hasRandomPattern = /([bcdfghjklmnpqrstvwxyz]{4,})/i.test(lowerText);
    if (hasRandomPattern) return true;
    
    // Check for repeated letters (like "yyyy" or "uuuu")
    const hasRepeatedLetters = /([a-z])\1{3,}/i.test(lowerText);
    if (hasRepeatedLetters) return true;
    
    // Check if it has actual vowels (real words usually have vowels)
    const hasVowels = /[aeiou]/i.test(lowerText);
    if (!hasVowels && text.length > 3) return true;
    
    // Check for common skill/hobby patterns
    const commonWords = ['javascript', 'python', 'react', 'node', 'java', 'c++', 'c#', 'php', 'ruby', 
                         'swift', 'kotlin', 'go', 'rust', 'typescript', 'angular', 'vue', 'django',
                         'flask', 'spring', 'reading', 'writing', 'cooking', 'photography', 'travel',
                         'music', 'gaming', 'sports', 'yoga', 'meditation', 'painting', 'drawing'];
    
    if (commonWords.includes(lowerText)) return false;
    
    // Check if it's a real word (has at least one vowel and not all consonants)
    const wordChars = lowerText.replace(/[^a-z]/g, '');
    if (wordChars.length > 3 && !/[aeiou]/.test(wordChars)) return true;
    
    return false;
  }

  // ========== VALIDATION METHODS ==========
  
  async validateSkill(skillName) {
    // Basic validation
    if (!skillName || skillName.trim().length === 0) {
      return { isValid: false, suggestion: "Skill name cannot be empty" };
    }
    
    const trimmed = skillName.trim();
    
    if (trimmed.length < 1) {
      return { isValid: false, suggestion: "Skill name must be at least 1 character" };
    }
    if (trimmed.length > 30) {
      return { isValid: false, suggestion: "Skill name is too long (max 30 characters)" };
    }
    
    // Check for gibberish first
    if (this.isGibberish(trimmed)) {
      return { isValid: false, suggestion: "This doesn't look like a real skill. Please enter a valid skill name (e.g., JavaScript, Python, React)" };
    }
    
    // Check for valid characters
    const validChars = /^[a-zA-Z0-9\s\-.#+()]+$/;
    if (!validChars.test(trimmed)) {
      return { isValid: false, suggestion: "Use only letters, numbers, spaces, hyphens, dots, plus signs, or parentheses" };
    }
    
    // Common programming languages (allow single letters)
    const commonSkills = ['c', 'c++', 'c#', 'r', 'go', 'rust', 'swift', 'kotlin', 'php', 'ruby', 'dart', 'julia', 'lua'];
    if (commonSkills.includes(trimmed.toLowerCase())) {
      return { isValid: true, suggestion: null };
    }
    
    // Check if it's a real word (has vowels, not just consonants)
    const lettersOnly = trimmed.replace(/[^a-zA-Z]/g, '');
    if (lettersOnly.length > 2) {
      const hasVowel = /[aeiou]/i.test(lettersOnly);
      if (!hasVowel) {
        return { isValid: false, suggestion: "Skill name should contain vowels - this looks like random letters" };
      }
    }
    
    // AI validation if available
    if (this.apiType !== 'none') {
      const prompt = `Is "${trimmed}" a real professional skill? Respond with JSON: {"isValid": boolean, "suggestion": string}`;
      const aiResponse = await this.callAI(prompt);
      if (aiResponse) {
        try {
          return JSON.parse(aiResponse);
        } catch {
          // Fall through
        }
      }
    }
    
    return { isValid: true, suggestion: null };
  }

  async validateHobby(hobbyName) {
    // Basic validation
    if (!hobbyName || hobbyName.trim().length === 0) {
      return { isValid: false, suggestion: "Hobby name cannot be empty" };
    }
    
    const trimmed = hobbyName.trim();
    
    if (trimmed.length < 2) {
      return { isValid: false, suggestion: "Hobby name must be at least 2 characters" };
    }
    if (trimmed.length > 40) {
      return { isValid: false, suggestion: "Hobby name is too long (max 40 characters)" };
    }
    
    // Check for gibberish
    if (this.isGibberish(trimmed)) {
      return { isValid: false, suggestion: "This doesn't look like a real hobby. Please enter a valid hobby (e.g., Reading, Photography, Travel)" };
    }
    
    const validChars = /^[a-zA-Z\s\-&]+$/;
    if (!validChars.test(trimmed)) {
      return { isValid: false, suggestion: "Use only letters, spaces, hyphens, and ampersands" };
    }
    
    // Check if it's a real word (has vowels, not just consonants)
    const lettersOnly = trimmed.replace(/[^a-zA-Z]/g, '');
    if (lettersOnly.length > 2) {
      const hasVowel = /[aeiou]/i.test(lettersOnly);
      if (!hasVowel) {
        return { isValid: false, suggestion: "Hobby name should contain vowels - this looks like random letters" };
      }
    }
    
    // AI validation if available
    if (this.apiType !== 'none') {
      const prompt = `Is "${trimmed}" a real hobby or interest? Respond with JSON: {"isValid": boolean, "suggestion": string}`;
      const aiResponse = await this.callAI(prompt);
      if (aiResponse) {
        try {
          return JSON.parse(aiResponse);
        } catch {
          // Fall through
        }
      }
    }
    
    return { isValid: true, suggestion: null };
  }

  async validateCertification(certName) {
    // Basic validation
    if (!certName || certName.trim().length === 0) {
      return { isValid: false, suggestion: "Certification name cannot be empty" };
    }
    
    const trimmed = certName.trim();
    
    if (trimmed.length < 3) {
      return { isValid: false, suggestion: "Certification name must be at least 3 characters" };
    }
    if (trimmed.length > 60) {
      return { isValid: false, suggestion: "Certification name is too long (max 60 characters)" };
    }
    
    // Check for gibberish
    if (this.isGibberish(trimmed)) {
      return { isValid: false, suggestion: "This doesn't look like a real certification. Please enter a valid certification name" };
    }
    
    // AI validation if available
    if (this.apiType !== 'none') {
      const prompt = `Is "${trimmed}" a real professional certification? Respond with JSON: {"isValid": boolean, "suggestion": string}`;
      const aiResponse = await this.callAI(prompt);
      if (aiResponse) {
        try {
          return JSON.parse(aiResponse);
        } catch {
          // Fall through
        }
      }
    }
    
    return { isValid: true, suggestion: null };
  }

  async suggestValidSkill(input) {
    // Common skill mappings for typos/abbreviations
    const commonSkills = {
      'c': ['C Programming', 'C++', 'C#', 'C Language'],
      'js': ['JavaScript', 'React.js', 'Node.js', 'TypeScript'],
      'py': ['Python', 'Django', 'Flask', 'PyTorch'],
      'java': ['Java', 'Spring Boot', 'Java EE', 'Kotlin'],
      'react': ['React.js', 'React Native', 'Next.js'],
      'ang': ['Angular', 'AngularJS', 'TypeScript'],
      'vue': ['Vue.js', 'Nuxt.js', 'JavaScript'],
      'sql': ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB'],
      'mongodb': ['MongoDB', 'Mongoose', 'NoSQL'],
      'git': ['Git', 'GitHub', 'GitLab', 'Version Control'],
      'docker': ['Docker', 'Kubernetes', 'Containerization'],
      'aws': ['AWS', 'Amazon Web Services', 'Cloud Computing'],
      'azure': ['Microsoft Azure', 'Cloud Services'],
      'gcp': ['Google Cloud Platform', 'GCP'],
    };
    
    const lowerInput = input.toLowerCase().trim();
    
    // Check if input matches any common skill abbreviations
    for (const [key, suggestions] of Object.entries(commonSkills)) {
      if (lowerInput === key || lowerInput.includes(key)) {
        return suggestions;
      }
    }
    
    // AI-based suggestions if API available
    if (this.apiType !== 'none') {
      const prompt = `Based on "${input}", suggest 3 real professional skills that might be what they meant. Return as JSON array: ["skill1", "skill2", "skill3"]`;
      const aiResponse = await this.callAI(prompt);
      if (aiResponse) {
        try {
          return JSON.parse(aiResponse);
        } catch {
          // Fall through
        }
      }
    }
    
    // Fallback: return input with common extensions
    return [`${input} Programming`, `${input} Development`, `Advanced ${input}`];
  }

  async generateAbout(name, profession) {
    // AI generation if API available
    if (this.apiType !== 'none') {
      const prompt = `Write a professional about section for ${name}, who is a ${profession}. Make it personal, engaging, and highlight passion for their work. Keep it under 150 words.`;
      const aiResponse = await this.callAI(prompt);
      if (aiResponse) {
        return aiResponse;
      }
    }
    
    // Fallback templates
    const templates = [
      `I am ${name}, a passionate ${profession} with a strong commitment to excellence and innovation. My journey in this field has been driven by a desire to create meaningful impact and deliver exceptional results. I believe in continuous learning and staying at the forefront of industry trends to provide the best solutions for my clients and collaborators.`,
      
      `As a dedicated ${profession}, I bring creativity, expertise, and a solution-oriented mindset to every project. My name is ${name}, and I specialize in transforming ideas into reality through meticulous attention to detail and a deep understanding of my craft. I'm passionate about collaborating with others to achieve outstanding outcomes.`,
      
      `${name} here - a ${profession} who thrives on challenges and innovation. With years of experience in my field, I've developed a unique approach that combines technical expertise with creative thinking. My work is guided by a commitment to quality, integrity, and making a positive difference in everything I do.`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  }

  async improveDescription(title, description) {
    // AI improvement if API available
    if (this.apiType !== 'none') {
      const prompt = `Improve this project description for "${title}". Current: "${description || 'No description'}" Make it professional and highlight achievements. Keep it 2-3 sentences.`;
      const aiResponse = await this.callAI(prompt);
      if (aiResponse) {
        return aiResponse;
      }
    }
    
    // Fallback templates
    const templates = [
      `✨ ${description ? description + ' ' : ''}This ${title} project showcases my expertise in delivering high-quality solutions with a focus on user experience and functionality. Through careful planning and execution, I've created a product that meets and exceeds expectations.`,
      
      `✨ ${description ? description + ' ' : ''}A standout achievement in my portfolio, this ${title} demonstrates my ability to tackle complex challenges and deliver innovative results. The project highlights my skills in problem-solving, attention to detail, and commitment to excellence.`,
      
      `✨ ${description ? description + ' ' : ''}I'm particularly proud of this ${title} project, where I applied my expertise to create something truly special. The result demonstrates my capability to handle complex requirements while maintaining high standards of quality and creativity.`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  }

  async validateContent(text) {
    if (!text || text.trim().length < 10) {
      return { isValid: false, suggestion: "Content is too short. Please add more details (minimum 10 characters)." };
    }
    
    // Check for gibberish patterns
    const hasRandomConsonants = /([bcdfghjklmnpqrstvwxyz]{5,})/i.test(text);
    if (hasRandomConsonants) {
      return { isValid: false, suggestion: "Content contains too many consonants in a row. Please write meaningful content." };
    }
    
    // Check for repeated letters
    const hasRepeatedLetters = /([a-z])\1{4,}/i.test(text);
    if (hasRepeatedLetters) {
      return { isValid: false, suggestion: "Content contains repeated letters that look like gibberish. Please write meaningful content." };
    }
    
    // Check if it has actual words
    const words = text.split(/\s+/).filter(w => w.length > 2);
    const hasMeaningfulContent = words.length >= 3;
    
    if (!hasMeaningfulContent) {
      return { isValid: false, suggestion: "Please add more meaningful content (at least 3 words with 3+ letters each)." };
    }
    
    // Check if words are real (have vowels)
    const realWords = words.filter(word => /[aeiou]/i.test(word)).length;
    if (realWords < words.length / 2) {
      return { isValid: false, suggestion: "Most words don't contain vowels. Please write meaningful content." };
    }
    
    // AI validation if API available
    if (this.apiType !== 'none') {
      const prompt = `Is this meaningful professional content or random gibberish? Text: "${text.substring(0, 200)}" Respond with JSON: {"isValid": boolean, "suggestion": string}`;
      const aiResponse = await this.callAI(prompt);
      if (aiResponse) {
        try {
          return JSON.parse(aiResponse);
        } catch {
          // Fall through
        }
      }
    }
    
    return { isValid: true, suggestion: null };
  }
}

export default new AIService();