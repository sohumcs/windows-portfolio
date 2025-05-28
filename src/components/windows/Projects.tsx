
import React, { useState } from 'react';
import { Folder, File, ExternalLink, Github } from 'lucide-react';

export const Projects = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const projects = [
    {
      id: 'web-apps',
      name: 'Web Applications',
      type: 'folder',
      items: [
        { name: 'E-Commerce Platform', type: 'file', tech: 'React, Node.js, PostgreSQL', demo: '#', github: '#' },
        { name: 'Social Media Dashboard', type: 'file', tech: 'Vue.js, Express, MongoDB', demo: '#', github: '#' },
        { name: 'Task Management App', type: 'file', tech: 'React, Firebase, Tailwind', demo: '#', github: '#' },
      ]
    },
    {
      id: 'mobile-apps',
      name: 'Mobile Applications',
      type: 'folder',
      items: [
        { name: 'Fitness Tracker', type: 'file', tech: 'React Native, Firebase', demo: '#', github: '#' },
        { name: 'Weather App', type: 'file', tech: 'Flutter, OpenWeather API', demo: '#', github: '#' },
      ]
    },
    {
      id: 'ai-projects',
      name: 'AI & Machine Learning',
      type: 'folder',
      items: [
        { name: 'Chatbot Assistant', type: 'file', tech: 'Python, TensorFlow, NLP', demo: '#', github: '#' },
        { name: 'Image Recognition Tool', type: 'file', tech: 'Python, OpenCV, PyTorch', demo: '#', github: '#' },
      ]
    },
    {
      id: 'games',
      name: 'Game Development',
      type: 'folder',
      items: [
        { name: '2D Puzzle Game', type: 'file', tech: 'Unity, C#', demo: '#', github: '#' },
        { name: 'Web-based RPG', type: 'file', tech: 'JavaScript, Canvas API', demo: '#', github: '#' },
      ]
    }
  ];

  return (
    <div className="h-full bg-white">
      {/* Explorer Header */}
      <div className="bg-gray-100 border-b p-2 flex items-center gap-2">
        <div className="text-sm breadcrumbs">
          <span>My Computer</span>
          <span className="mx-2">›</span>
          <span>Projects</span>
          {selectedFolder && (
            <>
              <span className="mx-2">›</span>
              <span>{projects.find(p => p.id === selectedFolder)?.name}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50 border-r p-2">
          <div className="text-sm font-medium text-gray-600 mb-2">Folders</div>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedFolder(null)}
              className={`w-full text-left p-2 rounded text-sm hover:bg-blue-500 hover:text-white transition-colors ${!selectedFolder ? 'bg-blue-500 text-white' : ''}`}
            >
              📁 All Projects
            </button>
            {projects.map(project => (
              <button
                key={project.id}
                onClick={() => setSelectedFolder(project.id)}
                className={`w-full text-left p-2 rounded text-sm hover:bg-blue-500 hover:text-white transition-colors ${selectedFolder === project.id ? 'bg-blue-500 text-white' : ''}`}
              >
                📁 {project.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {!selectedFolder ? (
            // Show all folders
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {projects.map(project => (
                <div
                  key={project.id}
                  className="cursor-pointer p-4 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all"
                  onClick={() => setSelectedFolder(project.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <Folder className="w-12 h-12 text-yellow-600 mb-2" />
                    <span className="font-medium text-gray-800">{project.name}</span>
                    <span className="text-xs text-gray-500">{project.items.length} items</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Show folder contents
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                {projects.find(p => p.id === selectedFolder)?.name}
              </h2>
              <div className="space-y-3">
                {projects.find(p => p.id === selectedFolder)?.items.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <File className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.tech}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title="View Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                          title="View Code"
                        >
                          <Github className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
