import React, { useState, useEffect } from 'react';
import { useUserData } from './hooks/useUserData';
import { VIEWS } from './constants/config';
import { colors } from './constants/theme';
import WelcomeScreen from './views/WelcomeScreen';
import CarbonExplainer from './views/CarbonExplainer';
import Questionnaire from './views/Questionnaire';
import ResultsSummary from './views/ResultsSummary';
import Dashboard from './views/Dashboard';

export default function BeLeafApp() {
  const [currentView, setCurrentView] = useState(VIEWS.WELCOME);
  
  const {
    userName,
    setUserName,
    seedPoints,
    footprintScore,
    previousScore,
    highestImpactArea,
    dailyTasks,
    history,
    isLoaded,
    handleQuizComplete,
    handleTaskClick
  } = useUserData();

  // Redirect to dashboard if user has history data on load
  useEffect(() => {
    if (isLoaded && userName && history && history.length > 0 && currentView === VIEWS.WELCOME) {
      setCurrentView(VIEWS.DASHBOARD);
    }
  }, [isLoaded, userName, history, currentView]);

  // View Navigation Handlers
  const handleWelcomeNext = (name) => {
    setUserName(name);
    setCurrentView(VIEWS.EXPLAINER);
  };

  const handleExplainerNext = () => {
    setCurrentView(VIEWS.QUIZ);
  };

  const onQuizComplete = (results) => {
    handleQuizComplete(results);
    setCurrentView(VIEWS.RESULTS);
  };

  const handleResultsContinue = () => {
    setCurrentView(VIEWS.DASHBOARD);
  };

  const handleRetakeAssessment = () => {
    setCurrentView(VIEWS.QUIZ);
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
      
      {currentView === VIEWS.WELCOME && (
        <WelcomeScreen 
          initialName={userName} 
          onNext={handleWelcomeNext} 
        />
      )}
      
      {currentView === VIEWS.EXPLAINER && (
        <CarbonExplainer 
          onNext={handleExplainerNext} 
        />
      )}
      
      {currentView === VIEWS.QUIZ && (
        <Questionnaire 
          onComplete={onQuizComplete} 
        />
      )}
      
      {currentView === VIEWS.RESULTS && (
        <ResultsSummary 
          footprintScore={footprintScore}
          seedScore={seedPoints}
          highestImpactArea={highestImpactArea}
          onContinue={handleResultsContinue}
        />
      )}

      {currentView === VIEWS.DASHBOARD && (
        <Dashboard 
          userName={userName}
          seedPoints={seedPoints}
          footprintScore={footprintScore}
          previousScore={previousScore}
          highestImpactArea={highestImpactArea}
          dailyTasks={dailyTasks}
          history={history}
          onTaskClick={handleTaskClick}
          onRetake={handleRetakeAssessment}
        />
      )}
      </div>
    </div>
  );
}
