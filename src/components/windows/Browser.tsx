
import React, { useState } from 'react';
import { Search, Globe, Home, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';

export const Browser = () => {
  const [currentUrl, setCurrentUrl] = useState('about:blank');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>(['about:blank']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      const newUrl = searchQuery.includes('.') 
        ? `http://${searchQuery}` 
        : `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      
      setTimeout(() => {
        setCurrentUrl(newUrl);
        setHistory(prev => [...prev.slice(0, historyIndex + 1), newUrl]);
        setHistoryIndex(prev => prev + 1);
        setIsLoading(false);
      }, 1000);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setCurrentUrl(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setCurrentUrl(history[historyIndex + 1]);
    }
  };

  const goHome = () => {
    setCurrentUrl('about:blank');
    setSearchQuery('');
    setHistory(['about:blank']);
    setHistoryIndex(0);
  };

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const navigationButtons = [
    { icon: <ArrowLeft className="w-4 h-4" />, label: 'Back', disabled: historyIndex === 0, action: goBack },
    { icon: <ArrowRight className="w-4 h-4" />, label: 'Forward', disabled: historyIndex >= history.length - 1, action: goForward },
    { icon: <RefreshCw className="w-4 h-4" />, label: 'Refresh', disabled: false, action: refresh },
    { icon: <Home className="w-4 h-4" />, label: 'Home', disabled: false, action: goHome },
  ];

  const quickLinks = [
    { name: 'Portfolio Search', url: 'Sohum Chandra Srivastava portfolio' },
    { name: 'GitHub Profile', url: 'github.com/sohumscs' },
    { name: 'LinkedIn Profile', url: 'linkedin.com/in/sohumscs' },
    { name: 'React Documentation', url: 'react.dev' },
    { name: 'TypeScript Docs', url: 'typescriptlang.org' },
  ];

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      {/* Browser Chrome */}
      <div className="bg-gray-200 border-b-2 border-gray-400 p-2 flex-shrink-0">
        {/* Title Bar */}
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-sm">Internet Explorer - Portfolio Edition</span>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-2">
          {navigationButtons.map((btn, index) => (
            <button
              key={index}
              disabled={btn.disabled}
              onClick={btn.action}
              className={`p-2 border-2 border-gray-600 transition-all ${
                btn.disabled 
                  ? 'bg-gray-300 text-gray-500' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800 active:border-inset'
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
              className="flex-1 px-2 py-1 text-sm border-none outline-none"
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
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        ) : currentUrl === 'about:blank' ? (
          <div className="p-8 text-center">
            <Globe className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Internet Explorer - Portfolio Edition</h2>
            <p className="text-gray-500 mb-8">Experience the web like it's 1995! This browser is specially designed for portfolio browsing.</p>
            
            <div className="max-w-md mx-auto">
              <h3 className="font-bold text-gray-700 mb-4">Quick Access:</h3>
              <div className="grid grid-cols-1 gap-3">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(link.url);
                      setCurrentUrl(link.url);
                    }}
                    className="p-3 text-left bg-blue-100 hover:bg-blue-200 border-2 border-blue-300 transition-all hover:scale-105"
                  >
                    <div className="font-medium text-blue-800">{link.name}</div>
                    <div className="text-sm text-blue-600">{link.url}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 text-xs text-gray-400 bg-gray-100 p-4 border-2 border-gray-300">
              <p className="font-bold mb-2">🎉 Welcome to the Retro Web Experience!</p>
              <p>This is a nostalgic recreation of Internet Explorer for portfolio demonstration.</p>
              <p>Search functionality simulates real browsing without actual internet access.</p>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="bg-yellow-100 border-2 border-yellow-400 p-4 mb-6">
                <h3 className="font-bold text-yellow-800 mb-2">🔍 Search Results</h3>
                <p className="text-yellow-700">Searching for: "{searchQuery}"</p>
              </div>
              
              <div className="bg-white border-2 border-gray-400 p-6">
                <h2 className="text-xl font-bold text-blue-600 mb-4">Portfolio Search Results</h2>
                <div className="space-y-4 text-left">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-bold text-blue-600">Sohum Chandra Srivastava - Portfolio</h3>
                    <p className="text-green-600 text-sm">https://sohumscs.portfolio.dev</p>
                    <p className="text-gray-700">Full-stack developer specializing in React, TypeScript, and modern web technologies. Check out my projects and experience.</p>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-bold text-blue-600">GitHub - sohumscs</h3>
                    <p className="text-green-600 text-sm">https://github.com/sohumscs</p>
                    <p className="text-gray-700">Repository collection showcasing various projects in web development, machine learning, and software engineering.</p>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-bold text-blue-600">LinkedIn Profile</h3>
                    <p className="text-green-600 text-sm">https://linkedin.com/in/sohumscs</p>
                    <p className="text-gray-700">Professional network profile with work experience, education, and career achievements.</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={goHome}
                className="mt-6 px-6 py-2 bg-gray-200 border-2 border-gray-600 hover:bg-gray-300 active:border-inset font-bold"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 border-t-2 border-gray-400 px-2 py-1 text-xs text-gray-600 flex-shrink-0">
        <div className="flex items-center justify-between">
          <span>{isLoading ? 'Loading...' : 'Done'}</span>
          <span className="truncate max-w-xs">{currentUrl}</span>
        </div>
      </div>
    </div>
  );
};
