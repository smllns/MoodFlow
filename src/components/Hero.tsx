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
              <div
                onClick={handleScrollLogin}
                className='h-8 w-8 cursor-pointer transition-transform duration-300 opacity-40 hover:opacity-80 fill-current text-gray-400 dark:text-white hover:scale-110 active:scale-95'
              >
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-full w-full'
                >
                  <path
                    d='M27.0612 15.9388C27.2011 16.0781 27.312 16.2437 27.3878 16.426C27.4635 16.6084 27.5024 16.8038 27.5024 17.0013C27.5024 17.1987 27.4635 17.3942 27.3878 17.5765C27.312 17.7588 27.2011 17.9244 27.0612 18.0638L17.0613 28.0638C16.9219 28.2036 16.7563 28.3146 16.574 28.3903C16.3917 28.466 16.1962 28.5049 15.9987 28.5049C15.8013 28.5049 15.6058 28.466 15.4235 28.3903C15.2412 28.3146 15.0756 28.2036 14.9362 28.0638L4.93625 18.0638C4.79672 17.9242 4.68604 17.7586 4.61053 17.5763C4.53501 17.394 4.49615 17.1986 4.49615 17.0013C4.49615 16.8039 4.53501 16.6085 4.61053 16.4262C4.68604 16.2439 4.79672 16.0783 4.93625 15.9388C5.07578 15.7992 5.24142 15.6885 5.42373 15.613C5.60603 15.5375 5.80143 15.4987 5.99875 15.4987C6.19607 15.4987 6.39147 15.5375 6.57377 15.613C6.75608 15.6885 6.92172 15.7992 7.06125 15.9388L16 24.875L24.9387 15.935C25.0783 15.7958 25.2439 15.6854 25.4262 15.6103C25.6084 15.5351 25.8037 15.4966 26.0008 15.497C26.1979 15.4973 26.393 15.5365 26.575 15.6123C26.7569 15.6881 26.9222 15.799 27.0612 15.9388ZM14.9362 18.0638C15.0756 18.2036 15.2412 18.3146 15.4235 18.3903C15.6058 18.466 15.8013 18.5049 15.9987 18.5049C16.1962 18.5049 16.3917 18.466 16.574 18.3903C16.7563 18.3146 16.9219 18.2036 17.0613 18.0638L27.0612 8.06376C27.2008 7.92423 27.3115 7.75858 27.387 7.57628C27.4625 7.39398 27.5014 7.19858 27.5014 7.00126C27.5014 6.80393 27.4625 6.60854 27.387 6.42624C27.3115 6.24393 27.2008 6.07829 27.0612 5.93876C26.9217 5.79923 26.7561 5.68855 26.5738 5.61304C26.3915 5.53752 26.1961 5.49866 25.9987 5.49866C25.8014 5.49866 25.606 5.53752 25.4237 5.61304C25.2414 5.68855 25.0758 5.79923 24.9362 5.93876L16 14.875L7.06125 5.93876C6.77946 5.65697 6.39726 5.49866 5.99875 5.49866C5.60024 5.49866 5.21804 5.65697 4.93625 5.93876C4.65446 6.22055 4.49615 6.60274 4.49615 7.00126C4.49615 7.39977 4.65446 7.78197 4.93625 8.06376L14.9362 18.0638Z'
                    fill='currentColor'
                  />
                </svg>
              </div>
            </div>
          </div>
        </WavyBackgroundLight>
      )}
    </div>
  );
};

export default Hero;
