//button responsible for theme changing
'use client';
import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

//icon for dark theme
const DarkIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-6 h-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
    />
  </svg>
);

//icon for light theme
const LightIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-6 h-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
    />
  </svg>
);

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const handleClick = () => toggleTheme();

  // Use conditional classes for styling
  const buttonClasses = `flex items-center justify-center w-10 h-10 rounded-md transition-colors ${
    isDark
      ? 'bg-neutral-50 text-black hover:bg-gray-200'
      : 'bg-neutral-900 text-white hover:bg-neutral-900/90'
  }`;

  return (
    <button onClick={handleClick} className={buttonClasses}>
      {isDark ? <DarkIcon /> : <LightIcon />}
    </button>
  );
};

export default ThemeToggle;
