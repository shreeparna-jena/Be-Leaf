import React from 'react';
import { colors } from '../constants/theme';

export default function GrowthLeaderboard({ userName, seedPoints }) {
  // Mocked leaderboard data
  const players = [
    { name: 'Eco Jane', pts: 230 },
    { name: 'Planter Pete', pts: 185 },
    { name: userName || 'You', pts: seedPoints, isUser: true },
    { name: 'Green Alex', pts: 120 },
    { name: 'Newbie Nick', pts: 40 }
  ];

  // Sort by points descending
  const sortedPlayers = [...players].sort((a, b) => b.pts - a.pts);

  return (
    <section className="bg-white p-6 rounded-3xl shadow-sm border border-[#386641]/10 mt-6">
      <h3 className={`font-bold ${colors.textForest} text-lg mb-4`}>Community Growth</h3>
      <div className="space-y-3">
        {sortedPlayers.map((player, idx) => (
          <div 
            key={idx} 
            className={`flex items-center justify-between p-3 rounded-xl ${player.isUser ? 'bg-[#F2E863]/20 border border-[#F2E863]/40' : 'bg-[#FDFBF7]'}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-bold w-4">{idx + 1}.</span>
              <span className={`font-semibold ${player.isUser ? colors.textForest : 'text-gray-600'}`}>
                {player.name}
              </span>
            </div>
            <span className={`font-bold ${player.isUser ? 'text-[#A7C957]' : 'text-gray-500'}`}>
              {player.pts} pts
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
