import React, { useState } from 'react';
import { MoreVertical, Plus } from 'lucide-react';
import KanbanColumn from './KanbanColumn';

export default function KanbanBoard({ 
  tasks,
  addTask,
  updateTask,
  deleteTask,
  isDarkMode,
  themeClasses 
}) {

  const columns = [
    { 
      id: 'todo', 
      title: 'To Do', 
      status: 'todo',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      darkColor: 'bg-blue-900/20'
    },
    { 
      id: 'in-progress', 
      title: 'In Progress', 
      status: 'in-progress',
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-50',
      darkColor: 'bg-yellow-900/20'
    },
    { 
      id: 'done', 
      title: 'Done', 
      status: 'done',
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      darkColor: 'bg-green-900/20'
    }
  ];

  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedOverColumn, setDraggedOverColumn] = useState(null);

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOverColumn = (columnId) => {
    setDraggedOverColumn(columnId);
  };

  const handleDropToColumn = (columnStatus) => {
    if (!draggedTask) return;

    const updatedTask = {
      ...draggedTask,
      status: columnStatus,
      completed: columnStatus === 'done'
    };

    updateTask(updatedTask);

    setDraggedTask(null);
    setDraggedOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDraggedOverColumn(null);
  };

  const getTaskCount = (status) => {
    return tasks.filter(t => t.status === status).length;
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>
            Kanban Board
          </h2>
          <p className={`text-sm ${themeClasses.textSecondary} mt-1`}>
            Drag tasks between columns to update their status
          </p>
        </div>
        
        <div className="flex gap-3">
          {columns.map(col => {
            const count = getTaskCount(col.status);
            return (
              <div 
                key={col.id}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                }`}
              >
                <span className={themeClasses.textSecondary}>{col.title}:</span>
                <span className={`ml-1 ${themeClasses.textPrimary}`}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={getTasksByStatus(column.status)}
            isDarkMode={isDarkMode}
            themeClasses={themeClasses}
            onDragStart={handleDragStart}
            onDragOverColumn={() => handleDragOverColumn(column.id)}
            onDropToColumn={() => handleDropToColumn(column.status)}
            onDragEnd={handleDragEnd}
            isDraggedOver={draggedOverColumn === column.id}
            draggedTask={draggedTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>

      <div className={`mt-4 text-center text-sm ${themeClasses.textSecondary}`}>
        Tip: Drag cards between columns to change their status
      </div>
    </div>
  );
}