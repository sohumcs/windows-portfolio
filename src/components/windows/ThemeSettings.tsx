
import React from 'react';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';

export const ThemeSettings = () => {
  return (
    <div className="p-6 h-full bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Theme Settings</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Light Theme */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Light Mode</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Bright and clean interface</p>
            </div>
          </div>

          {/* Dark Theme */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Dark Mode</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Easy on the eyes</p>
            </div>
          </div>

          {/* Auto Theme */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Auto</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Follows system settings</p>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Color Palette</h2>
          <div className="grid grid-cols-6 gap-4">
            {[
              'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 
              'bg-green-500', 'bg-blue-500', 'bg-purple-500',
              'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
              'bg-cyan-500', 'bg-lime-500', 'bg-amber-500'
            ].map((color, index) => (
              <div
                key={index}
                className={`${color} w-16 h-16 rounded-xl cursor-pointer hover:scale-110 transform transition-all duration-200 shadow-lg hover:shadow-xl`}
                title={`Color ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Personalization */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Personalization</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Animations</span>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Sound Effects</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-all"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Transparency Effects</span>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
