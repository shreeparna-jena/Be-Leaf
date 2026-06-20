import React from 'react';
import { colors } from '../constants/theme';

export default function Button({ onClick, children, testId, className = '' }) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className={`${colors.primaryGreen} ${colors.primaryHover} text-white font-bold py-3 px-6 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 active:scale-95 ${className}`}
      aria-label={typeof children === 'string' ? children : 'button'}
    >
      {children}
    </button>
  );
}
