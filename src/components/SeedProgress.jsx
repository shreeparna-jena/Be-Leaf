import React from 'react';
import { colors } from '../constants/theme';

export default function SeedProgress({ seedPoints }) {
  let stageName = '';
  let emoji = '';
  let minPts = 0;
  let maxPts = 49;
  let nextGoal = 50;

  if (seedPoints >= 200) {
    stageName = 'Garden';
    emoji = '🏡';
    minPts = 200;
    maxPts = 200; // maxed out calculation
    nextGoal = null;
  } else if (seedPoints >= 150) {
    stageName = 'Tree';
    emoji = '🌳';
    minPts = 150;
    maxPts = 199;
    nextGoal = 200;
  } else if (seedPoints >= 100) {
    stageName = 'Plant';
    emoji = '🪴';
    minPts = 100;
    maxPts = 149;
    nextGoal = 150;
  } else if (seedPoints >= 50) {
    stageName = 'Sapling';
    emoji = '🌿';
    minPts = 50;
    maxPts = 99;
    nextGoal = 100;
  } else {
    stageName = 'Seed';
    emoji = '🌱';
    minPts = 0;
    maxPts = 49;
    nextGoal = 50;
  }

  // Calculate progress within current stage (except Garden which is maxed)
  let progressPercent = 100;
  if (nextGoal) {
    progressPercent = ((seedPoints - minPts) / (maxPts - minPts + 1)) * 100;
  }

  return (
    <section className="bg-white p-6 rounded-3xl shadow-sm flex flex-col items-center border border-[#386641]/10">
      <div className="text-6xl mb-4 transition-all duration-500 hover:scale-110" aria-hidden="true">{emoji}</div>
      <h2 className={`text-2xl font-bold ${colors.textForest}`}>{stageName} Stage</h2>
      
      {/* Progress Bar */}
      <div 
        className="w-full bg-[#FDFBF7] h-4 rounded-full mt-6 overflow-hidden border border-[#386641]/10 relative"
        role="progressbar"
        aria-valuenow={seedPoints}
        aria-valuemin="0"
        aria-valuemax="200"
      >
        <div 
          className="bg-[#A7C957] h-full transition-all duration-1000 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      {nextGoal ? (
        <p className="text-sm mt-3 text-[#386641]/80 font-medium">
          {nextGoal - seedPoints} pts to next stage
        </p>
      ) : (
        <p className="text-sm mt-3 text-[#A7C957] font-bold">
          Maximum growth achieved!
        </p>
      )}
    </section>
  );
}
