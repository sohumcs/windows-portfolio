
import React, { useState } from 'react';
import { Search, Globe, Home, ArrowLeft, ArrowRight } from 'lucide-react';

export const Browser = () => {
  const [currentUrl, setCurrentUrl] = useState('about:blank');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCurrentUrl(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navigationButtons = [
    { icon: <ArrowLeft className="w-4 h-4" />, label: 'Back', disabled: true },
    { icon: <ArrowRight className="w-4 h-4" />, label: 'Forward', disabled: true },
    { icon: <Home className="w-4 h-4" />, label: 'Home', disabled: false },
  ];

  return (
    <div className="h-full bg-gray-100">
      {/* Browser Chrome */}
      <div className="bg-gray-200 border-b-2 border-gray-400 p-2">
        {/* Title Bar */}
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-sm">Internet Explorer</span>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-2">
          {navigationButtons.map((btn, index) => (
            <button
              key={index}
              disabled={btn.disabled}
              className={`p-2 border-2 border-gray-600 ${
                btn.disabled 
                  ? 'bg-gray-300 text-gray-500' 
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
              }`}
              title={btn.label}
            >
              {btn.icon}
            </button>
          ))}
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Address:</span>
          <div className="flex-1 flex border-2 border-gray-600">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-2 py-1 text-sm"
              placeholder="Enter search terms or website URL"
            />
            <button
              onClick={handleSearch}
              className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 border-l border-gray-400"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Browser Content */}
      <div className="p-4 h-full overflow-auto">
        {currentUrl === 'about:blank' ? (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-600 mb-2">Welcome to Internet Explorer</h2>
            <p className="text-gray-500 mb-6">The best way to browse the web in 1995!</p>
            
            <div className="max-w-md mx-auto">
              <h3 className="font-bold text-gray-700 mb-3">Quick Links:</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSearchQuery('Sohum Chandra Srivastava portfolio')}
                  className="block w-full p-2 text-left bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded"
                >
                  🔍 Search for my work
                </button>
                <button
                  onClick={() => window.open('https://github.com/sohumscs', '_blank')}
                  className="block w-full p-2 text-left bg-green-100 hover:bg-green-200 border border-green-300 rounded"
                >
                  🐙 Visit my GitHub
                </button>
                <button
                  onClick={() => window.open('https://linkedin.com/in/sohumscs', '_blank')}
                  className="block w-full p-2 text-left bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded"
                >
                  💼 Connect on LinkedIn
                </button>
              </div>
            </div>

            <div className="mt-8 text-xs text-gray-400">
              <p>This is a nostalgic recreation of Internet Explorer for portfolio purposes.</p>
              <p>No actual web browsing functionality is provided.</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for: "{searchQuery}"</p>
            <p className="text-sm text-gray-500 mt-2">
              This would normally open your default browser, but we're in Windows 95 mode! 🎉
            </p>
            <button
              onClick={() => {
                setCurrentUrl('about:blank');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-gray-300 border-2 border-gray-600 hover:bg-gray-400"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 border-t-2 border-gray-400 px-2 py-1 text-xs text-gray-600">
        <div className="flex items-center justify-between">
          <span>Ready</span>
          <span>{currentUrl}</span>
        </div>
      </div>
    </div>
  );
};
