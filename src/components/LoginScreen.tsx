
import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('Guest');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundColor: '#008080'
      }}
    >
      {/* Background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/lovable-uploads/5f85bb9d-f696-471b-9300-4553b6e2010e.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="bg-gray-300 border-4 border-gray-600 p-8 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Windows 95</h1>
          <p className="text-sm text-gray-600">Guest Login</p>
        </div>

        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-200 border-2 border-gray-600">
          <div className="w-16 h-16 bg-blue-500 border-2 border-gray-600 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800">{username}</h2>
            <p className="text-sm text-gray-600">System User</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-600 bg-white"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Password:
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border-2 border-gray-600 bg-white pr-10"
                placeholder="Enter any password"
                disabled={isLoading}
                autoFocus
              />
              <Lock className="absolute right-3 top-2 w-4 h-4 text-gray-600" />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-gray-200 border-2 border-gray-600 hover:bg-gray-300 active:border-inset font-bold disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'OK'}
            </button>
            <button className="px-4 py-2 bg-gray-200 border-2 border-gray-600 hover:bg-gray-300 active:border-inset font-bold">
              Cancel
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="mt-4 text-center">
            <div className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600 mt-2">Loading Desktop...</p>
          </div>
        )}

        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>Tip: Enter any password to access the portfolio</p>
        </div>
      </div>
    </div>
  );
};
