
import React, { useState } from 'react';
import { Calendar, MapPin, Building, Clock } from 'lucide-react';

export const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(0);

  const experiences = [
    {
      id: 0,
      company: 'Tech Innovations Inc.',
      position: 'Senior Software Developer',
      location: 'Remote',
      duration: '2022 - Present',
      type: 'Full-time',
      description: 'Leading development of scalable web applications and mentoring junior developers.',
      achievements: [
        'Led team of 5 developers in building e-commerce platform',
        'Reduced application load time by 40% through optimization',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Mentored 3 junior developers with 100% retention rate'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
    },
    {
      id: 1,
      company: 'Digital Solutions Ltd.',
      position: 'Full Stack Developer',
      location: 'San Francisco, CA',
      duration: '2020 - 2022',
      type: 'Full-time',
      description: 'Developed responsive web applications and real-time features.',
      achievements: [
        'Built responsive interfaces serving 50K+ daily users',
        'Integrated real-time chat using WebSocket technology',
        'Improved user experience metrics by 35%',
        'Collaborated with cross-functional teams in agile environment'
      ],
      technologies: ['Vue.js', 'Python', 'MongoDB', 'Docker', 'Redis']
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      location: 'New York, NY',
      duration: '2019 - 2020',
      type: 'Full-time',
      description: 'Focused on creating engaging user interfaces and mobile-first experiences.',
      achievements: [
        'Developed mobile-first responsive designs',
        'Integrated multiple third-party APIs',
        'Participated in agile development process',
        'Delivered projects consistently ahead of schedule'
      ],
      technologies: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Sass']
    }
  ];

  return (
    <div className="h-full bg-white">
      {/* Task Manager Header */}
      <div className="bg-gray-100 border-b p-3 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        <span className="font-medium text-gray-800">Work Experience Timeline</span>
        <div className="ml-auto text-sm text-gray-600">
          {experiences.length} positions • {new Date().getFullYear() - 2019} years experience
        </div>
      </div>

      <div className="flex h-full">
        {/* Timeline Sidebar */}
        <div className="w-80 bg-gray-50 border-r p-4 overflow-y-auto">
          <h3 className="font-semibold text-gray-800 mb-4">Timeline</h3>
          <div className="space-y-3">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`
                  cursor-pointer p-3 rounded-lg border transition-all
                  ${selectedExperience === index 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-white hover:border-blue-300 hover:shadow-sm'
                  }
                `}
                onClick={() => setSelectedExperience(index)}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    w-3 h-3 rounded-full mt-1 flex-shrink-0
                    ${selectedExperience === index ? 'bg-white' : 'bg-blue-500'}
                  `} />
                  <div className="min-w-0">
                    <h4 className={`font-medium text-sm ${selectedExperience === index ? 'text-white' : 'text-gray-800'}`}>
                      {exp.position}
                    </h4>
                    <p className={`text-xs ${selectedExperience === index ? 'text-blue-100' : 'text-gray-600'}`}>
                      {exp.company}
                    </p>
                    <p className={`text-xs ${selectedExperience === index ? 'text-blue-100' : 'text-gray-500'}`}>
                      {exp.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Details */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedExperience !== null && (
            <div className="max-w-3xl">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {experiences[selectedExperience].position}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {experiences[selectedExperience].company}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {experiences[selectedExperience].location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {experiences[selectedExperience].duration}
                  </div>
                  <div className="px-2 py-1 bg-green-100 text-green-800 rounded">
                    {experiences[selectedExperience].type}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Role Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {experiences[selectedExperience].description}
                </p>
              </div>

              {/* Key Achievements */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Key Achievements</h2>
                <ul className="space-y-2">
                  {experiences[selectedExperience].achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {experiences[selectedExperience].technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
