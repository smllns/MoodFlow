'use client';
import React from 'react';
import { WavyBackgroundDark } from './ui/wavy-background-dark';
import { TextGenerateEffect } from './ui/text-generate-effect';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { WavyBackgroundLight } from './ui/wavy-bakground-light';
import { useTheme } from '@/lib/ThemeContext';

const words = `Unravel the mysteries of your mood and discover harmony within yourself 💖`;

const Hero = () => {
  const { isDark } = useTheme();

  const handleScrollLogin = () => {
    const registrationElement = document.getElementById('registration');
    if (registrationElement) {
      registrationElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='overflow-hidden'>
      {isDark ? (
        <WavyBackgroundDark className='h-screen w-full flex flex-col justify-between'>
          <div className='flex items-center justify-between mt-5 mx-5'>
            <p className='text-2xl text-white font-bold inter-var'>MoodFlow</p>
            <div className='hidden md:block'>
              <ThemeToggle />
            </div>
            <div className='md:hidden ml-auto'>
              <ThemeToggle />
            </div>
          </div>

          <div className='flex flex-col justify-end flex-grow mx-5'>
            <div className='mb-10 inter-var text-center'>
              <TextGenerateEffect words={words} />
            </div>
            <div className='flex justify-center mb-5 md:hidden'>
              <Image
                src='/CaretDoubleDown.svg'
                height={1000}
                width={1000}
                className='h-8 w-8 cursor-pointer transition-transform duration-300 opacity-[0.4] hover:opacity-[0.8] fill-current text-gray-500 hover:text-gray-800 hover:scale-110 active:scale-95'
                alt='arrows'
                onClick={handleScrollLogin}
              />
            </div>
          </div>
        </WavyBackgroundDark>
      ) : (
        <WavyBackgroundLight className='h-screen w-full flex flex-col justify-between'>
          <div className='flex items-center justify-between mt-5 mx-5'>
            <p className='text-2xl text-black font-bold inter-var'>MoodFlow</p>
            <div className='hidden md:block'>
              <ThemeToggle />
            </div>
            <div className='md:hidden ml-auto'>
              <ThemeToggle />
            </div>
          </div>

          <div className='flex flex-col justify-end flex-grow mx-5'>
            <div className='mb-10 inter-var text-center'>
              <TextGenerateEffect words={words} />
            </div>
            <div className='flex justify-center mb-5 md:hidden'>
              <Image
                src='/CaretDoubleDown.svg'
                height={1000}
                width={1000}
                className='h-8 w-8 cursor-pointer transition-transform duration-300 opacity-[0.4] hover:opacity-[0.8] fill-current text-gray-500 hover:text-gray-800 hover:scale-110 active:scale-95'
                alt='arrows'
                onClick={handleScrollLogin}
              />
            </div>
          </div>
        </WavyBackgroundLight>
      )}
    </div>
  );
};

export default Hero;
