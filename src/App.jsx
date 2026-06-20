import React, { useState } from 'react';
import { colors } from './constants/theme';
import WelcomeScreen from './views/WelcomeScreen';
import CarbonExplainer from './views/CarbonExplainer';
import Questionnaire from './views/Questionnaire';
import ResultsSummary from './views/ResultsSummary';
import Dashboard from './views/Dashboard';

export default function BeLeafApp() {
  // Global State
  const [currentView, setCurrentView] = useState('welcome');
  
  // User Data State
  const [userName, setUserName] = useState('');
  const [seedPoints, setSeedPoints] = useState(0);
  const [footprintScore, setFootprintScore] = useState(0);
  const [highestImpactArea, setHighestImpactArea] = useState('');
  const [tasksCompleted, setTasksCompleted] = useState([false, false, false]);

  // Handlers
  const handleWelcomeNext = (name) => {
    setUserName(name);
    setCurrentView('explainer');
  };

  const handleExplainerNext = () => {
    setCurrentView('quiz');
  };

  const handleQuizComplete = (results) => {
    setFootprintScore(results.footprintScore);
    setSeedPoints(results.seedScore);
    setHighestImpactArea(results.highestImpactArea);
    setCurrentView('results');
  };

  const handleResultsContinue = () => {
    setCurrentView('dashboard');
  };

  const handleTaskClick = (index, points) => {
    if (!tasksCompleted[index]) {
      const newTasks = [...tasksCompleted];
      newTasks[index] = true;
      setTasksCompleted(newTasks);
      
      setSeedPoints(prev => prev + points);
    }
  };

  return (
    <div 
      className="min-h-screen p-4 font-sans selection:bg-[#A7C957] selection:text-white relative overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg, #FAF8F2 0%, #F8F6F0 35%, #F1F8ED 75%, #E8F3E4 100%)' }}
    >
      {/* Subtle Organic Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center">
        <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[60%] rounded-full bg-[#DDEFCF] opacity-30 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#DDEFCF] opacity-20 blur-[100px]"></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&display=swap');
        body { font-family: 'Nunito', sans-serif; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}} />
      
      {/* Content wrapper to ensure it sits above the background glow */}
      <div className="relative z-10 h-full">
      
      {currentView === 'welcome' && (
        <WelcomeScreen 
          initialName={userName} 
          onNext={handleWelcomeNext} 
        />
      )}
      
      {currentView === 'explainer' && (
        <CarbonExplainer 
          onNext={handleExplainerNext} 
        />
      )}
      
      {currentView === 'quiz' && (
        <Questionnaire 
          onComplete={handleQuizComplete} 
        />
      )}
      
      {currentView === 'results' && (
        <ResultsSummary 
          footprintScore={footprintScore}
          seedScore={seedPoints}
          highestImpactArea={highestImpactArea}
          onContinue={handleResultsContinue}
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboard 
          userName={userName}
          seedPoints={seedPoints}
          highestImpactArea={highestImpactArea}
          tasksCompleted={tasksCompleted}
          onTaskClick={handleTaskClick}
        />
      )}
      </div>
    </div>
  );
}
