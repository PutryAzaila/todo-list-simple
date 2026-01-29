import React from "react";

export default function Statscards({ stats, isDarkMode, themeClasses }) {
    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className={`${themeClasses.card} rounded-lg shadow-lg p-4 text-center transition-all duration-300 hover:scale-105`}>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    {stats.total}
                </div>
                <div className={`text-sm ${themeClasses.textSecondary}`}>Total Tasks</div>
            </div>
            <div className={`${themeClasses.card} rounded-lg shadow-lg p-4 text-center transition-all duration-300 hover:scale-105`}>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                {stats.active}
                </div>
                <div className={`text-sm ${themeClasses.textSecondary}`}>Active</div>
            </div>

            {/* Completed Tasks */}
            <div className={`${themeClasses.card} rounded-lg shadow-lg p-4 text-center transition-all duration-300 hover:scale-105`}>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                {stats.completed}
                </div>
                <div className={`text-sm ${themeClasses.textSecondary}`}>Completed</div>
            </div>
       </div>
     );
}