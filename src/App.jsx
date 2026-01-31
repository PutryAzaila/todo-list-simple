import React, { useState, useEffect } from 'react';
import { ClipboardList, Lightbulb, LayoutList, LayoutGrid } from 'lucide-react';
import DarkModeToggle from './components/DarkModeToggle';
import NotificationCenter from './components/Notificationcenter';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import KanbanBoard from './components/KanbanBoard';
import ProgressBar from './components/ProgressBar';
import StatsCards from './components/StatsCards';
import useDarkMode from './hooks/useDarkMode';

export default function TodoApp() {
  
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  
  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem('viewMode');
    return saved || 'list'; 
  });

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map(task => ({
        ...task,
        status: task.status || 'todo' 
      }));
    }
    return [];
  });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: '',
    status: 'todo' 
  });

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [editingId, setEditingId] = useState(null);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now() + Math.random(),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString(),
      order: tasks.length
    };

    setTasks(prev => [task, ...prev]);

    setNewTask({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: '',
      status: 'todo'
    });
  };

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateTask = (updatedTask) => {
    setTasks(prev => prev.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setNewTask({
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate,
      status: task.status || 'todo'
    });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    
    setTasks(prev => prev.map(task =>
      task.id === editingId
        ? { ...task, ...newTask }
        : task
    ));

    setEditingId(null);
    setNewTask({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: '',
      status: 'todo'
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewTask({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: '',
      status: 'todo'
    });
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    if (filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  };

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    completionRate: tasks.length > 0 
      ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
      : 0
  };

  const themeClasses = {
    background: isDarkMode 
      ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900' 
      : 'bg-gradient-to-br from-blue-50 to-indigo-100',
    
    card: isDarkMode
      ? 'bg-slate-800/90 backdrop-blur-sm border border-slate-700'
      : 'bg-white',
    
    textPrimary: isDarkMode ? 'text-slate-100' : 'text-gray-800',
    textSecondary: isDarkMode ? 'text-slate-400' : 'text-gray-600',
  };

  return (
    <div className={`min-h-screen ${themeClasses.background} py-8 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-8 relative">
          
          <div className="absolute right-0 top-0 flex items-center gap-2">
            <NotificationCenter 
              tasks={tasks}
              isDarkMode={isDarkMode}
              themeClasses={themeClasses}
            />
            
            <DarkModeToggle 
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode} 
            />
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <ClipboardList className={`w-10 h-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-4xl font-bold ${themeClasses.textPrimary}`}>
              Smart Todo List
            </h1>
          </div>
          <p className={themeClasses.textSecondary}>
            Organize your tasks efficiently with priority & categories
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <div className={`inline-flex rounded-lg p-1 ${
            isDarkMode ? 'bg-slate-800' : 'bg-gray-200'
          }`}>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                viewMode === 'list'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 shadow'
                  : isDarkMode
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutList className="w-4 h-4" />
              List View
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                viewMode === 'kanban'
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 shadow'
                  : isDarkMode
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Kanban View
            </button>
          </div>
        </div>

        <ProgressBar 
          stats={stats} 
          isDarkMode={isDarkMode} 
        />

        <StatsCards 
          stats={stats} 
          isDarkMode={isDarkMode}
          themeClasses={themeClasses}
        />

        {viewMode === 'list' ? (
          <div className={`${themeClasses.card} rounded-xl shadow-lg p-6 mb-6 transition-colors duration-300`}>
            
            <TaskForm
              newTask={newTask}
              editingId={editingId}
              handleInputChange={handleInputChange}
              addTask={addTask}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
              isDarkMode={isDarkMode}
              themeClasses={themeClasses}
            />

            <FilterBar
              filter={filter}
              setFilter={setFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              isDarkMode={isDarkMode}
              themeClasses={themeClasses}
            />

            <TaskList
              tasks={getFilteredTasks()}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              startEdit={startEdit}
              searchQuery={searchQuery}
              isDarkMode={isDarkMode}
              themeClasses={themeClasses}
            />
          </div>
        ) : (
          <div className="mb-6">
            <div className={`${themeClasses.card} rounded-xl shadow-lg p-6 mb-6 transition-colors duration-300`}>
              <TaskForm
                newTask={newTask}
                editingId={editingId}
                handleInputChange={handleInputChange}
                addTask={addTask}
                saveEdit={saveEdit}
                cancelEdit={cancelEdit}
                isDarkMode={isDarkMode}
                themeClasses={themeClasses}
              />
            </div>

            <KanbanBoard
              tasks={tasks}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              isDarkMode={isDarkMode}
              themeClasses={themeClasses}
            />
          </div>
        )}

        <div className={`text-center ${themeClasses.textSecondary} text-sm flex items-center justify-center gap-2`}>
          <Lightbulb className="w-4 h-4" />
          <p>
            {viewMode === 'list' 
              ? 'Tip: Switch to Kanban view for drag & drop workflow • Check notifications for upcoming deadlines' 
              : 'Tip: Drag cards between columns to update status • Check notifications for upcoming deadlines'}
          </p>
        </div>
      </div>
    </div>
  );
}