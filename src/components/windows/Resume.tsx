
import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';

export const Resume = () => {
  return (
    <div className="h-full bg-white">
      {/* Notepad Header */}
      <div className="bg-gray-100 border-b p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span className="text-sm">Resume.txt - Notepad</span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            <Download className="w-3 h-3 inline mr-1" />
            Download
          </button>
          <button className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
            <Printer className="w-3 h-3 inline mr-1" />
            Print
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="p-6 font-mono text-sm leading-6 h-full overflow-auto">
        <div className="max-w-4xl">
          <pre className="whitespace-pre-wrap">
{`================================================================================
                              RESUME.TXT
================================================================================

FULL NAME: [Your Name]
EMAIL: developer@email.com
PHONE: +1 (555) 123-4567
LOCATION: Remote / Global
PORTFOLIO: https://yourportfolio.dev
LINKEDIN: linkedin.com/in/yourprofile
GITHUB: github.com/yourusername

================================================================================
                              SUMMARY
================================================================================

Passionate Full Stack Developer with 5+ years of experience building scalable
web applications and mobile solutions. Expertise in modern JavaScript
frameworks, cloud technologies, and agile development practices.

Key Strengths:
• Frontend: React, Vue.js, TypeScript, Tailwind CSS
• Backend: Node.js, Python, Express, Django
• Database: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes
• Methodologies: Agile, TDD, CI/CD

================================================================================
                           WORK EXPERIENCE
================================================================================

[2022 - Present] SENIOR SOFTWARE DEVELOPER
Tech Innovations Inc. | Remote
• Led development of e-commerce platform serving 100K+ users
• Reduced page load times by 40% through code optimization
• Mentored 3 junior developers and conducted code reviews
• Technologies: React, Node.js, PostgreSQL, AWS

[2020 - 2022] FULL STACK DEVELOPER  
Digital Solutions Ltd. | San Francisco, CA
• Built responsive web applications using React and Express
• Implemented real-time features using WebSocket technology
• Collaborated with UX team to improve user experience by 35%
• Technologies: Vue.js, Python, MongoDB, Docker

[2019 - 2020] FRONTEND DEVELOPER
StartupXYZ | New York, NY
• Developed mobile-first responsive interfaces
• Integrated RESTful APIs and third-party services
• Participated in agile sprint planning and daily standups
• Technologies: JavaScript, HTML5, CSS3, React

================================================================================
                              EDUCATION
================================================================================

[2015 - 2019] BACHELOR OF SCIENCE IN COMPUTER SCIENCE
University of Technology | GPA: 3.8/4.0

Relevant Coursework:
• Data Structures and Algorithms
• Software Engineering Principles
• Database Management Systems
• Computer Networks and Security

================================================================================
                           PROJECTS & ACHIEVEMENTS
================================================================================

🏆 HACKATHON WINNER (2023)
Built AI-powered productivity app in 48 hours - 1st place out of 150 teams

🚀 OPEN SOURCE CONTRIBUTOR
Contributed to popular React libraries with 10K+ downloads

📱 MOBILE APP SUCCESS
Published iOS/Android app with 50K+ downloads and 4.8★ rating

🎯 PERFORMANCE OPTIMIZATION
Improved application performance by 60% through database optimization

================================================================================
                            CERTIFICATIONS
================================================================================

• AWS Certified Solutions Architect (2023)
• MongoDB Certified Developer (2022)
• React Developer Certification (2021)

================================================================================
                               SKILLS
================================================================================

PROGRAMMING LANGUAGES:
JavaScript (ES6+), TypeScript, Python, Java, Go

FRONTEND TECHNOLOGIES:
React, Vue.js, Angular, HTML5, CSS3, Sass, Tailwind CSS

BACKEND TECHNOLOGIES:
Node.js, Express, Django, Flask, Spring Boot

DATABASES:
PostgreSQL, MongoDB, MySQL, Redis, DynamoDB

CLOUD & DEVOPS:
AWS, Docker, Kubernetes, Jenkins, GitHub Actions

TOOLS & OTHERS:
Git, Webpack, Vite, Jest, Cypress, Figma

================================================================================
                              INTERESTS
================================================================================

• Open Source Contribution
• Game Development (Unity, WebGL)
• AI/Machine Learning Exploration
• Tech Community Mentoring
• Competitive Programming

================================================================================
                            END OF RESUME
================================================================================

Last Updated: ${new Date().toLocaleDateString()}
Generated by: Portfolio OS - Developer Edition
`}
          </pre>
        </div>
      </div>
    </div>
  );
};
