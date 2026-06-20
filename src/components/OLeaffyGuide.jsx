import React from 'react';
import { colors } from '../constants/theme';
import oleaffyImg from '../assets/oleaffy.png';

export default function OLeaffyGuide({ message }) {
  return (
    <aside className={`flex items-center gap-4 p-4 bg-white rounded-2xl border ${colors.borderGreen} shadow-sm`}>
      <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full flex-shrink-0 transform hover:rotate-12 transition-transform duration-300 border-2 border-[#A8DADC]/30 shadow-sm overflow-hidden p-1">
        <img src={oleaffyImg} alt="O'Leaffy Mascot" className="w-full h-full object-cover rounded-full" />
      </div>
      <p className={`font-medium ${colors.textForest} leading-relaxed`}>
        {message}
      </p>
    </aside>
  );
}
