import React from 'react';
import { colors } from '../constants/theme';

export default function ProgressHistory({ history }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className={`font-bold ${colors.textForest} text-lg mb-4`}>Progress History</h3>
      <ul className="space-y-3">
        {history.slice(-5).reverse().map((entry, idx) => (
          <li key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-600 font-medium">{entry.date}</span>
            <span className={`font-bold ${colors.textForest}`}>{entry.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
