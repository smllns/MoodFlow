'use client';
import React, { useState } from 'react';
import { LoginForm } from './Login';
import { Button } from './ui/button';
import { SignUpForm } from './SignUp';
import { ResetPassword } from './ResetPassword';

const Registration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [reset, setReset] = useState(false);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setReset(false);
  };

  const resetPass = () => {
    setReset(true);
  };

  const handleBackToLogin = () => {
    setReset(false);
  };

  return (
    <div className='h-screen bg-[rgba(255,255,255,0.33)] dark:bg-[rgba(0,0,0,0.8)]  flex items-center justify-center relative'>
      <Button
        type='button'
        className='absolute top-4 right-4'
        onClick={toggleForm}
      >
        {isLogin ? 'Sign Up' : 'Log In'}
      </Button>

      {reset ? (
        <ResetPassword onBack={handleBackToLogin} />
      ) : isLogin ? (
        <LoginForm toggleForm={toggleForm} resetPass={resetPass} />
      ) : (
        <SignUpForm toggleForm={toggleForm} />
      )}
      <p className='absolute min-w-max bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-black dark:text-white'>
        © 2024 All rights reserved by{' '}
        <a
          href='https://www.linkedin.com/in/smllns'
          className='text-pink-500 hover:text-pink-300 underline '
          target='_blank'
          rel='noopener noreferrer'
        >
          smllns
        </a>
      </p>
    </div>
  );
};

export default Registration;
