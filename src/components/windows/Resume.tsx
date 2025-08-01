
import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';

export const Resume = () => {
  const handleDownload = () => {
    const element = document.createElement('a');
    const resumeContent = `SOHUM CHANDRA SRIVASTAVA
================================================================================

Indian Citizen | sohum611@gmail.com | +91-9560978340
LinkedIn: sohumcs | GitHub: sohumcs

================================================================================
                                EDUCATION
================================================================================

SRM INSTITUTE OF TECHNOLOGY                               Chennai, Tamil Nadu
B.Tech in Computer Science and Engineering                   Expected: May 2027
• Concentration: Artificial Intelligence, Machine Learning, Data Science, 
  and Computational Modeling
• CGPA: 9.48/10.00
• Related Coursework: Data Structures & Algorithms, Objects & Design, 
  Computer Organization & Architecture, Machine Learning, Artificial 
  Intelligence, Object-Oriented Programming, Statistics & Applications

================================================================================
                               EXPERIENCE
================================================================================

D-TOWN ROBOTICS                                            Noida, Uttar Pradesh
Software Development Engineering Intern                        Dec 2024 - Jan 2025
• Developed GCS software in Python, boosting telemetry analysis and mission 
  planning efficiency by 50%
• Transformed models on UAV imagery, improving field classification by 60% 
  and enabling automated terrain analysis

OUTLIER AI                                                 Oakland, California
AI Engineering Intern (Remote)                                Jun 2024 - Current
• Optimized AI models for disaster simulations, increasing response accuracy 
  and decision-making efficiency by 70%
• Integrated AI-driven optimizations with a cross-functional team, reducing 
  predictive models and enhancing simulation outcomes by 60%

AIML VIRTUAL INTERN                                      Chennai, Tamil Nadu
AI/ML Intern                                                   Nov 2023 - Jan 2024
• Boosted AI model accuracy by 10% through data analysis, feature engineering, 
  and hyperparameter tuning using TensorFlow and Google Cloud AI
• Developed and deployed scalable AI systems with DialogFlow, improving user 
  interaction efficiency by 20% through optimized NLP algorithms

GOOGLE                                                     Chennai, Tamil Nadu
Software Development Intern (Remote)                                  Nov 2023 - Jan 2024
• Enhanced conversational AI systems with DialogFlow, improving user 
  interaction efficiency by 20% through optimized NLP algorithms

================================================================================
                                PROJECTS
================================================================================

VARI UAV APP                                              Noida, Uttar Pradesh
Team Lead                                                     Dec 2024 - Jan 2025
• Developed and deployed the Vari Android App using Kotlin, integrating a 
  custom AI model to enhance user experience and increase engagement by 30%
• Utilized Vari's index values to drive ML model predictions and real-time 
  data processing using OpenCV, improving app functionality by 40%

AFS TRAINING ACADEMY WEBSITE                              Lucknow, Uttar Pradesh
Client Project                                                Dec 2024 - Jan 2025
• Collaborated in the development of a full-stack website for AFS Training 
  Academy, building a responsive frontend with React and integrating a 
  scalable backend using Flask
• Implemented dynamic features improving user experience and system 
  performance by 35%

================================================================================
                         ACTIVITIES AND LEADERSHIP
================================================================================

LOTUS VALLEY INTERNATIONAL SCHOOL                        Noida, Uttar Pradesh
Technical Lead                                                Jul 2022 - Mar 2023
• Managed the technical aspects of events and led teams to successfully 
  implement innovative technical solutions

PLACTV'S (SRM STUDENT PLACEMENT TEAM)                   Chennai, Tamil Nadu
Member                                                        Aug 2023 - Current
• Managed the placement process for thousands of students, coordinating with 
  multiple companies to streamline recruitment and optimize interview scheduling

================================================================================
                                 SKILLS
================================================================================

Programming Languages: Java, Python, JavaScript, HTML/CSS, SQL, Node.js, 
                      React.js, Kotlin, C++, C, C#, Flask

Tools: Android Studio, IntelliJ, PyCharm, Jupyter Notebooks, Git, 
       Bootstrap, Spring Boot, Visual Studio

================================================================================
                              ACHIEVEMENTS
================================================================================

• IOT University-Wide Project Contest Award Winner
• Lotus Valley International School Technical Excellence Award (2023)

================================================================================
Last Updated: ${new Date().toLocaleDateString()}
Generated by: Sohum Chandra Srivastava Portfolio OS - Windows 95 Edition
================================================================================`;

    const file = new Blob([resumeContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Sohum_Chandra_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-full bg-white">
      {/* Notepad Header */}
      <div className="bg-gray-100 border-b p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span className="text-sm">Resume.txt - Notepad</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleDownload}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <Download className="w-3 h-3 inline mr-1" />
            Download
          </button>
          <button 
            onClick={handlePrint}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            <Printer className="w-3 h-3 inline mr-1" />
            Print
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="p-6 font-mono text-sm leading-6 h-full overflow-auto">
        <div className="max-w-4xl">
          <pre className="whitespace-pre-wrap">
{`                             SOHUM CHANDRA SRIVASTAVA
================================================================================

Indian Citizen | sohum611@gmail.com | +91-9560978340
LinkedIn: sohumcs | GitHub: sohumcs

================================================================================
                                EDUCATION
================================================================================

SRM INSTITUTE OF TECHNOLOGY                               Chennai, Tamil Nadu
B.Tech in Computer Science and Engineering                   Expected: May 2027
• Concentration: Artificial Intelligence, Machine Learning, Data Science, 
  and Computational Modeling
• CGPA: 9.48/10.00
• Related Coursework: Data Structures & Algorithms, Objects & Design, 
  Computer Organization & Architecture, Machine Learning, Artificial 
  Intelligence, Object-Oriented Programming, Statistics & Applications

================================================================================
                               EXPERIENCE
================================================================================

D-TOWN ROBOTICS                                            Noida, Uttar Pradesh
Software Development Engineering Intern                        Dec 2024 - Jan 2025
• Developed GCS software in Python, boosting telemetry analysis and mission 
  planning efficiency by 50%
• Transformed models on UAV imagery, improving field classification by 60% 
  and enabling automated terrain analysis

OUTLIER AI                                                 Oakland, California
AI Engineering Intern (Remote)                                Jun 2024 - Current
• Optimized AI models for disaster simulations, increasing response accuracy 
  and decision-making efficiency by 70%
• Integrated AI-driven optimizations with a cross-functional team, reducing 
  predictive models and enhancing simulation outcomes by 60%

AIML VIRTUAL INTERN                                      Chennai, Tamil Nadu
AI/ML Intern                                                   Nov 2023 - Jan 2024
• Boosted AI model accuracy by 10% through data analysis, feature engineering, 
  and hyperparameter tuning using TensorFlow and Google Cloud AI
• Developed and deployed scalable AI systems with DialogFlow, improving user 
  interaction efficiency by 20% through optimized NLP algorithms

GOOGLE                                                     Chennai, Tamil Nadu
Software Development Intern (Remote)                                  Nov 2023 - Jan 2024
• Enhanced conversational AI systems with DialogFlow, improving user 
  interaction efficiency by 20% through optimized NLP algorithms

================================================================================
                                PROJECTS
================================================================================

VARI UAV APP                                              Noida, Uttar Pradesh
Team Lead                                                     Dec 2024 - Jan 2025
• Developed and deployed the Vari Android App using Kotlin, integrating a 
  custom AI model to enhance user experience and increase engagement by 30%
• Utilized Vari's index values to drive ML model predictions and real-time 
  data processing using OpenCV, improving app functionality by 40%

AFS TRAINING ACADEMY WEBSITE                              Lucknow, Uttar Pradesh
Client Project                                                Dec 2024 - Jan 2025
• Collaborated in the development of a full-stack website for AFS Training 
  Academy, building a responsive frontend with React and integrating a 
  scalable backend using Flask
• Implemented dynamic features improving user experience and system 
  performance by 35%

================================================================================
                         ACTIVITIES AND LEADERSHIP
================================================================================

LOTUS VALLEY INTERNATIONAL SCHOOL                        Noida, Uttar Pradesh
Technical Lead                                                Jul 2022 - Mar 2023
• Managed the technical aspects of events and led teams to successfully 
  implement innovative technical solutions

PLACTV'S (SRM STUDENT PLACEMENT TEAM)                   Chennai, Tamil Nadu
Member                                                        Aug 2023 - Current
• Managed the placement process for thousands of students, coordinating with 
  multiple companies to streamline recruitment and optimize interview scheduling

================================================================================
                                 SKILLS
================================================================================

Programming Languages: Java, Python, JavaScript, HTML/CSS, SQL, Node.js, 
                      React.js, Kotlin, C++, C, C#, Flask

Tools: Android Studio, IntelliJ, PyCharm, Jupyter Notebooks, Git, 
       Bootstrap, Spring Boot, Visual Studio

================================================================================
                              ACHIEVEMENTS
================================================================================

• Lotus Valley International School Technical Excellence Award (2023)
• IOT University-Wide Project Contest Award Winner

================================================================================
Last Updated: ${new Date().toLocaleDateString()}
Generated by: Sohum Chandra Srivastava Portfolio OS - Windows 95 Edition
================================================================================`
}
          </pre>
        </div>
      </div>
    </div>
  );
};
