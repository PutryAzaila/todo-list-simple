import React from 'react';
import { Calendar, Tag, AlertCircle, Trash2, GripVertical } from 'lucide-react';

export default function KanbanCard({
  task,
  index,
  isDarkMode,
  themeClasses,
  onDragStart,
  onDragEnd,
  deleteTask,
  updateTask
}) {

  const getPriorityColor = (priority) => {
    if (isDarkMode) {
      const colors = {
        high: 'bg-red-900/50 text-red-200 border-red-700',
        medium: 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
        low: 'bg-green-900/50 text-green-200 border-green-700'
      };
      return colors[priority] || colors.medium;
    } else {
      const colors = {
        high: 'bg-red-100 text-red-800 border-red-300',
        medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        low: 'bg-green-100 text-green-800 border-green-300'
      };
      return colors[priority] || colors.medium;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short'
    });
  };

  const isOverdue = () => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`group ${
        isDarkMode 
          ? 'bg-slate-700 hover:bg-slate-600' 
          : 'bg-white hover:shadow-md'
      } rounded-lg p-3 cursor-move border ${
        isDarkMode ? 'border-slate-600' : 'border-gray-200'
      } transition-all duration-200 hover:scale-[1.02]`}
    >
      <div className="flex items-start justify-between mb-2">
        <GripVertical className={`w-4 h-4 ${
          isDarkMode ? 'text-slate-500' : 'text-gray-400'
        }`} />
        
        <button
          onClick={() => deleteTask(task.id)}
          className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity ${
            isDarkMode
              ? 'hover:bg-red-900/30 text-red-400'
              : 'hover:bg-red-50 text-red-600'
          }`}
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <h4 className={`font-medium mb-2 ${themeClasses.textPrimary}`}>
        {task.title}
      </h4>

      {task.description && (
        <p className={`text-sm ${themeClasses.textSecondary} mb-3 line-clamp-2`}>
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
          <AlertCircle className="inline w-3 h-3 mr-1" />
          {task.priority.toUpperCase()}
        </span>

        {task.category && (
          <span className={`px-2 py-1 rounded text-xs font-medium border ${
            isDarkMode
              ? 'bg-blue-900/50 text-blue-200 border-blue-700'
              : 'bg-blue-100 text-blue-800 border-blue-300'
          }`}>
            <Tag className="inline w-3 h-3 mr-1" />
            {task.category}
          </span>
        )}

        {task.dueDate && (
          <span className={`px-2 py-1 rounded text-xs font-medium border ${
            isOverdue()
              ? isDarkMode
                ? 'bg-red-900/50 text-red-200 border-red-700'
                : 'bg-red-100 text-red-800 border-red-300'
              : isDarkMode
                ? 'bg-purple-900/50 text-purple-200 border-purple-700'
                : 'bg-purple-100 text-purple-800 border-purple-300'
          }`}>
            <Calendar className="inline w-3 h-3 mr-1" />
            {formatDate(task.dueDate)}
            {isOverdue() && ' ⚠️'}
          </span>
        )}
      </div>
    </div>
  );
}