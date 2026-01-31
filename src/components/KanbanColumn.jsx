import React from 'react';
import { Plus } from 'lucide-react';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({
  column,
  tasks,
  isDarkMode,
  themeClasses,
  onDragStart,
  onDragOverColumn,
  onDropToColumn,
  onDragEnd,
  isDraggedOver,
  draggedTask,
  deleteTask,
  updateTask
}) {

  const handleDragOver = (e) => {
    e.preventDefault();
    onDragOverColumn();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDropToColumn();
  };

  const getColumnBackground = () => {
    if (isDraggedOver && draggedTask) {
      return isDarkMode 
        ? 'bg-slate-700/50 border-blue-500' 
        : 'bg-blue-50 border-blue-400';
    }
    return isDarkMode
      ? 'bg-slate-800/50 border-slate-700'
      : 'bg-gray-50 border-gray-200';
  };

  return (
    <div
      className={`flex-shrink-0 w-80 ${getColumnBackground()} border-2 rounded-xl p-4 transition-all duration-300`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{ minHeight: '500px' }}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
            <h3 className={`font-semibold text-lg ${themeClasses.textPrimary}`}>
              {column.title}
            </h3>
          </div>
          
          <div className={`px-2 py-1 rounded-full text-xs font-bold ${
            isDarkMode 
              ? 'bg-slate-700 text-slate-300' 
              : 'bg-white text-gray-700'
          }`}>
            {tasks.length}
          </div>
        </div>

        <div className={`h-px ${
          isDarkMode ? 'bg-slate-700' : 'bg-gray-300'
        }`}></div>
      </div>

      <div className="space-y-3 mb-4">
        {tasks.length === 0 ? (
          <div className={`text-center py-8 ${themeClasses.textSecondary}`}>
            <div className={`text-4xl mb-2 ${
              isDarkMode ? 'opacity-30' : 'opacity-20'
            }`}>
              📋
            </div>
            <p className="text-sm">No tasks yet</p>
            <p className="text-xs mt-1">Drag tasks here</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <KanbanCard
              key={task.id}
              task={task}
              index={index}
              isDarkMode={isDarkMode}
              themeClasses={themeClasses}
              onDragStart={() => onDragStart(task)}
              onDragEnd={onDragEnd}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))
        )}
      </div>
    </div>
  );
}