
import React from 'react';
import { Monitor, Code, Coffee, Gamepad2 } from 'lucide-react';

export const AboutMe = () => {
  return (
    <div className="p-6 h-full bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* System Properties Header */}
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <Monitor className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">System Properties</h1>
            <p className="text-gray-600">Developer Edition - Professional Portfolio</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Section */}
          <div className="bg-white rounded-lg p-6 shadow-md border">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">User Profile</h2>
            <div className="space-y-3">
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  DEV
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name:</label>
                <p className="text-gray-800 font-medium">Passionate Software Developer</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Role:</label>
                <p className="text-gray-800 font-medium">Full Stack Developer</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Location:</label>
                <p className="text-gray-800 font-medium">Remote / Global</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status:</label>
                <p className="text-green-600 font-medium">● Available for opportunities</p>
              </div>
            </div>
          </div>

          {/* System Specs */}
          <div className="bg-white rounded-lg p-6 shadow-md border">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Technical Specifications</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Primary Languages:</span>
              </div>
              <div className="ml-6 text-gray-700">
                JavaScript, TypeScript, Python, Java
              </div>
              
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Frameworks:</span>
              </div>
              <div className="ml-6 text-gray-700">
                React, Node.js, Express, Django, Spring Boot
              </div>
              
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Databases:</span>
              </div>
              <div className="ml-6 text-gray-700">
                PostgreSQL, MongoDB, Redis, MySQL
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="bg-white rounded-lg p-6 shadow-md border md:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Fun Facts & Achievements</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Gamepad2 className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-800">Gaming Enthusiast</h3>
                  <p className="text-sm text-gray-600">Love building game mechanics and interactive experiences</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Coffee className="w-5 h-5 text-brown-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-800">Coffee Powered</h3>
                  <p className="text-sm text-gray-600">Average 4 cups per day, best code written at 2 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-gray-700 italic">
            "Code is poetry written in logic. Every bug is a puzzle waiting to be solved, 
            and every feature is a story waiting to be told."
          </p>
        </div>
      </div>
    </div>
  );
};
