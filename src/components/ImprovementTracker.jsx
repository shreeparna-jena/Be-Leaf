import React from 'react';
import { colors } from '../constants/theme';
import { getImprovementTrend } from '../utils/progress';

export default function ImprovementTracker({ previousScore, currentScore }) {
  const trend = getImprovementTrend(previousScore, currentScore);

  if (!trend) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-4">
      <h3 className={`font-bold ${colors.textForest} text-lg`}>Improvement Tracker</h3>
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium">Previous</p>
          <p className={`text-2xl font-bold text-gray-700`}>{trend.previousScore}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 font-medium">Current</p>
          <p className={`text-2xl font-bold ${colors.textForest}`}>{trend.currentScore}</p>
        </div>
      </div>
      <div className={`text-center font-bold text-lg p-3 rounded-xl ${trend.isImprovement ? 'bg-green-100 text-green-700' : trend.isWorse ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
        {trend.isImprovement && `↓ Improved by ${trend.diff} points`}
        {trend.isWorse && `↑ Increased by ${trend.diff} points`}
        {trend.isSame && `No change in footprint score`}
      </div>
    </div>
  );
}
