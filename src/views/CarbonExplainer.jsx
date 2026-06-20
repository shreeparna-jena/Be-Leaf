import React, { useState, useEffect } from 'react';
import { colors } from '../constants/theme';
import Button from '../components/Button';
import OLeaffyGuide from '../components/OLeaffyGuide';

export default function CarbonExplainer({ onNext }) {
  const [currentStep, setCurrentStep] = useState(0);

  const messages = [
    "Every day we leave invisible footprints behind.",
    "Driving, electricity usage, and waste all contribute to our carbon footprint.",
    "The larger the footprint, the greater the impact on our environment.",
    "Don't worry! Small actions can make a big difference.",
    "Let's discover how your habits affect your footprint and help your garden grow."
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (currentStep < messages.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          onNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, messages.length, onNext]);

  const handleNext = () => {
    if (currentStep < messages.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onNext();
    }
  };

  return (
    <main className="flex flex-col h-full max-w-md mx-auto space-y-8 justify-center animate-fade-in">
      <h2 className={`text-3xl font-bold ${colors.textForest} text-center`}>The Invisible Footprint</h2>
      
      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-4" aria-label={`Step ${currentStep + 1} of ${messages.length}`}>
        {messages.map((_, idx) => (
          <div 
            key={idx}
            className={`h-3 rounded-full transition-all duration-500 ${idx === currentStep ? 'bg-[#A7C957] w-8' : 'bg-[#386641]/10 w-3'}`}
          />
        ))}
      </div>
      
      <div className="min-h-[140px] flex items-center">
        <div key={currentStep} className="animate-fade-in w-full">
          <OLeaffyGuide message={messages[currentStep]} />
        </div>
      </div>

      <Button 
        testId="explainer-next-btn" 
        onClick={handleNext}
        className="w-full text-xl"
      >
        {currentStep < messages.length - 1 ? 'Next →' : 'Start My Checkup 🌱'}
      </Button>
    </main>
  );
}
