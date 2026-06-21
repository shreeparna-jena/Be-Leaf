import React from 'react';
import { colors } from '../constants/theme';
import SeedProgress from '../components/SeedProgress';
import RecommendationCards from '../components/RecommendationCards';
import GrowthLeaderboard from '../components/GrowthLeaderboard';
import DailyTasks from '../components/DailyTasks';
import ImprovementTracker from '../components/ImprovementTracker';
import ProgressHistory from '../components/ProgressHistory';
import Button from '../components/Button';

export default function Dashboard({ 
  userName, 
  seedPoints, 
  footprintScore,
  previousScore,
  highestImpactArea, 
  dailyTasks,
  history,
  onTaskClick,
  onRetake
}) {
  return (
    <main className="flex flex-col h-full max-w-md mx-auto space-y-6 animate-fade-in pb-8">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-[#386641]/10">
        <h1 className={`font-bold ${colors.textForest} text-xl`}>🌱 My Garden</h1>
        <div className="flex items-center gap-2 bg-[#F2E863]/20 px-4 py-2 rounded-full">
          <span className="text-xl" aria-hidden="true">🌱</span>
          <span className={`font-bold ${colors.textForest}`}>{seedPoints} pts</span>
        </div>
      </header>

      {/* The Plant Stage */}
      <SeedProgress seedPoints={seedPoints} />

      {/* Highest Impact Area Explanation */}
      {highestImpactArea !== 'None' && (
        <div className="bg-[#A8DADC]/10 p-4 rounded-xl border border-[#A8DADC]/30 text-center">
          <p className={`font-medium ${colors.textForest} text-sm`}>
            {highestImpactArea === 'Electricity' && "Electricity usage contributed the most to your footprint."}
            {highestImpactArea === 'Transportation' && "Transportation contributed the most to your footprint."}
            {highestImpactArea === 'Waste' && "Waste-related habits contributed the most to your footprint."}
          </p>
        </div>
      )}

      {/* Improvement Tracker */}
      {previousScore !== null && (
        <ImprovementTracker previousScore={previousScore} currentScore={footprintScore} />
      )}

      {/* Daily Tasks */}
      <DailyTasks 
        highestImpactArea={highestImpactArea}
        dailyTasksState={dailyTasks}
        onTaskClick={onTaskClick}
      />

      {/* Personalized Recommendations */}
      <RecommendationCards 
        highestImpactArea={highestImpactArea} 
      />

      {/* Progress History */}
      <ProgressHistory history={history} />

      {/* Leaderboard */}
      <GrowthLeaderboard userName={userName} seedPoints={seedPoints} />

      {/* Retake Assessment */}
      <div className="pt-4">
        <Button onClick={onRetake} className="w-full text-lg shadow-sm" testId="retake-btn">
          Retake Assessment 🔄
        </Button>
      </div>
    </main>
  );
}
