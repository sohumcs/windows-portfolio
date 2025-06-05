import React from "react";
import { Book, User, Code, Gamepad, Music, Camera } from "lucide-react";

export const MySpace = () => {
  return (
    <div className="h-full bg-gradient-to-br from-purple-100 to-blue-100">
      {/* MySpace Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full overflow-hidden border-4 border-white">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              SC
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Sohum Chandra Srivastava</h1>
            <p className="text-purple-200">
              Software Developer | AI Enthusiast | Tech Explorer
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 overflow-auto h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* About Me */}
          <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-purple-800">About Me</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Hi! I’m Sohum, a Computer Science student at SRM Institute of
              Science and Technology. I specialize in web development and AI/ML,
              with experience from internships at Outlier AI and D-Town
              Robotics. I now freelance, building full-stack web solutions and
              delivering impactful tech projects for real-world clients.
            </p>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <Book className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-blue-800">Education</h2>
            </div>
            <div className="text-sm text-gray-700">
              <p className="font-semibold">SRM Institute of Technology</p>
              <p>B.Tech Computer Science & Engineering</p>
              <p>CGPA: 9.48/10.00</p>
              <p className="text-xs text-gray-500 mt-1">
                Expected Graduation: May 2027
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-bold text-green-800">Tech Stack</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Python",
                "Java",
                "JavaScript",
                "React",
                "Kotlin",
                "Node.js",
                "Flask",
                "AI/ML",
                "OpenCV",
                "Vite",
                "Tailwind",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-orange-200">
            <div className="flex items-center gap-2 mb-3">
              <Gamepad className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-bold text-orange-800">
                Hobbies & Interests
              </h2>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-500" />
                <span>Solving Programming Challenges</span>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad className="w-4 h-4 text-green-500" />
                <span>Reading about emerging technology trends</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-purple-500" />
                <span>Listening to Music</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-red-500" />
                <span>Photography</span>
              </div>
            </div>
          </div>

          {/* Current Projects */}
          <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-red-200 md:col-span-2">
            <h2 className="text-lg font-bold text-red-800 mb-3">
              Current Adventures
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-red-50 p-3 rounded">
                <h3 className="font-semibold text-red-700">
                  🚁 UAV Development
                </h3>
                <p className="text-gray-600">
                  Building drone control systems and AI-powered terrain analysis
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <h3 className="font-semibold text-blue-700">🤖 AI Research</h3>
                <p className="text-gray-600">
                  Working on disaster simulation models and NLP optimization
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <h3 className="font-semibold text-green-700">📱 Mobile Apps</h3>
                <p className="text-gray-600">
                  Developing Android applications with Kotlin and custom AI
                  models
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <h3 className="font-semibold text-purple-700">
                  🌐 Web Development
                </h3>
                <p className="text-gray-600">
                  Building full-stack solutions with React and Flask
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-6 bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4">
          <h2 className="text-lg font-bold text-yellow-800 mb-2">
            🎉 Fun Facts
          </h2>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Started freelancing as a web developer during college</li>
            <li>• Built a custom Ground Control Station for drones</li>
            <li>• Passionate about AI-powered agriculture tech</li>
            <li>• Enjoy experimenting with new programming languages</li>
            <li>• Always up for solving challenging coding problems</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
