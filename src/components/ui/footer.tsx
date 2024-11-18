//helper reusable footer component
'use client';
import React from 'react';

const Footer = () => {
  return (
    <p className=' text-center min-w-max pt-4 text-xs text-black dark:text-white'>
      © 2024 All rights reserved by{' '}
      <a
        href='https://www.linkedin.com/in/smllns'
        className='text-pink-500 hover:text-pink-300 underline'
        target='_blank'
        rel='noopener noreferrer'
      >
        smllns
      </a>
    </p>
  );
};

export default Footer;
