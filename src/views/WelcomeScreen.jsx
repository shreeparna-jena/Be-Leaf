import React, { useState } from 'react';
import { colors } from '../constants/theme';
import { isValidName } from '../utils/validation';
import Button from '../components/Button';
import OLeaffyGuide from '../components/OLeaffyGuide';
import oleaffyImg from '../assets/oleaffy.png';

export default function WelcomeScreen({ onNext, initialName }) {
  const [userName, setUserName] = useState(initialName || '');
  const [nameError, setNameError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleStartJourney = () => {
    const validation = isValidName(userName);
    if (!validation.valid) {
      setNameError(validation.error);
      triggerShake();
      return;
    }
    
    setNameError('');
    onNext(userName.trim());
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <main className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center space-y-8 animate-fade-in">
      <div className="w-48 h-48 mb-4 bounce-animation rounded-full overflow-hidden bg-white shadow-lg mx-auto border-4 border-[#FDFBF7] p-2">
        <img src={oleaffyImg} alt="O'Leaffy Mascot" className="w-full h-full object-cover rounded-full" />
      </div>
      <h1 className={`text-4xl font-extrabold ${colors.textForest}`}>Be-Leaf</h1>
      <OLeaffyGuide message="Welcome to Be-Leaf! I'm O'Leaffy. Ready to turn over a new leaf and track your green impact?" />
      
      <div className="w-full">
        <label htmlFor="name-input" className="sr-only">Enter your name</label>
        <input
          id="name-input"
          type="text"
          autoFocus
          placeholder="What should I call you?"
          className={`w-full p-4 rounded-2xl border ${nameError ? 'border-red-400 bg-red-50' : colors.borderGreen} focus:outline-none focus:ring-2 ${nameError ? 'focus:ring-red-400' : 'focus:ring-[#A7C957]'} ${colors.textForest} text-lg transition-all duration-300 ${isShaking ? 'animate-shake' : ''}`}
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            if (nameError) setNameError('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleStartJourney();
            }
          }}
          aria-invalid={!!nameError}
          aria-describedby={nameError ? "name-error" : undefined}
        />
        {nameError && (
          <p id="name-error" className="text-red-500 text-sm font-semibold mt-2 animate-fade-in text-center">
            {nameError}
          </p>
        )}
      </div>

      <Button 
        testId="start-btn" 
        onClick={handleStartJourney}
        className="w-full text-xl mt-4"
      >
        Start Your Journey 🚀
      </Button>
    </main>
  );
}
