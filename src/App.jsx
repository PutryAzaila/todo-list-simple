import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X, Search, Calendar, Tag, AlertCircle, ClipboardList, PenLine, Inbox, Moon, Sun } from 'lucide-react';

export default function TodoApp() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: ''
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
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [task, ...prev]);

    setNewTask({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: ''
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

  const startEdit = (task) => {
    setEditingId(task.id);
    setNewTask({
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate
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
      dueDate: ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewTask({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: ''
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

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
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
    textMuted: isDarkMode ? 'text-slate-500' : 'text-gray-500',
    
    input: isDarkMode
      ? 'bg-slate-700/50 border-slate-600 text-slate-100 placeholder-slate-500 focus:ring-blue-500 focus:border-blue-500'
      : 'border-gray-300 focus:ring-blue-500',
    
    buttonPrimary: isDarkMode
      ? 'bg-blue-600 hover:bg-blue-700'
      : 'bg-blue-600 hover:bg-blue-700',
    
    buttonSecondary: isDarkMode
      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    
    taskCard: isDarkMode
      ? 'bg-slate-700/50 border-slate-600'
      : 'bg-white border-gray-200',
    
    taskCardCompleted: isDarkMode
      ? 'bg-slate-800/30 border-slate-700 opacity-60'
      : 'bg-gray-50 border-gray-300 opacity-75',
  };

  return (
    <div className={`min-h-screen ${themeClasses.background} py-8 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8 relative">
          
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

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`${themeClasses.card} rounded-lg shadow-lg p-4 text-center transition-colors duration-300`}>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {stats.total}
            </div>
            <div className={`text-sm ${themeClasses.textSecondary}`}>Total Tasks</div>
          </div>
          <div className={`${themeClasses.card} rounded-lg shadow-lg p-4 text-center transition-colors duration-300`}>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              {stats.active}
            </div>
            <div className={`text-sm ${themeClasses.textSecondary}`}>Active</div>
          </div>
          <div className={`${themeClasses.card} rounded-lg shadow-lg p-4 text-center transition-colors duration-300`}>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              {stats.completed}
            </div>
            <div className={`text-sm ${themeClasses.textSecondary}`}>Completed</div>
          </div>
        </div>

        <div className={`${themeClasses.card} rounded-xl shadow-lg p-6 mb-6 transition-colors duration-300`}>
          
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
              className={`w-full px-4 py-3 ${themeClasses.input} rounded-lg mb-3 focus:outline-none focus:ring-2 transition-colors duration-300`}
              required
            />

            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Description (optional)..."
              className={`w-full px-4 py-3 ${themeClasses.input} rounded-lg mb-3 focus:outline-none focus:ring-2 resize-none transition-colors duration-300`}
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
                  className={`w-full px-3 py-2 ${themeClasses.input} rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300`}
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
                  className={`w-full px-3 py-2 ${themeClasses.input} rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300`}
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
                  className={`w-full px-3 py-2 ${themeClasses.input} rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300`}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className={`flex-1 ${themeClasses.buttonPrimary} text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02]`}
              >
                {editingId ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {editingId ? 'Save Changes' : 'Add Task'}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className={`px-6 py-3 ${themeClasses.buttonSecondary} rounded-lg transition-all duration-300 flex items-center gap-2 hover:scale-[1.02]`}
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="mb-6 space-y-3">
            
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-5 h-5`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className={`w-full pl-10 pr-4 py-2 ${themeClasses.input} rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300`}
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
                        ? `${themeClasses.buttonPrimary} text-white shadow-lg`
                        : themeClasses.buttonSecondary
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 ${themeClasses.input} rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300`}
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {getFilteredTasks().length === 0 ? (
              <div className={`text-center py-12 ${themeClasses.textMuted}`}>
                <Inbox className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`} />
                <p className="text-lg">No tasks found</p>
                <p className="text-sm">
                  {searchQuery 
                    ? 'Try a different search term' 
                    : 'Add your first task to get started!'}
                </p>
              </div>
            ) : (
              getFilteredTasks().map(task => (
                <div
                  key={task.id}
                  className={`border-2 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${
                    task.completed 
                      ? themeClasses.taskCardCompleted
                      : themeClasses.taskCard
                  }`}
                >
                  <div className="flex items-start gap-3">
                    
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
                          ? `line-through ${themeClasses.textMuted}` 
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
              ))
            )}
          </div>
        </div>

        <div className={`text-center ${themeClasses.textSecondary} text-sm`}>
          <p>Tip: Tasks & theme are automatically saved to your browser</p>
        </div>
      </div>
    </div>
  );
}