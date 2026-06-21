import React from 'react';
import { colors } from '../constants/theme';
import { getRecommendations } from '../utils/recommendations';

export default function DailyTasks({ highestImpactArea, dailyTasksState, onTaskClick }) {
  const recommendations = getRecommendations(highestImpactArea);
  const tasks = recommendations.tasks;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className={`font-bold ${colors.textForest} text-lg mb-4`}>Daily Green Tasks</h3>
      <div className="space-y-3">
        {tasks.map((task, index) => {
          const isCompleted = dailyTasksState.completed[index];
          return (
            <button
              key={index}
              onClick={() => onTaskClick(index, task.pts)}
              disabled={isCompleted}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                isCompleted 
                  ? 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed' 
                  : 'bg-white border-[#A7C957] hover:shadow-md active:scale-95'
              }`}
              aria-label={isCompleted ? `Completed: ${task.text}` : `Complete task: ${task.text}`}
            >
              <span className={`font-medium text-left ${isCompleted ? 'text-gray-400 line-through' : colors.textForest}`}>
                {task.text}
              </span>
              <span className={`font-bold ml-4 ${isCompleted ? 'text-gray-400' : 'text-[#A7C957]'}`}>
                +{task.pts}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
