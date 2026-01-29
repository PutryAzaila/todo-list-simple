import React from 'react';
import { Search } from 'lucide-react';

export default function FilterBar({ 
  filter, 
  setFilter, 
  searchQuery, 
  setSearchQuery, 
  sortBy, 
  setSortBy,
  isDarkMode,
  themeClasses 
}) {
  return (
    <div className="mb-6 space-y-3">
      
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
          isDarkMode ? 'text-slate-500' : 'text-gray-400'
        } w-5 h-5`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className={`w-full pl-10 pr-4 py-2 ${
            isDarkMode
              ? 'bg-slate-700/50 border-slate-600 text-slate-100 placeholder-slate-500'
              : 'border-gray-300'
          } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex gap-2">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`px-4 py-2 ${
            isDarkMode
              ? 'bg-slate-700/50 border-slate-600 text-slate-100'
              : 'border-gray-300'
          } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
        >
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>
    </div>
  );
}