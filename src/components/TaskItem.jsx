import React from 'react';
import { Edit2, Trash2, Check, Tag, Calendar, GripVertical } from 'lucide-react';

export default function TaskItem({ 
  task, 
  index,
  toggleComplete, 
  deleteTask, 
  startEdit,
  onDragStart,
  onDragOver,
  onDrop,
  onDragLeave,
  onDragEnd,
  isDragging,
  isDraggedOver,
  isDarkMode,
  themeClasses 
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
      month: 'short', 
      year: 'numeric' 
    });
  };

  const cardClasses = `
    border-2 rounded-lg p-4 transition-all duration-300
    ${task.completed 
      ? isDarkMode
        ? 'bg-slate-800/30 border-slate-700 opacity-60'
        : 'bg-gray-50 border-gray-300 opacity-75'
      : isDarkMode
        ? 'bg-slate-700/50 border-slate-600'
        : 'bg-white border-gray-200'
    }
    ${isDragging ? 'opacity-50 scale-95 rotate-2' : 'hover:shadow-lg hover:scale-[1.01]'}
    ${isDraggedOver ? 'border-blue-500 border-dashed scale-105' : ''}
    cursor-move
  `.trim();

  return (
    <div
      className={cardClasses}
      draggable={!task.completed} 
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-start gap-3">
        
        <div className={`mt-1 ${
          task.completed 
            ? 'opacity-0 pointer-events-none' 
            : isDarkMode ? 'text-slate-500' : 'text-gray-400'
        }`}>
          <GripVertical className="w-5 h-5" />
        </div>

        <button
          onClick={() => toggleComplete(task.id)}
          className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : isDarkMode
                ? 'border-slate-500 hover:border-green-500'
                : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {task.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${
            task.completed 
              ? `line-through ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}` 
              : themeClasses.textPrimary
          }`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={`${themeClasses.textSecondary} text-sm mt-1`}>
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
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
                isDarkMode
                  ? 'bg-purple-900/50 text-purple-200 border-purple-700'
                  : 'bg-purple-100 text-purple-800 border-purple-300'
              }`}>
                <Calendar className="inline w-3 h-3 mr-1" />
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => startEdit(task)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? 'text-blue-400 hover:bg-blue-900/30'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
            title="Edit"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? 'text-red-400 hover:bg-red-900/30'
                : 'text-red-600 hover:bg-red-50'
            }`}
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}