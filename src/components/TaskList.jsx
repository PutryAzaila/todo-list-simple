import React from 'react';
import { Inbox } from 'lucide-react';
import TaskItem from './TaskItem';

export default function TaskList({ 
  tasks, 
  toggleComplete, 
  deleteTask, 
  startEdit,
  searchQuery,
  isDarkMode,
  themeClasses 
}) {

  if (tasks.length === 0) {
    return (
      <div className={`text-center py-12 ${
        isDarkMode ? 'text-slate-500' : 'text-gray-500'
      }`}>
        <Inbox className={`w-16 h-16 mx-auto mb-4 ${
          isDarkMode ? 'text-slate-600' : 'text-gray-400'
        }`} />
        <p className="text-lg">No tasks found</p>
        <p className="text-sm">
          {searchQuery 
            ? 'Try a different search term' 
            : 'Add your first task to get started!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          startEdit={startEdit}
          isDarkMode={isDarkMode}
          themeClasses={themeClasses}
        />
      ))}
    </div>
  );
}