import React from 'react';
import { TrendingUp, Target, PartyPopper, Flame, Zap, Rocket, ListTodo, Icon} from 'lucide-react';

export default function ProgressBar({ stats, isDarkMode}) {
    const { completionRate } = stats;

    const getProgressColor = () => {
        if (completionRate >= 71) {
            return isDarkMode
            ? 'bg-green-500 text-green-400'
            : 'bg-green-500 text-green-400';
        } else if (completionRate >= 31) {
            return isDarkMode
            ? 'bg-yellow-500 text-yellow-400'
            : 'bg-yellow-500 text-yellow-600';
        } else {
            return isDarkMode
            ? 'bg-red-500 text-red-400'
            : 'bg-red-500 text-red-600';
        }
    };

    const progressColor = getProgressColor();
    const [bgColor, textColor] = progressColor.split(' ');

    const getMessageData = () => {
        if (stats.total === 0) {
            return {
                message: "Add your first task to get started!",
                Icon: ListTodo
            };
        }
        if (completionRate === 100) {
            return {
                message: "Perfect! All tasks completed!",
                Icon: PartyPopper
            };
        }
        if (completionRate >= 75) {
            return {
                message: "Almost there! Keep up the great work!",
                Icon: Flame
            };
        }
        if (completionRate >= 50) {
            return {
                message: "You're halfway through! Stay focused!",
                Icon: Zap
            };
        }
        if (completionRate >= 25) {
            return {
                message: "Good start! Keep pushing forward!",
                Icon: TrendingUp
            };
        }
        return {
            message: "Let's get things done!",
            Icon: Rocket
        };
    };
    const { message, Icon: MessageIcon} = getMessageData();

    return (
        <div className={`mn-6{
            isDarkMode
            ? 'bg-slate-800/70 border border-slate-700'
            : 'bg-white'
        } rounded-xl shadow-lg p-6 transition-colors duration-300`}>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Target className={`w-5 h-5 ${textColor}`} />
                    <h3 className={`font-semibold ${
                        isDarkMode ? 'text-slate-100' : 'text-gray-800'
                    }`}>
                    Overall Progress
                    </h3>
                </div>

                <div className={`flex items-center gap-2 px-3 py-1 rounded full ${
                    isDarkMode? 'bg-slate-700' :'bg-gray-100'
                }`}>
                    <TrendingUp className={`w-4 h-4 ${textColor}`} />
                    <span className={`font-bold ${textColor}`}>
                        {completionRate}%
                    </span>
                </div>
            </div>
            <div className={`h-4 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
            }`}>
                <div 
                className={`h-full ${bgColor} transition-all duration-500 ease-out relative overflow-hidden`}
                style={{ width: `${completionRate}%` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from transparent via-white/20 to-transparent animate-shimmer"
                        style={{
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 2s infinite'
                        }}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                <MessageIcon className={`w-4 h-4 ${textColor}`} />
                <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                    {message}
                </p>
                </div>
                <p className={`text-sm font-medium ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}>
                {stats.completed} / {stats.total} tasks
                </p>
            </div>
             <style jsx>{`
                @keyframes shimmer {
                0% {
                    background-position: -200% 0;
                }
                100% {
                    background-position: 200% 0;
                }
                }
                .animate-shimmer {
                animation: shimmer 2s infinite;
                background: linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(255, 255, 255, 0.2) 50%,
                    transparent 100%
                );
                background-size: 200% 100%;
                }
            `}</style>
        </div>
    )
 } 