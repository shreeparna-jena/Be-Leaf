import React, { useEffect } from 'react';
import { colors } from '../constants/theme';
import Button from '../components/Button';
import OLeaffyGuide from '../components/OLeaffyGuide';

export default function ResultsSummary({ footprintScore, seedScore, highestImpactArea, onContinue }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onContinue();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onContinue]);
  
  let fpRating = '';
  let fpColor = '';
  let oleaffyMessage = '';
  
  if (footprintScore < 30) {
    fpRating = '🟢 Low Impact';
    fpColor = 'text-green-600';
    oleaffyMessage = "Fantastic work! Your habits are already helping reduce your environmental impact. Let's see how we can grow your garden even further.";
  } else if (footprintScore < 60) {
    fpRating = '🟡 Moderate Impact';
    fpColor = 'text-yellow-600';
    oleaffyMessage = "You're on the right track! A few small changes could significantly reduce your footprint and help your garden thrive.";
  } else {
    fpRating = '🔴 High Impact';
    fpColor = 'text-red-500';
    oleaffyMessage = "We've found some areas where your footprint is higher than average. The good news? Small changes can create meaningful results, and O'Leaffy is here to help.";
  }

  return (
    <main className="flex flex-col h-full max-w-md mx-auto space-y-6 animate-fade-in justify-center">
      <h2 className={`text-3xl font-bold ${colors.textForest} text-center`}>Your Results</h2>
      
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#386641]/10 space-y-6">
        
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Footprint Rating</p>
          <p className={`text-2xl font-extrabold mt-1 ${fpColor}`}>{fpRating}</p>
          <p className="text-xs text-gray-400 mt-1">Score: {footprintScore}/90</p>
        </div>

        <div className="text-center bg-[#FDFBF7] p-4 rounded-xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Seed Score</p>
          <p className={`text-4xl font-extrabold text-[#A7C957] mt-1`}>{seedScore} pts</p>
          <p className="text-xs text-gray-400 mt-1">Starting strong!</p>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Highest Impact Area</p>
          <p className={`text-xl font-bold ${colors.textForest} mt-1`}>{highestImpactArea}</p>
        </div>

      </div>

      <OLeaffyGuide message={oleaffyMessage} />

      <Button 
        testId="results-continue-btn" 
        onClick={onContinue}
        className="w-full text-xl mt-4"
      >
        View My Dashboard 🏡
      </Button>
    </main>
  );
}
