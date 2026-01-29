import React from 'react';
import { Plus, Check, X, Tag, AlertCircle, Calendar, PenLine } from 'lucide-react';

export default function TaskForm({ 
  newTask, 
  editingId, 
  handleInputChange, 
  addTask, 
  saveEdit, 
  cancelEdit,
  isDarkMode,
  themeClasses 
}) {
  return (
    <form onSubmit={editingId ? saveEdit : addTask} className="mb-6">
      <h2 className={`text-xl font-semibold ${themeClasses.textPrimary} mb-4 flex items-center gap-2`}>
        {editingId ? (
          <>
            <PenLine className="w-5 h-5" />
            Edit Task
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            Add New Task
          </>
        )}
      </h2>
      
      <input
        type="text"
        name="title"
        value={newTask.title}
        onChange={handleInputChange}
        placeholder="Task title..."
        className={`w-full px-4 py-3 ${
          isDarkMode
            ? 'bg-slate-700/50 border-slate-600 text-slate-100 placeholder-slate-500'
            : 'border-gray-300'
        } border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
        required
      />

      <textarea
        name="description"
        value={newTask.description}
        onChange={handleInputChange}
        placeholder="Description (optional)..."
        className={`w-full px-4 py-3 ${
          isDarkMode
            ? 'bg-slate-700/50 border-slate-600 text-slate-100 placeholder-slate-500'
            : 'border-gray-300'
        } border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors duration-300`}
        rows="2"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        
        <div>
          <label className={`block text-sm font-medium ${themeClasses.textSecondary} mb-1`}>
            <Tag className="inline w-4 h-4 mr-1" />
            Category
          </label>
          <input
            type="text"
            name="category"
            value={newTask.category}
            onChange={handleInputChange}
            placeholder="e.g. Work, Personal"
            className={`w-full px-3 py-2 ${
              isDarkMode
                ? 'bg-slate-700/50 border-slate-600 text-slate-100 placeholder-slate-500'
                : 'border-gray-300'
            } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${themeClasses.textSecondary} mb-1`}>
            <AlertCircle className="inline w-4 h-4 mr-1" />
            Priority
          </label>
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 ${
              isDarkMode
                ? 'bg-slate-700/50 border-slate-600 text-slate-100'
                : 'border-gray-300'
            } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium ${themeClasses.textSecondary} mb-1`}>
            <Calendar className="inline w-4 h-4 mr-1" />
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 ${
              isDarkMode
                ? 'bg-slate-700/50 border-slate-600 text-slate-100'
                : 'border-gray-300'
            } border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
          />
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02]`}
        >
          {editingId ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {editingId ? 'Save Changes' : 'Add Task'}
        </button>
        
        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`px-6 py-3 ${
              isDarkMode
                ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            } rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-[1.02]`}
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}