import React, { useState, useEffect } from 'react';
import { colors } from '../constants/theme';
import { quizQuestions } from '../constants/quizData';
import { calculateQuizScores } from '../utils/scoring';
import Button from '../components/Button';
import OLeaffyGuide from '../components/OLeaffyGuide';

export default function Questionnaire({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentQ = quizQuestions[currentStep];
      if (e.key === 'ArrowDown') {
        setFocusedIndex(prev => (prev < currentQ.options.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        handleOptionClick(currentQ.options[focusedIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, focusedIndex, answers]);

  const handleOptionClick = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    setFocusedIndex(0);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const results = calculateQuizScores(newAnswers);
      
      console.log('--- Quiz Calculation Debug ---');
      console.log('Results:', results);

      onComplete(results);
    }
  };

  const currentQ = quizQuestions[currentStep];
  const progressPercent = ((currentStep + 1) / quizQuestions.length) * 100;

  return (
    <main className="flex flex-col h-full max-w-md mx-auto space-y-6 animate-fade-in">
      <h2 className={`text-2xl font-bold ${colors.textForest} text-center`}>{currentQ.title}</h2>
      
      {/* Quiz Progress Bar */}
      <div 
        className="w-full bg-[#FDFBF7] h-2 rounded-full overflow-hidden border border-[#386641]/10"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div 
          className="bg-[#A7C957] h-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <OLeaffyGuide message={currentQ.question} />
      
      <div className="flex flex-col gap-4 mt-6">
        {currentQ.options.map((opt, i) => (
          <Button 
            key={i}
            testId={`quiz-opt-${i}`} 
            onClick={() => handleOptionClick(opt)} 
            className={`w-full border-2 transition-all duration-300 ${
              i === focusedIndex 
                ? '!bg-[#A7C957] !text-white border-[#A7C957] shadow-md -translate-y-1' 
                : '!bg-white !text-[#386641] border-[#A7C957] hover:!bg-[#A7C957] hover:!text-white'
            }`}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </main>
  );
}
