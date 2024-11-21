//hero section on the first page of the app
'use client';
import React from 'react';
import { TextGenerateEffect } from './ui/text-generate-effect';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/lib/ThemeContext';
import { WavyBackground } from './ui/wavy-background';
import ScrollIcon from './ScrollIcon';

const words = `Unravel the mysteries of your mood and discover harmony within yourself 💖`;

const Hero = () => {
  const { isDark } = useTheme();

  // Function to handle the scroll behavior when the icon is clicked
  const handleScrollLogin = () => {
    const registrationElement = document.getElementById('registration');
    registrationElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='overflow-hidden'>
      <WavyBackground
        theme={isDark ? 'dark' : 'light'}
        className='h-screen w-full flex flex-col justify-between'
      >
        <div className='flex items-center justify-between mt-5 mx-5'>
          <p className='text-2xl font-bold inter-var'>
            {isDark ? 'MoodFlow' : 'MoodFlow'}
          </p>
          <ThemeToggle />
        </div>
        <div className='flex flex-col justify-end flex-grow mx-5'>
          <div className='mb-10 inter-var text-center'>
            <TextGenerateEffect words={words} />
          </div>
          <div className='md:hidden'>
            <ScrollIcon onClick={handleScrollLogin} isDark={isDark} />
          </div>
        </div>
      </WavyBackground>
    </div>
  );
};

export default Hero;
