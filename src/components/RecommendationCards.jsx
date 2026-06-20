import React from 'react';
import { colors } from '../constants/theme';

export default function RecommendationCards({ highestImpactArea, tasksCompleted, onTaskClick }) {
  let recommendationMessage = '';
  let dailyTasks = [];

  if (highestImpactArea === 'Transportation') {
    recommendationMessage = "Transportation contributes most to your footprint. Consider replacing one weekly car trip with public transport.";
    dailyTasks = [
      { id: 0, text: "Walked or cycled for a short trip", pts: 20 },
      { id: 1, text: "Used public transit today", pts: 25 },
      { id: 2, text: "Combined multiple errands into one trip", pts: 15 }
    ];
  } else if (highestImpactArea === 'Electricity') {
    recommendationMessage = "Reducing AC usage by one hour per day could help lower your footprint and earn more Seed Points.";
    dailyTasks = [
      { id: 0, text: "Switched off unused lights", pts: 10 },
      { id: 1, text: "Adjusted thermostat by 1 degree", pts: 20 },
      { id: 2, text: "Unplugged unused devices", pts: 15 }
    ];
  } else if (highestImpactArea === 'None') {
    recommendationMessage = "Your footprint is incredibly low across the board! Keep up your amazing green habits to maintain your Garden.";
    dailyTasks = [
      { id: 0, text: "Shared a green tip with a friend", pts: 15 },
      { id: 1, text: "Spent 15 minutes in nature", pts: 15 },
      { id: 2, text: "Supported a local sustainable business", pts: 20 }
    ];
  } else { // Waste
    recommendationMessage = "Single-use plastics add up quickly. Try carrying a reusable bag in your car or backpack.";
    dailyTasks = [
      { id: 0, text: "Used a reusable bag today", pts: 15 },
      { id: 1, text: "Drank from a reusable water bottle", pts: 10 },
      { id: 2, text: "Properly sorted recycling", pts: 15 }
    ];
  }

  return (
    <section className="space-y-4">
      <div className="bg-[#A8DADC]/20 p-4 rounded-xl border border-[#A8DADC]/40">
        <p className={`font-semibold ${colors.textForest} text-sm leading-relaxed`}>
          💡 {recommendationMessage}
        </p>
      </div>

      <h3 className={`font-bold ${colors.textForest} text-lg ml-2 pt-2`}>Recommended Daily Tasks</h3>
      {dailyTasks.map((task) => (
        <button
          key={task.id}
          data-testid={`task-${task.id}`}
          onClick={() => onTaskClick(task.id, task.pts)}
          disabled={tasksCompleted[task.id]}
          className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
            tasksCompleted[task.id] 
              ? 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed' 
              : 'bg-white border-[#A7C957] hover:shadow-md active:scale-95'
          }`}
          aria-label={tasksCompleted[task.id] ? `Completed: ${task.text}` : `Complete task: ${task.text}`}
        >
          <span className={`font-medium text-left ${tasksCompleted[task.id] ? 'text-gray-400 line-through' : colors.textForest}`}>
            {task.text}
          </span>
          <span className={`font-bold ml-4 ${tasksCompleted[task.id] ? 'text-gray-400' : 'text-[#A7C957]'}`}>
            +{task.pts}
          </span>
        </button>
      ))}
    </section>
  );
}
