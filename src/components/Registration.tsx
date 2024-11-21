//registration component rendering login/signup/resetpassword components
'use client';
import React, { useState } from 'react';
import { LoginForm } from './Login';
import { Button } from './ui/button';
import { SignUpForm } from './SignUp';
import { ResetPassword } from './ResetPassword';
import Footer from './ui/footer';

const Registration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [reset, setReset] = useState(false);

  // Toggle between login and sign-up forms, reset password is closed on toggle
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setReset(false);
  };

  // Set the reset password form as active
  const resetPass = () => {
    setReset(true);
  };

  // Handle going back to the login form from the reset password form
  const handleBackToLogin = () => {
    setReset(false);
  };

  return (
    <div className='h-screen bg-[rgba(255,255,255,0.33)] dark:bg-[rgba(0,0,0,0.8)]  flex items-center justify-center relative'>
      {/* Button to toggle between Login and Sign-Up forms */}
      <Button
        type='button'
        className='absolute top-4 right-4'
        onClick={toggleForm}
      >
        {isLogin ? 'Sign Up' : 'Log In'}
      </Button>
      {/* Conditional rendering: show Reset Password form, Login form, or Sign-Up form */}
      {reset ? (
        <ResetPassword onBack={handleBackToLogin} />
      ) : isLogin ? (
        <LoginForm toggleForm={toggleForm} resetPass={resetPass} />
      ) : (
        <SignUpForm toggleForm={toggleForm} />
      )}
      <div className='absolute  bottom-4 left-1/2 transform -translate-x-1/2'>
        <Footer />
      </div>
    </div>
  );
};

export default Registration;
