import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle({ isDarkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      className={`absolute right-0 top-0 p-3 rounded-full ${
        isDarkMode 
          ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' 
          : 'bg-white text-gray-700 hover:bg-gray-100'
      } shadow-lg transition-all duration-300 hover:scale-110`}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? (
        <Sun className="w-6 h-6" />
      ) : (
        <Moon className="w-6 h-6" />
      )}
    </button>
  );
}