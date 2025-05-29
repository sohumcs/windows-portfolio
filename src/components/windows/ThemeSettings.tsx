
import React, { useState } from 'react';
import { Palette, Sun, Moon, Monitor, Check } from 'lucide-react';

interface ThemeSettingsProps {
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({ isDark, onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState(isDark ? 'dark' : 'light');
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [enableSounds, setEnableSounds] = useState(false);
  const [enableTransparency, setEnableTransparency] = useState(true);

  const handleThemeSelect = (theme: 'light' | 'dark' | 'auto') => {
    setSelectedTheme(theme);
    if (theme !== 'auto') {
      onThemeChange(theme === 'dark');
    }
  };

  const themeOptions = [
    { id: 'light', name: 'High Contrast White', icon: Sun, color: 'from-yellow-400 to-orange-500' },
    { id: 'dark', name: 'High Contrast Black', icon: Moon, color: 'from-blue-600 to-purple-700' },
    { id: 'auto', name: 'Windows Default', icon: Monitor, color: 'from-green-500 to-teal-600' }
  ];

  return (
    <div className="p-6 h-full bg-gray-100 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-400">
          <Palette className="w-8 h-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-800">Display Properties</h1>
        </div>
        
        {/* Theme Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Color Scheme</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((theme) => {
              const IconComponent = theme.icon;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id as any)}
                  className={`bg-gray-200 border-2 p-6 hover:bg-gray-300 transition-all duration-200 relative ${
                    selectedTheme === theme.id ? 'border-blue-600 bg-blue-100' : 'border-gray-600'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${theme.color} flex items-center justify-center mb-4 border-2 border-gray-600`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 mb-2">{theme.name}</h3>
                    {selectedTheme === theme.id && (
                      <Check className="absolute top-2 right-2 w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-gray-200 border-2 border-gray-600 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Effects</h2>
          <div className="space-y-4">
            <ToggleSetting
              label="Use transition effects for menus and tooltips"
              checked={enableAnimations}
              onChange={setEnableAnimations}
            />
            <ToggleSetting
              label="Use the following transition effect for menus and tooltips"
              checked={enableSounds}
              onChange={setEnableSounds}
            />
            <ToggleSetting
              label="Show window contents while dragging"
              checked={enableTransparency}
              onChange={setEnableTransparency}
            />
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-6 flex gap-2">
          <button className="px-6 py-2 bg-gray-200 border-2 border-gray-600 hover:bg-gray-300 active:border-inset font-bold">
            OK
          </button>
          <button className="px-6 py-2 bg-gray-200 border-2 border-gray-600 hover:bg-gray-300 active:border-inset font-bold">
            Cancel
          </button>
          <button className="px-6 py-2 bg-gray-200 border-2 border-gray-600 hover:bg-gray-300 active:border-inset font-bold">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const ToggleSetting: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => (
  <div className="flex items-center gap-3">
    <button
      onClick={() => onChange(!checked)}
      className={`w-4 h-4 border-2 border-gray-600 ${checked ? 'bg-blue-500' : 'bg-white'} flex items-center justify-center`}
    >
      {checked && <Check className="w-3 h-3 text-white" />}
    </button>
    <span className="text-sm text-gray-800">{label}</span>
  </div>
);
